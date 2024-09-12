import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Adjust the path as needed

const Home = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    // Fetch user details from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserData) {
      setUserName(storedUserData.user_name);
      setEmail(storedUserData.email);
      setAllProperties(storedUserData.all_properties);

      // Fetch selected property from localStorage
      const storedPropertyName = localStorage.getItem('selPropertyName');
      if (storedPropertyName) {
        setSelectedProperty(storedPropertyName);
      } else {
        // Set the default property (first one in the list) if not selected
        const defaultProperty = storedUserData.all_properties[0];
        setSelectedProperty(defaultProperty.property_name);
        localStorage.setItem('selPropertyName', defaultProperty.property_name);
        localStorage.setItem('selProperty', defaultProperty.property_id);
      }
    }
  }, []);

  // Handle property selection change
  const handlePropertyChange = (e) => {
    const selectedProp = allProperties.find(prop => prop.property_id === parseInt(e.target.value));
    if (selectedProp) {
      setSelectedProperty(selectedProp.property_name);
      localStorage.setItem('selPropertyName', selectedProp.property_name);
      localStorage.setItem('selProperty', selectedProp.property_id);
    }
  };

  return (
    <div className="container-fluid home-container">
      {/* Row for user details at the top-right corner */}
      <div className="row justify-content-end mt-3">
        <div className="col-md-3 col-lg-2">
          <div className="card shadow-sm user-card">
            <div className="card-body text-center">
              <p className="card-text mb-1 user"><strong>User:</strong> {userName}</p>

              {/* Property Dropdown */}
              <div className="form-group mt-3">
                <select
                  id="propertySelect"
                  className="form-control"
                  value={allProperties.find(prop => prop.property_name === selectedProperty)?.property_id || ''}
                  onChange={handlePropertyChange}
                >
                  {allProperties.map((property) => (
                    <option key={property.property_id} value={property.property_id}>
                      {property.property_name}
                    </option>
                  ))}
                </select>
              </div>
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
