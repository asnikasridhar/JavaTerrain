import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewRainDetails = () => {
  const [rainDetails, setRainDetails] = useState([]);
  const navigate = useNavigate();
  const selProperty = JSON.parse(localStorage.getItem('selProperty'));
  useEffect(() => {
    axios.get(`http://localhost:3000/raindetails-prop/${selProperty}`)
      .then(response => {
        setRainDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the rain details!', error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-rain/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this rain detail?')) {
      axios.delete(`http://localhost:3000/delete-rain/${id}`)
        .then(() => {
          setRainDetails(rainDetails.filter(rain => rain.rain_id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the rain detail!', error);
        });
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Rain Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Rain ID</th>
            <th scope="col">Date and Time</th>
            <th scope="col">Rain Amount (mm)</th>
            <th scope="col">Block Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rainDetails.map((rainDetail, index) => (
            <tr key={index}>
              <td>{rainDetail.rain_id}</td>
              <td>{new Date(rainDetail.date_time).toLocaleString()}</td>
              <td>{rainDetail.rain_amount}</td>
              <td>{rainDetail.block_name}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(rainDetail.rain_id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(rainDetail.rain_id)}
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
};

export default ViewRainDetails;
