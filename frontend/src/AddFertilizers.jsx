import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddFertilizers() {
  const [fertilizerData, setFertilizerData] = useState({
    acre_id: '',
    fertilizer_name: '',
    date_of_application: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFertilizerData({
      ...fertilizerData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/add-fertilizer', fertilizerData)
      .then(response => {
        alert('Fertilizer details added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the fertilizer details!', error);
      });
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded">
      <h2 className="mb-4 text-center">Add Fertilizer Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="property_id">Property ID</label>
          <input
            type="text"
            className="form-control"
            id="property_id"
            name="property_id"
            value={fertilizerData.acre_id}
            onChange={handleChange}
            placeholder="Enter Property ID"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="fertilizer_name">Fertilizer Name</label>
          <input
            type="text"
            className="form-control"
            id="fertilizer_name"
            name="fertilizer_name"
            value={fertilizerData.fertilizer_name}
            onChange={handleChange}
            placeholder="Enter Fertilizer Name"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="date_of_application">Date of Application</label>
          <input
            type="date"
            className="form-control"
            id="date_of_application"
            name="date_of_application"
            value={fertilizerData.date_of_application}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Fertilizer Details</button>
      </form>
    </div>
  );
}

export default AddFertilizers;
