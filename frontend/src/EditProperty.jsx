import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProperty = () => {
  const { id } = useParams(); // Get the property_id from URL params
  const navigate = useNavigate();
  
  const [propertyDetails, setPropertyDetails] = useState({
    property_name: '',
    total_acre: '',
    address_1: '',
    address_2: '',
    pincode: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(id);
    // Fetch the existing property details
    axios.get(`http://localhost:3000/propertydetails/${id}`)
      .then(response => {
        setPropertyDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching property details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({
      ...propertyDetails,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/update-property/${id}`, propertyDetails)
      .then(() => {
        navigate('/view-property'); // Redirect to the view page after successful update
      })
      .catch(error => {
        setError('Error updating property.');
        console.error('There was an error updating the property!', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5 p-4 bg-light rounded">
      <h2 className="text-center mb-4">Edit Property Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Property Name</label>
          <input
            type="text"
            name="property_name"
            value={propertyDetails.property_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Acre</label>
          <input
            type="number"
            step="0.01"
            name="total_acre"
            value={propertyDetails.total_acre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address 1</label>
          <input
            type="text"
            name="address_1"
            value={propertyDetails.address_1}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address 2</label>
          <input
            type="text"
            name="address_2"
            value={propertyDetails.address_2}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={propertyDetails.pincode}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Property</button>
      </form>
    </div>
  );
};

export default EditProperty;
