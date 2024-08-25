import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewAcreDetails = () => {
  const [acreDetails, setAcreDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/acredetails')
      .then(response => {
        setAcreDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('There was an error fetching the acre details!');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-center mb-4">Acre Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Acre ID</th>
            <th scope="col">Location</th>
            <th scope="col">Size</th>
            <th scope="col">Plant Type</th>
            <th scope="col">Terrain</th>
            <th scope="col">Water Availability</th>
          </tr>
        </thead>
        <tbody>
          {acreDetails.map((acreDetail, index) => (
            <tr key={index}>
              <td>{acreDetail.acre_id}</td>
              <td>{acreDetail.location}</td>
              <td>{acreDetail.acre_size}</td>
              <td>{acreDetail.plant_type}</td>
              <td>{acreDetail.terrain}</td>
              <td>{acreDetail.water_availability ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAcreDetails;
