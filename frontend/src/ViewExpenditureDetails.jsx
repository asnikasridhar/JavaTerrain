import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewExpenditureDetails = () => {
  const [expenditureDetails, setExpenditureDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/expendituredetails')
      .then(response => {
        setExpenditureDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the expenditure details!', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center mb-4">Expenditure Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Expenditure ID</th>
            <th scope="col">Acre ID</th>
            <th scope="col">Water</th>
            <th scope="col">Fertilizer</th>
            <th scope="col">Pruning</th>
            <th scope="col">Others</th>
            <th scope="col">Spent On</th>
          </tr>
        </thead>
        <tbody>
          {expenditureDetails.map((expenditureDetail, index) => (
            <tr key={index}>
              <td>{expenditureDetail.expenditure_id}</td>
              <td>{expenditureDetail.acre_id}</td>
              <td>{expenditureDetail.water}</td>
              <td>{expenditureDetail.fertilizer}</td>
              <td>{expenditureDetail.pruning}</td>
              <td>{expenditureDetail.others}</td>
              <td>{expenditureDetail.edate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewExpenditureDetails;
