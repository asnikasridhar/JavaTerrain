import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewUserDetails = () => {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')  // Update endpoint URL if necessary
      .then(response => {
        setUserDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user details!', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center mb-4">User Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Active</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((userDetail, index) => (
            <tr key={index}>
              <td>{userDetail.user_id}</td>
              <td>{userDetail.username}</td>
              <td>{userDetail.role}</td>
              <td>{userDetail.is_active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUserDetails;
