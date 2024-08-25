import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditAcre = () => {
  const { id } = useParams(); // Get the id from URL params
  const navigate = useNavigate();
  
  const [acreDetail, setAcreDetail] = useState({
    user_id: '',
    acre_size: '',
    plant_type: '',
    terrain: '',
    location: '',
    water_availability: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the existing acre details
    axios.get(`http://localhost:3000/acredetails/${id}`)
      .then(response => {
        setAcreDetail(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching acre details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAcreDetail({
      ...acreDetail,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/update-acre/${id}`, acreDetail)
      .then(() => {
        navigate('/view-acredetails'); // Redirect to the view page after successful update
      })
      .catch(error => {
        setError('Error updating acre.');
        console.error('There was an error updating the acre!', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-center mb-4">Edit Acre Details</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={acreDetail.location}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Size</label>
          <input
            type="text"
            name="acre_size"
            value={acreDetail.acre_size}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Plant Type</label>
          <input
            type="text"
            name="plant_type"
            value={acreDetail.plant_type}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Terrain</label>
          <input
            type="text"
            name="terrain"
            value={acreDetail.terrain}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Water Availability</label>
          <input
            type="checkbox"
            name="water_availability"
            checked={acreDetail.water_availability}
            onChange={handleChange}
          />
          <label className="form-check-label">Available</label>
        </div>
        <button type="submit" className="btn btn-primary">Update Acre</button>
      </form>
    </div>
  );
};

export default EditAcre;
