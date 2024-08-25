import React, { useState } from 'react';
import AddAcre from './AddAcre';
import AddLabor from './AddLabor';
import AddUser from './AddUser';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function MainPage() {
  const [currentComponent, setCurrentComponent] = useState(null);

  const renderComponent = () => {
    switch (currentComponent) {
      case 'addAcre':
        return <AddAcre />;
      case 'addLabor':
        return <AddLabor />;
      case 'addUser':
        return <AddUser />;
      default:
        return <div>Please select an option from the menu.</div>;
    }
  };

  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Welcome to the Coffee Estate Management Systems</h1>
        <div className="d-flex justify-content-center mb-4">
          <button 
            onClick={() => setCurrentComponent('addAcre')} 
            className="btn btn-primary me-2"
          >
            Add Acre
          </button>
          <button 
            onClick={() => setCurrentComponent('addLabor')} 
            className="btn btn-secondary me-2"
          >
            Add Labor
          </button>
          <button 
            onClick={() => setCurrentComponent('addUser')} 
            className="btn btn-success"
          >
            Add User
          </button>
        </div>
        <div className="border p-4 rounded">
          {renderComponent()}
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-link">Home</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default MainPage;
