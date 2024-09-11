import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddBlock() {
  const [blockData, setBlockData] = useState({
    block_name: '',
    block_area: '',
    property_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlockData({
      ...blockData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/addblock', blockData)
      .then(response => {
        alert('Block added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the block!', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Block</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="block_name" className="form-label">Block Name</label>
          <input
            type="text"
            id="block_name"
            name="block_name"
            value={blockData.block_name}
            onChange={handleChange}
            className="form-control"
            placeholder="Block Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="block_area" className="form-label">Block Area (in square meters)</label>
          <input
            type="number"
            id="block_area"
            name="block_area"
            value={blockData.block_area}
            onChange={handleChange}
            className="form-control"
            placeholder="Block Area"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="property_id" className="form-label">Property ID</label>
          <input
            type="text"
            id="property_id"
            name="property_id"
            value={blockData.property_id}
            onChange={handleChange}
            className="form-control"
            placeholder="Property ID"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Block</button>
      </form>
    </div>
  );
}

export default AddBlock;
