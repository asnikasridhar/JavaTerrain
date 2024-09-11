import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewPlantDetails = () => {
  const [plantDetails, setPlantDetails] = useState([]);
  const [error, setError] = useState(null);
  const selProperty = JSON.parse(localStorage.getItem('selProperty'));
  useEffect(() => {
    axios.get(`http://localhost:3000/plantdetails-by-prop/${selProperty}`)
      .then(response => {
        setPlantDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the plant details!', error);
        setError('There was an error fetching the plant details!');
      });
  }, []);

  const handleDelete = (plantId) => {
    axios.delete(`http://localhost:3000/plantdetails/${plantId}`)
      .then(() => {
        setPlantDetails(plantDetails.filter(plantDetail => plantDetail.plant_id !== plantId));
      })
      .catch(error => {
        console.error('There was an error deleting the plant!', error);
        setError('There was an error deleting the plant!');
      });
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-center mb-4">Plant Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Plant ID</th>
            <th scope="col">Plant Type</th>
            <th scope="col">Details</th>
            <th scope="col">Block Name</th>
            <th scope="col">Block Id</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plantDetails.map((plantDetail, index) => (
            <tr key={index}>
              <td>{plantDetail.plant_id}</td>
              <td>{plantDetail.plant_type}</td>
              <td>{plantDetail.details}</td>
              <td>{plantDetail.block_name}</td>
              <td>{plantDetail.block_id}</td>
              <td className="text-center">
                <Link to={`/edit-plant/${plantDetail.plant_id}`} className="btn btn-outline-primary btn-sm me-2">
                  Edit <i className="bi bi-pencil-square"></i>
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(plantDetail.plant_id)}
                >
                  <i className="bi bi-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewPlantDetails;
