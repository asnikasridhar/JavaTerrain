import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewLaborDetails = () => {
  const [laborDetails, setLaborDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/labors')
      .then(response => {
        setLaborDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the labor details!', error);
        setError('There was an error fetching the labor details!');
      });
  }, []);

  const handleDelete = (laborId) => {
    axios.delete(`http://localhost:3000/labors/${laborId}`)
      .then(() => {
        setLaborDetails(laborDetails.filter(laborDetail => laborDetail.labor_id !== laborId));
      })
      .catch(error => {
        console.error('There was an error deleting the labor!', error);
        setError('There was an error deleting the labor!');
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

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
            <th scope="col">Actions</th>
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
              <td className="text-center">
                <Link to={`/edit-labor/${laborDetail.labor_id}`} className="btn btn-outline-primary btn-sm me-2">Edit
                  <i className="bi bi-pencil-square"></i>
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(laborDetail.labor_id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewLaborDetails;
