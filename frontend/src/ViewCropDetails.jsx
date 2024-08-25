import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewCropDetails = () => {
  const [cropDetails, setCropDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/cropdetails')
      .then(response => {
        setCropDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the crop details!', error);
      });
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {cropDetails.map((cropDetail, index) => (
            <tr key={index}>
              <td>{cropDetail.crop_id}</td>
              <td>{cropDetail.acre_id}</td>
              <td>{cropDetail.yield_obtained}</td>
              <td>{cropDetail.selling_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCropDetails;
