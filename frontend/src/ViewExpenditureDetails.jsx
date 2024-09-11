import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewExpenditureDetails = () => {
  const [expenditureDetails, setExpenditureDetails] = useState([]);
  const [days, setDays] = useState(30); // Default value of 30 days
  const navigate = useNavigate();
  const selProperty = JSON.parse(localStorage.getItem('selProperty'));

  // Fetch data whenever `selProperty` or `days` changes
  useEffect(() => {
    axios.get(`http://localhost:3000/expendituredetails-by-prop/${selProperty}/${days}`)
      .then(response => {
        setExpenditureDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the expenditure details!', error);
      });
  }, [selProperty, days]); // Trigger useEffect on selProperty or days change

  const handleEdit = (id) => {
    navigate(`/edit-expenditure/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expenditure detail?')) {
      axios.delete(`http://localhost:3000/delete-expenditure/${id}`)
        .then(() => {
          setExpenditureDetails(expenditureDetails.filter(expenditure => expenditure.expenditure_id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the expenditure detail!', error);
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
      <h2 className="text-center mb-4">Expenditure Details</h2>
      
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
            <th scope="col">Expenditure ID</th>
            <th scope="col">Water</th>
            <th scope="col">Fertilizer</th>
            <th scope="col">Pruning</th>
            <th scope="col">Others</th>
            <th scope="col">Spent On</th>
            <th scope="col">Fuel</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenditureDetails.length > 0 ? (
            expenditureDetails.map((expenditureDetail, index) => (
              <tr key={index}>
                <td>{expenditureDetail.expenditure_id}</td>
                <td>{expenditureDetail.water}</td>
                <td>{expenditureDetail.fertilizer}</td>
                <td>{expenditureDetail.pruning}</td>
                <td>{expenditureDetail.others}</td>
                <td>{new Date(expenditureDetail.edate).toLocaleDateString()}</td>
                <td>{expenditureDetail.fuel}</td>
                <td>
                  <button 
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(expenditureDetail.expenditure_id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(expenditureDetail.expenditure_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No expenditure details available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewExpenditureDetails;
