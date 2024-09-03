import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditFertilizer = () => {
  const { fertilizer_id } = useParams(); // Get the fertilizer_id from URL params
  const navigate = useNavigate();
  console.log(fertilizer_id);
  const [fertilizerDetail, setFertilizerDetail] = useState({
    acre_id: '',
    fertilizer_name: '',
    date_of_application: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the existing fertilizer details
    axios.get(`http://localhost:3000/fertilizerdetails/${fertilizer_id}`)
      .then(response => {
        setFertilizerDetail(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching fertilizer details.');
        setLoading(false);
      });
  }, [fertilizer_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFertilizerDetail({
      ...fertilizerDetail,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/update-fertilizer/${fertilizer_id}`, fertilizerDetail)
      .then(() => {
        navigate('/view-fertilizerdetails'); // Redirect to the view page after successful update
      })
      .catch(error => {
        setError('Error updating fertilizer.');
        console.error('There was an error updating the fertilizer!', error);
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
      <h2 className="text-center mb-4">Edit Fertilizer Details</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label className="form-label">Acre ID</label>
          <input
            type="number"
            name="acre_id"
            value={fertilizerDetail.acre_id}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fertilizer Name</label>
          <input
            type="text"
            name="fertilizer_name"
            value={fertilizerDetail.fertilizer_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Application</label>
          <input
            type="date"
            name="date_of_application"
            value={fertilizerDetail.date_of_application}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Fertilizer</button>
      </form>
    </div>
  );
};

export default EditFertilizer;
