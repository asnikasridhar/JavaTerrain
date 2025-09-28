import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddAcre() {
  const [acreData, setAcreData] = useState({
    user_id: '',
    acre_size: '',
    plant_type: 'robusta',
    terrain: '',
    location: '',
    water_availability: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAcreData({
      ...acreData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/add-acre', acreData)
      .then(response => {
        alert('Acre added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the acre!', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Acre</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="user_id" className="form-label">User ID</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={acreData.user_id}
            onChange={handleChange}
            className="form-control"
            placeholder="User ID"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="acre_size" className="form-label">Acre Size (in meters)</label>
          <input
            type="number"
            id="acre_size"
            name="acre_size"
            value={acreData.acre_size}
            onChange={handleChange}
            className="form-control"
            placeholder="Acre Size"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="plant_type" className="form-label">Plant Type</label>
          <select
            id="plant_type"
            name="plant_type"
            value={acreData.plant_type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="robusta">Robusta</option>
            <option value="arabica">Arabica</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="terrain" className="form-label">Terrain</label>
          <input
            type="text"
            id="terrain"
            name="terrain"
            value={acreData.terrain}
            onChange={handleChange}
            className="form-control"
            placeholder="Terrain"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={acreData.location}
            onChange={handleChange}
            className="form-control"
            placeholder="Location"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="water_availability"
            name="water_availability"
            checked={acreData.water_availability}
            onChange={handleChange}
            className="form-check-input"
          />
          <label htmlFor="water_availability" className="form-check-label">Water Availability</label>
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Acre</button>
      </form>
    </div>
  );
}

export default AddAcre;
