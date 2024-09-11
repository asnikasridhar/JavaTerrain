import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewFertilizerDetails = () => {
  const [fertilizerDetails, setFertilizerDetails] = useState([]);
  const [days, setDays] = useState(30); // Default value of 30 days
  const navigate = useNavigate();
  const selProperty = JSON.parse(localStorage.getItem('selProperty'));

  useEffect(() => {
    axios.get(`http://localhost:3000/fertilizers-by-prop/${selProperty}/${days}`)
      .then(response => {
        setFertilizerDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the fertilizer details!', error);
      });
  }, [selProperty, days]);

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

    // Function to handle days input change and ensure it's between 1 and 365
    const handleDaysChange = (e) => {
      let value = parseInt(e.target.value, 10);
      if (value < 1) value = 1;
      if (value > 365) value = 365;
      setDays(value); // Update the days state
    };

  return (
    <div>
      <h2 className="text-center mb-4">Fertilizer Details</h2>

      {/* Input field to allow user to specify number of days */}
      <div className="form-group mb-4">
        <label htmlFor="daysInput">View Expenditure for the Last</label>
        <input
          type="number"
          id="daysInput"
          className="form-control"
          value={days}
          min="1"
          max="365"
          onChange={handleDaysChange}
        />
        <small className="form-text text-muted">Enter a number between 1 and 365 days</small>
      </div>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Fertilizer ID</th>
            <th scope="col">Fertilizer Name</th>
            <th scope="col">Date of Application</th>
            <th scope="col">Other details</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fertilizerDetails.map((fertilizerDetail, index) => (
            <tr key={index}>
              <td>{fertilizerDetail.fertilizer_id}</td>
              <td>{fertilizerDetail.fertilizer_name}</td>
              <td>{fertilizerDetail.date_of_application}</td>
              <td>{fertilizerDetail.other_details}</td>
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
