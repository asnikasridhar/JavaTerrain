import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddUser() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: 'owner',
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/add-user', userData)
      .then(response => {
        alert('User added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded">
      <h2 className="mb-4 text-center">Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
          >
            <option value="owner">Owner</option>
            <option value="guest">Guest</option>
          </select>
        </div>
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="is_active"
            name="is_active"
            checked={userData.is_active}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="is_active">
            Active
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
