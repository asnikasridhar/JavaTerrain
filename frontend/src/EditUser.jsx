import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditUser = () => {
  const { id } = useParams(); // Get the id from URL params
  const navigate = useNavigate();
  
  const [userDetail, setUserDetail] = useState({
    username: '',
    email: '',
    role: '',
    status: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the existing user details
    axios.get(`http://localhost:3000/users/${id}`)
      .then(response => {
        setUserDetail(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching user details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserDetail({
      ...userDetail,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/users/${id}`, userDetail)
      .then(() => {
        navigate('/view-userdetails'); // Redirect to the view page after successful update
      })
      .catch(error => {
        setError('Error updating user.');
        console.error('There was an error updating the user!', error);
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
      <h2 className="text-center mb-4">Edit User Details</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            value={userDetail.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={userDetail.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <input
            type="text"
            name="role"
            value={userDetail.role}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <input
            type="checkbox"
            name="status"
            checked={userDetail.status}
            onChange={handleChange}
          />
          <label className="form-check-label">Active</label>
        </div>
        <button type="submit" className="btn btn-primary">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
