import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditExpenditure = () => {
  const { id } = useParams(); // Get the expenditure_id from URL params
  const navigate = useNavigate();

  const [expenditureDetail, setExpenditureDetail] = useState({
    acre_id: '',
    water: '',
    fertilizer: '',
    pruning: '',
    others: '',
    edate: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the existing expenditure details
    axios.get(`http://localhost:3000/expendituredetails/${id}`)
      .then(response => {
        setExpenditureDetail(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching expenditure details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenditureDetail({
      ...expenditureDetail,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/update-expenditure/${id}`, expenditureDetail)
      .then(() => {
        navigate('/view-expendituredetails'); // Redirect to the view page after successful update
      })
      .catch(error => {
        setError('Error updating expenditure.');
        console.error('There was an error updating the expenditure!', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-center mb-4">Edit Expenditure Details</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label className="form-label">Acre ID</label>
          <input
            type="number"
            name="acre_id"
            value={expenditureDetail.acre_id}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Water</label>
          <input
            type="text"
            name="water"
            value={expenditureDetail.water}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fertilizer</label>
          <input
            type="text"
            name="fertilizer"
            value={expenditureDetail.fertilizer}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Pruning</label>
          <input
            type="text"
            name="pruning"
            value={expenditureDetail.pruning}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Others</label>
          <input
            type="text"
            name="others"
            value={expenditureDetail.others}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Spent On</label>
          <input
            type="date"
            name="edate"
            value={expenditureDetail.edate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Expenditure</button>
      </form>
    </div>
  );
};

export default EditExpenditure;
