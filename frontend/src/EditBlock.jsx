import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditBlock = () => {
  const { id } = useParams(); // Get the id from URL params
  const navigate = useNavigate();
  
  const [blockDetail, setBlockDetail] = useState({
    block_name: '',
    block_area: '',
    property_id: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the existing block details
    axios.get(`http://localhost:3000/blockdetails/${id}`)
      .then(response => {
        setBlockDetail(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching block details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlockDetail({
      ...blockDetail,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/updateblock/${id}`, blockDetail)
      .then(() => {
        navigate('/view-blocks'); // Redirect to the view page after successful update
      })
      .catch(error => {
        setError('Error updating block.');
        console.error('There was an error updating the block!', error);
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
      <h2 className="text-center mb-4">Edit Block Details</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label className="form-label">Block Name</label>
          <input
            type="text"
            name="block_name"
            value={blockDetail.block_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Block Area (in square meters)</label>
          <input
            type="number"
            name="block_area"
            value={blockDetail.block_area}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Property ID</label>
          <input
            type="text"
            name="property_id"
            value={blockDetail.property_id}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Block</button>
      </form>
    </div>
  );
};

export default EditBlock;
