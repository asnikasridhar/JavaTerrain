import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddCropDetails() {
  const [cropData, setCropData] = useState({
    acre_id: '',
    yield_obtained: '',
    selling_price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropData({
      ...cropData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/add-cropdetail', cropData)
      .then(response => {
        alert('Crop details added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the crop details!', error);
      });
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded">
      <h2 className="mb-4 text-center">Add Crop Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="acre_id">Acre ID</label>
          <input
            type="text"
            className="form-control"
            id="acre_id"
            name="acre_id"
            value={cropData.acre_id}
            onChange={handleChange}
            placeholder="Enter Acre ID"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="yield_obtained">Yield Obtained (in kg)</label>
          <input
            type="number"
            className="form-control"
            id="yield_obtained"
            name="yield_obtained"
            value={cropData.yield_obtained}
            onChange={handleChange}
            placeholder="Enter Yield Obtained"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="selling_price">Selling Price (per kg)</label>
          <input
            type="number"
            className="form-control"
            id="selling_price"
            name="selling_price"
            value={cropData.selling_price}
            onChange={handleChange}
            placeholder="Enter Selling Price"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Crop Details</button>
      </form>
    </div>
  );
}

export default AddCropDetails;
