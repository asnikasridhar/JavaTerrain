import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Income = () => {
  const [incomeDetails, setIncomeDetails] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const selProperty = JSON.parse(localStorage.getItem('selProperty'));

  useEffect(() => {
    axios.get(`http://localhost:3000/api/cropdetails-by-prop/${selProperty}`)
      .then(response => {
        const data = response.data;

        // If income is not already sent by backend, calculate it here
        const withIncome = data.map(crop => ({
          ...crop,
          income: crop.income || crop.yield_obtained * crop.selling_price
        }));

        setIncomeDetails(withIncome);

        // Calculate total income
        const total = withIncome.reduce((acc, curr) => acc + curr.income, 0);
        setTotalIncome(total);

      })
      .catch(error => {
        console.error('Error fetching income data:', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Income Report</h2>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">Crop ID</th>
            <th scope="col">Property Name</th>
            <th scope="col">Yield Obtained</th>
            <th scope="col">Selling Price</th>
            <th scope="col">Income</th>
          </tr>
        </thead>
        <tbody>
          {incomeDetails.map((item, index) => (
            <tr key={index}>
              <td>{item.crop_id}</td>
              <td>{item.property_name}</td>
              <td>{item.yield_obtained}</td>
              <td>₹{item.selling_price.toFixed(2)}</td>
              <td><strong>₹{item.income.toFixed(2)}</strong></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="table-success">
            <td colSpan="4" className="text-end"><strong>Total Income:</strong></td>
            <td><strong>₹{totalIncome.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Income;