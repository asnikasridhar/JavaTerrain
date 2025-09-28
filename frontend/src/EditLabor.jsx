import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditLabor = () => {
  const { id } = useParams(); // Get the labor ID from URL params
  const navigate = useNavigate();

  const [laborDetail, setLaborDetail] = useState({
    user_id: '',
    name: '',
    age: '',
    adhar_card: '',
    bank_details: '',
    health_history: '',
    photo: '',
    address: '',
    emergency_details: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the existing labor details by ID
    axios.get(`http://localhost:3000/labor/${id}`)
      .then(response => {
        setLaborDetail(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching labor details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaborDetail({
      ...laborDetail,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/labors/${id}`, laborDetail)
      .then(() => {
        navigate('/view-labordetails'); // Redirect to the view page after successful update
      })
      .catch(error => {
        setError('Error updating labor.');
        console.error('There was an error updating the labor!', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Labor Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="user_id" className="form-label">User ID</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={laborDetail.user_id}
            onChange={handleChange}
            className="form-control"
            placeholder="User ID"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={laborDetail.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={laborDetail.age}
            onChange={handleChange}
            className="form-control"
            placeholder="Age"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="adhar_card" className="form-label">Adhar Card</label>
          <input
            type="text"
            id="adhar_card"
            name="adhar_card"
            value={laborDetail.adhar_card}
            onChange={handleChange}
            className="form-control"
            placeholder="Adhar Card"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bank_details" className="form-label">Bank Details</label>
          <input
            type="text"
            id="bank_details"
            name="bank_details"
            value={laborDetail.bank_details}
            onChange={handleChange}
            className="form-control"
            placeholder="Bank Details"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="health_history" className="form-label">Health History</label>
          <textarea
            id="health_history"
            name="health_history"
            value={laborDetail.health_history}
            onChange={handleChange}
            className="form-control"
            placeholder="Health History"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">Photo URL</label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={laborDetail.photo}
            onChange={handleChange}
            className="form-control"
            placeholder="Photo URL"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={laborDetail.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Address"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emergency_details" className="form-label">Emergency Details</label>
          <input
            type="text"
            id="emergency_details"
            name="emergency_details"
            value={laborDetail.emergency_details}
            onChange={handleChange}
            className="form-control"
            placeholder="Emergency Details"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Update Labor</button>
      </form>
    </div>
  );
};

export default EditLabor;
