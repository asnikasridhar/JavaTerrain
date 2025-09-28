import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddPlantDetails() {
  const [plantData, setPlantData] = useState({
    acre_id: '',
    plant_type: 'robusta',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantData({
      ...plantData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/add-plantdetail', plantData)
      .then(response => {
        alert('Plant details added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the plant details!', error);
      });
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded">
      <h2 className="mb-4 text-center">Add Plant Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="block_id">Block ID</label>
          <input
            type="text"
            className="form-control"
            id="block_id"
            name="block_id"
            value={plantData.block_id}
            onChange={handleChange}
            placeholder="Enter Block ID"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="plant_type">Plant Type</label>
          <select
            className="form-control"
            id="plant_type"
            name="plant_type"
            value={plantData.plant_type}
            onChange={handleChange}
          >
            <option value="robusta">Robusta</option>
            <option value="arabica">Arabica</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="details">Details</label>
          <textarea
            className="form-control"
            id="details"
            name="details"
            value={plantData.details}
            onChange={handleChange}
            placeholder="Enter additional details"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Plant Details</button>
      </form>
    </div>
  );
}

export default AddPlantDetails;
