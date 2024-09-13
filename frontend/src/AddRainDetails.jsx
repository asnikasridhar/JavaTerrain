import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddRainDetails() {
  const [rainData, setRainData] = useState({
    block_id: '',
    date_time: '',
    rain_amount: '',
  });

  const [blocks, setBlocks] = useState([]);
  const propertyId = localStorage.getItem('selProperty') || ''; // Get the property_id from local storage

  // Fetch blocks based on the selected property_id
  useEffect(() => {
    if (propertyId) {
      axios.get(`http://localhost:3000/blocks-by-prop/${propertyId}`)
        .then(response => {
          setBlocks(response.data); // Set the list of blocks
        })
        .catch(error => {
          console.error('Error fetching blocks:', error);
        });
    }
  }, [propertyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRainData({
      ...rainData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/add-rain', rainData)
      .then(response => {
        alert('Rain details added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the rain details!', error);
      });
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded">
      <h2 className="mb-4 text-center">Add Rain Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="block_id">Select Block</label>
          <select
            className="form-control"
            id="block_id"
            name="block_id"
            value={rainData.block_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Block</option>
            {blocks.map((block) => (
              <option key={block.block_id} value={block.block_id}>
                {block.block_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="date_time">Date and Time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="date_time"
            name="date_time"
            value={rainData.date_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="rain_amount">Rain Amount (mm)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="rain_amount"
            name="rain_amount"
            value={rainData.rain_amount}
            onChange={handleChange}
            placeholder="Enter Rain Amount"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Rain Details</button>
      </form>
    </div>
  );
}

export default AddRainDetails;
