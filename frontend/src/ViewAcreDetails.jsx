import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewAcreDetails = () => {
  const [acreDetails, setAcreDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const userId = userDetails?.userId;

  useEffect(() => {
    axios.get(`http://localhost:3000/acredetailsbyuserid/${userId}`)
      .then(response => {
        setAcreDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('There was an error fetching the acre details!');
        setLoading(false);
      });
  }, []);

  const handleDelete = (acreId) => {
    axios.delete(`http://localhost:3000/delete-acre/${acreId}`)
      .then(() => {
        // Refresh the list after deletion
        setAcreDetails(acreDetails.filter(acreDetail => acreDetail.acre_id !== acreId));
      })
      .catch(error => {
        console.error('There was an error deleting the acre!', error);
        setError('There was an error deleting the acre!');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-center mb-4">Acre Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Acre ID</th>
            <th scope="col">Location</th>
            <th scope="col">Size</th>
            <th scope="col">Plant Type</th>
            <th scope="col">Terrain</th>
            <th scope="col">Water Availability</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {acreDetails.map((acreDetail, index) => (
            <tr key={index}>
              <td>{acreDetail.acre_id}</td>
              <td>{acreDetail.location}</td>
              <td>{acreDetail.acre_size}</td>
              <td>{acreDetail.plant_type}</td>
              <td>{acreDetail.terrain}</td>
              <td>{acreDetail.water_availability ? 'Yes' : 'No'}</td>
              <td className="text-center">
                <Link to={`/edit-acre/${acreDetail.acre_id}`} className="btn btn-outline-primary btn-sm me-2">
                  <i className="bi bi-pencil"></i> Edit
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(acreDetail.acre_id)}
                >
                  <i className="bi bi-dash-lg"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAcreDetails;
