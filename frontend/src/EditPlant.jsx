import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditPlant = () => {
  const { id } = useParams(); // Get the id from URL params
  const navigate = useNavigate();
  
  const [plantDetail, setPlantDetail] = useState({
    plant_id: '',
    acre_id: '',
    plant_type: 'robusta', // Default value
    details: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the existing plant details
    axios.get(`http://localhost:3000/plantdetails/${id}`)
      .then(response => {
        setPlantDetail(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching plant details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantDetail({
      ...plantDetail,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/update-plantdetail/${id}`, plantDetail)
      .then(() => {
        navigate('/view-plantdetails'); // Redirect to the view page after successful update
      })
      .catch(error => {
        setError('Error updating plant.');
        console.error('There was an error updating the plant!', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-center mb-4">Edit Plant Details</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label className="form-label">Acre ID</label>
          <input
            type="number"
            name="acre_id"
            value={plantDetail.acre_id}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Plant Type</label>
          <select
            name="plant_type"
            value={plantDetail.plant_type}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="robusta">Robusta</option>
            <option value="arabica">Arabica</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Details</label>
          <textarea
            name="details"
            value={plantDetail.details}
            onChange={handleChange}
            className="form-control"
            rows="3"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Plant</button>
      </form>
    </div>
  );
};

export default EditPlant;
