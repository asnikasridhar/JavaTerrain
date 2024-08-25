import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddReport() {
  const [reportData, setReportData] = useState({
    acre_id: '',
    total_expenditure: '',
    total_revenue: '',
    profit_loss: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/add-report', reportData)
      .then(response => {
        alert('Report added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the report!', error);
      });
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded">
      <h2 className="mb-4 text-center">Add New Report</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="acre_id">Acre ID</label>
          <input
            type="text"
            className="form-control"
            id="acre_id"
            name="acre_id"
            value={reportData.acre_id}
            onChange={handleChange}
            placeholder="Enter Acre ID"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="total_expenditure">Total Expenditure</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="total_expenditure"
            name="total_expenditure"
            value={reportData.total_expenditure}
            onChange={handleChange}
            placeholder="Enter Total Expenditure"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="total_revenue">Total Revenue</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="total_revenue"
            name="total_revenue"
            value={reportData.total_revenue}
            onChange={handleChange}
            placeholder="Enter Total Revenue"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="profit_loss">Profit/Loss</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="profit_loss"
            name="profit_loss"
            value={reportData.profit_loss}
            onChange={handleChange}
            placeholder="Enter Profit or Loss"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Report</button>
      </form>
    </div>
  );
}

export default AddReport;
