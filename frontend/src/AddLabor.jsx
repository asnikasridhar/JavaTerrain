import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddLabor() {
  const [laborData, setLaborData] = useState({
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

  const [users, setUsers] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(localStorage.getItem('selProperty') || '');
  const [propertyId, setPropertyId] = useState(localStorage.getItem('selPropertyId') || ''); // Assuming property ID is stored in local storage

  // Fetch users based on selected property
  useEffect(() => {
    if (selectedProperty) {
      axios.get(`http://localhost:3000/users-by-property-id/${selectedProperty}`)
        .then(response => {
          setUsers(response.data); // Set the list of users
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  }, [selectedProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaborData({
      ...laborData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property: " +selectedProperty);
    const finalLaborData = {
      ...laborData,
      property_id: selectedProperty // Include property_id in the data sent to the backend
    };

    axios.post('http://localhost:3000/add-labor', finalLaborData)
      .then(response => {
        alert('Labor added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the labor!', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Labor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="user_id" className="form-label">Select User</label>
          <select
            id="user_id"
            name="user_id"
            value={laborData.user_id}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.user_id} value={user.user_id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        {/* Other input fields */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={laborData.name}
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
            value={laborData.age}
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
            value={laborData.adhar_card}
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
            value={laborData.bank_details}
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
            value={laborData.health_history}
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
            value={laborData.photo}
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
            value={laborData.address}
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
            value={laborData.emergency_details}
            onChange={handleChange}
            className="form-control"
            placeholder="Emergency Details"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Labor</button>
      </form>
    </div>
  );
}

export default AddLabor;
