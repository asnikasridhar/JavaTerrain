import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddExpenditure() {
  const [expenditureData, setExpenditureData] = useState({
    acre_id: '',
    water: '',
    fertilizer: '',
    pruning: '',
    others: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenditureData({
      ...expenditureData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/add-expenditure', expenditureData)
      .then(response => {
        alert('Expenditure details added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the expenditure details!', error);
      });
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded">
      <h2 className="mb-4 text-center">Add Expenditure Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="acre_id">Acre ID</label>
          <input
            type="text"
            className="form-control"
            id="acre_id"
            name="acre_id"
            value={expenditureData.acre_id}
            onChange={handleChange}
            placeholder="Enter Acre ID"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="water">Water Cost</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="water"
            name="water"
            value={expenditureData.water}
            onChange={handleChange}
            placeholder="Enter Water Cost"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="fertilizer">Fertilizer Cost</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="fertilizer"
            name="fertilizer"
            value={expenditureData.fertilizer}
            onChange={handleChange}
            placeholder="Enter Fertilizer Cost"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="pruning">Pruning Cost</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="pruning"
            name="pruning"
            value={expenditureData.pruning}
            onChange={handleChange}
            placeholder="Enter Pruning Cost"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="others">Other Expenses</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="others"
            name="others"
            value={expenditureData.others}
            onChange={handleChange}
            placeholder="Enter Other Expenses"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Expenditure Details</button>
      </form>
    </div>
  );
}

export default AddExpenditure;
