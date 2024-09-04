import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddProperty() {
  const [propertyDetails, setPropertyDetails] = useState({
    property_name: '',
    total_acre: '',
    address_1: '',
    address_2: '',
    pincode: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({
      ...propertyDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const user_id = userDetails ? userDetails.user_id : null;

    if (!user_id) {
      setMessage('User ID not found in local storage.');
      return;
    }

    axios.post('http://localhost:3000/add-property-for-user', { user_id, ...propertyDetails })
      .then((response) => {
        setMessage('Property added successfully!');
        setPropertyDetails({
          property_name: '',
          total_acre: '',
          address_1: '',
          address_2: '',
          pincode: '',
        });
      })
      .catch((error) => {
        console.error('There was an error adding the property!', error);
        setMessage('Error adding property.');
      });
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded">
      <h2 className="mb-4 text-center">Add Property</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="property_name">Property Name</label>
          <input
            type="text"
            className="form-control"
            id="property_name"
            name="property_name"
            value={propertyDetails.property_name}
            onChange={handleChange}
            placeholder="Enter Property Name"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="total_acre">Total Acre</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="total_acre"
            name="total_acre"
            value={propertyDetails.total_acre}
            onChange={handleChange}
            placeholder="Enter Total Acre"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address_1">Address 1</label>
          <input
            type="text"
            className="form-control"
            id="address_1"
            name="address_1"
            value={propertyDetails.address_1}
            onChange={handleChange}
            placeholder="Enter Address 1"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address_2">Address 2</label>
          <input
            type="text"
            className="form-control"
            id="address_2"
            name="address_2"
            value={propertyDetails.address_2}
            onChange={handleChange}
            placeholder="Enter Address 2"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            name="pincode"
            value={propertyDetails.pincode}
            onChange={handleChange}
            placeholder="Enter Pincode"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;
