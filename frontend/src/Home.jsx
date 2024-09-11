import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Adjust the path as needed

const Home = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');

  // Simulate user data storage
  let userData = JSON.stringify({
    userId: 1,
    user_name: 'Asnika',
    email: 'asnikasridhar1@gmail.com',
    propertyId: [1, 2]
  });
  localStorage.setItem('userDetails', userData);
  localStorage.setItem('selPropertyName', 'TestProperty11');
  localStorage.setItem('selProperty', '1');

  useEffect(() => {
    // Fetch user details from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserData) {
      setUserName(storedUserData.user_name);
      setEmail(storedUserData.email);
    }

    // Fetch selected property from localStorage
    const storedProperty = localStorage.getItem('selPropertyName');
    if (storedProperty) {
      setSelectedProperty(storedProperty);
    }
  }, []);

  return (
    <div className="container-fluid home-container">
      {/* Row for user details at the top-right corner */}
      <div className="row justify-content-end mt-3">
        <div className="col-md-3 col-lg-2">
          <div className="card shadow-sm user-card">
            <div className="card-body text-center">
              <p className="card-text mb-1"><strong>User:</strong> {userName}</p>
              <p className="card-text"><strong>Property:</strong> {selectedProperty}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main welcome message */}
      <div className="row justify-content-center align-items-center main-content">
        <div className="col-md-8 text-center bg-overlay p-4 rounded shadow-lg">
          <h2 className="text-light">Welcome to the Coffee Estate Management System</h2>
          <p className="text-light">Select an option from the menu above to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
