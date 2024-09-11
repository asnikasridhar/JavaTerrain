import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewBlock = () => {
  const [blockDetails, setBlockDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const selProperty = JSON.parse(localStorage.getItem('selProperty'));

  useEffect(() => {
    axios.get(`http://localhost:3000/blocks-by-prop/${selProperty}`)
      .then(response => {
        setBlockDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('There was an error fetching the block details!');
        setLoading(false);
      });
  }, []);

  const handleDelete = (blockId) => {
    axios.delete(`http://localhost:3000/deleteblock/${blockId}`)
      .then(() => {
        // Refresh the list after deletion
        setBlockDetails(blockDetails.filter(blockDetail => blockDetail.block_id !== blockId));
      })
      .catch(error => {
        console.error('There was an error deleting the block!', error);
        setError('There was an error deleting the block!');
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
      <h2 className="text-center mb-4">Block Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Block ID</th>
            <th scope="col">Block Name</th>
            <th scope="col">Block Area</th>
            <th scope="col">Property Name</th>
            <th scope="col">Property ID</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blockDetails.map((blockDetail, index) => (
            <tr key={index}>
              <td>{blockDetail.block_id}</td>
              <td>{blockDetail.block_name}</td>
              <td>{blockDetail.block_area}</td>
              <td>{blockDetail.property_name}</td>
              <td>{blockDetail.property_id}</td>
              <td className="text-center">
                <Link to={`/edit-block/${blockDetail.block_id}`} className="btn btn-outline-primary btn-sm me-2">
                  <i className="bi bi-pencil"></i> Edit
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(blockDetail.block_id)}
                >
                  <i className="bi bi-dash-lg"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBlock;
