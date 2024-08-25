import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewRainDetails = () => {
  const [rainDetails, setRainDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/raindetails')
      .then(response => {
        setRainDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the rain details!', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center mb-4">Rain Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Rain ID</th>
            <th scope="col">Date and Time</th>
            <th scope="col">Rain Amount (mm)</th>
          </tr>
        </thead>
        <tbody>
          {rainDetails.map((rainDetail, index) => (
            <tr key={index}>
              <td>{rainDetail.rain_id}</td>
              <td>{new Date(rainDetail.date_time).toLocaleString()}</td>
              <td>{rainDetail.rain_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewRainDetails;
