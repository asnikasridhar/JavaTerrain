import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewFertilizerDetails = () => {
  const [fertilizerDetails, setFertilizerDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/fertilizerdetails')
      .then(response => {
        setFertilizerDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the fertilizer details!', error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-fertilizerdetail/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fertilizer detail?')) {
      axios.delete(`http://localhost:3000/delete-fertilizer/${id}`)
        .then(() => {
          setFertilizerDetails(fertilizerDetails.filter(fertilizer => fertilizer.fertilizer_id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the fertilizer detail!', error);
        });
    }
  };

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
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fertilizerDetails.map((fertilizerDetail, index) => (
            <tr key={index}>
              <td>{fertilizerDetail.fertilizer_id}</td>
              <td>{fertilizerDetail.acre_id}</td>
              <td>{fertilizerDetail.fertilizer_name}</td>
              <td>{fertilizerDetail.date_of_application}</td>
              <td>
                <button 
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(fertilizerDetail.fertilizer_id)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(fertilizerDetail.fertilizer_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewFertilizerDetails;
