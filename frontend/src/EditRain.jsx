import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditRain = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rainDetail, setRainDetail] = useState({
    date_time: '',
    rain_amount: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/raindetails/${id}`)
      .then(response => {
        setRainDetail(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching rain details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRainDetail({
      ...rainDetail,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/update-rain/${id}`, rainDetail)
      .then(() => {
        navigate('/view-raindetails');
      })
      .catch(error => {
        setError('Error updating rain detail.');
        console.error('There was an error updating the rain detail!', error);
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
      <h2 className="text-center mb-4">Edit Rain Detail</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label className="form-label">Date and Time</label>
          <input
            type="datetime-local"
            name="date_time"
            value={rainDetail.date_time}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rain Amount (mm)</label>
          <input
            type="number"
            name="rain_amount"
            value={rainDetail.rain_amount}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Rain Detail</button>
      </form>
    </div>
  );
};

export default EditRain;
