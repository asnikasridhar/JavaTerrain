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
    <div className="container mt-4 home-container">
      {/* Row for user details at the top-right corner */}
      <div className="row justify-content-end">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body sel-detail" >
              <p className="card-text"><strong>User:</strong> {userName}, <strong>Email:</strong> {email}</p>
              <p className="card-text"><strong>Selected Property:</strong> {selectedProperty}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main welcome message */}
      <div className="row justify-content-center mt-5 ">
        <div className="col-md-8 text-center cus-bg">
          <h2>Welcome to the Coffee Estate Management System</h2>
          <p>Select an option from the menu above to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
