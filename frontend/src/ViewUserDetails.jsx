import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure bootstrap-icons is imported

const ViewUserDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUserDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user details!', error);
        setError('Failed to fetch user details.');
      });
  }, []);

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:3000/users/${userId}`)
      .then(() => {
        setUserDetails(userDetails.filter(user => user.user_id !== userId));
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
        setError('Failed to delete user.');
      });
  };

  return (
    <div>
      <h2 className="text-center mb-4">User Details</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Active</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((userDetail, index) => (
            <tr key={index}>
              <td>{userDetail.user_id}</td>
              <td>{userDetail.username}</td>
              <td>{userDetail.email}</td>
              <td>{userDetail.role}</td>
              <td>{userDetail.is_active ? 'Yes' : 'No'}</td>
              <td className="text-center">
                <Link to={`/edit-user/${userDetail.user_id}`} className="btn btn-outline-primary btn-sm me-2">
                  <i className="bi bi-pencil"></i> Edit
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(userDetail.user_id)}
                >
                  <i className="bi bi-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUserDetails;
 