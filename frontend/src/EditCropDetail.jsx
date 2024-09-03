import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditCropDetail = () => {
  const { id } = useParams(); // Get the crop_id from URL params
  const navigate = useNavigate();
  
  const [cropDetail, setCropDetail] = useState({
    acre_id: '',
    yield_obtained: '',
    selling_price: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the existing crop details
    axios.get(`http://localhost:3000/cropdetails/${id}`)
      .then(response => {
        setCropDetail(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching crop details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropDetail({
      ...cropDetail,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/update-cropdetail/${id}`, cropDetail)
      .then(() => {
        navigate('/view-cropdetails'); // Redirect to the view page after successful update
      })
      .catch(error => {
        setError('Error updating crop.');
        console.error('There was an error updating the crop!', error);
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
      <h2 className="text-center mb-4">Edit Crop Details</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label className="form-label">Acre ID</label>
          <input
            type="number"
            name="acre_id"
            value={cropDetail.acre_id}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Yield Obtained</label>
          <input
            type="number"
            step="0.01"
            name="yield_obtained"
            value={cropDetail.yield_obtained}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Selling Price</label>
          <input
            type="number"
            step="0.01"
            name="selling_price"
            value={cropDetail.selling_price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Crop</button>
      </form>
    </div>
  );
};

export default EditCropDetail;
