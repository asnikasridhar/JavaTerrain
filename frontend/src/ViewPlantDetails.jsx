import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewPlantDetails = () => {
  const [plantDetails, setPlantDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/plantdetails')
      .then(response => {
        setPlantDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the plant details!', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center mb-4">Plant Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Plant ID</th>
            <th scope="col">Acre ID</th>
            <th scope="col">Plant Type</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {plantDetails.map((plantDetail, index) => (
            <tr key={index}>
              <td>{plantDetail.plant_id}</td>
              <td>{plantDetail.acre_id}</td>
              <td>{plantDetail.plant_type}</td>
              <td>{plantDetail.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewPlantDetails;
