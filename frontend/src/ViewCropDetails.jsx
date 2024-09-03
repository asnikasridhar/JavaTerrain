import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewCropDetails = () => {
  const [cropDetails, setCropDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/cropdetails')
      .then(response => {
        setCropDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the crop details!', error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-cropdetail/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this crop detail?')) {
      axios.delete(`http://localhost:3000/delete-cropdetail/${id}`)
        .then(() => {
          setCropDetails(cropDetails.filter(crop => crop.crop_id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the crop detail!', error);
        });
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Crop Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Crop ID</th>
            <th scope="col">Acre ID</th>
            <th scope="col">Yield Obtained</th>
            <th scope="col">Selling Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cropDetails.map((cropDetail, index) => (
            <tr key={index}>
              <td>{cropDetail.crop_id}</td>
              <td>{cropDetail.acre_id}</td>
              <td>{cropDetail.yield_obtained}</td>
              <td>{cropDetail.selling_price}</td>
              <td>
                <button 
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(cropDetail.crop_id)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cropDetail.crop_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCropDetails;
