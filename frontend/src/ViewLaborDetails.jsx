import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewLaborDetails = () => {
  const [laborDetails, setLaborDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/labors')  // Update endpoint URL if necessary
      .then(response => {
        setLaborDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the labor details!', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center mb-4">Labor Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Labor ID</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Adhar Card</th>
            <th scope="col">Bank Details</th>
            <th scope="col">Health History</th>
            <th scope="col">Address</th>
            <th scope="col">Emergency Details</th>
          </tr>
        </thead>
        <tbody>
          {laborDetails.map((laborDetail, index) => (
            <tr key={index}>
              <td>{laborDetail.labor_id}</td>
              <td>{laborDetail.name}</td>
              <td>{laborDetail.age}</td>
              <td>{laborDetail.adhar_card}</td>
              <td>{laborDetail.bank_details}</td>
              <td>{laborDetail.health_history}</td>
              <td>{laborDetail.address}</td>
              <td>{laborDetail.emergency_details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewLaborDetails;
