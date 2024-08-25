import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewFertilizerDetails = () => {
  const [fertilizerDetails, setFertilizerDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/fertilizerdetails')
      .then(response => {
        setFertilizerDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the fertilizer details!', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center mb-4">Fertilizer Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Fertilizer ID</th>
            <th scope="col">Acre ID</th>
            <th scope="col">Fertilizer Name</th>
            <th scope="col">Date of Application</th>
          </tr>
        </thead>
        <tbody>
          {fertilizerDetails.map((fertilizerDetail, index) => (
            <tr key={index}>
              <td>{fertilizerDetail.fertilizer_id}</td>
              <td>{fertilizerDetail.acre_id}</td>
              <td>{fertilizerDetail.fertilizer_name}</td>
              <td>{fertilizerDetail.date_of_application}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewFertilizerDetails;
