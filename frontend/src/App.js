import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddAcre from './AddAcre';
import AddLabor from './AddLabor';
import AddUser from './AddUser';
import Home from './Home';
import AddPlantDetails from './AddPlantDetail';
import AddCropDetails from './AddCropDetails';
import AddFertilizers from './AddFertilizers';
import AddExpenditure from './AddExpenditure';
import AddRainDetails from './AddRainDetails';
import AddReport from './AddReport';

import ViewAcreDetails from './ViewAcreDetails';
import ViewLaborDetails from './ViewLaborDetails';
import ViewUserDetails from './ViewUserDetails';
import ViewPlantDetails from './ViewPlantDetails';
import ViewCropDetails from './ViewCropDetails';
import ViewFertilizerDetails from './ViewFertilizerDetails';
import ViewExpenditureDetails from './ViewExpenditureDetails';
import ViewRainDetails from './ViewRainDetails';
import ViewReportDetails from './ViewReportDetails';

function App() {
  const [activeTab, setActiveTab] = useState('view'); // default to 'view'

  return (
    <Router>
      <div className="App container mt-5" style={{ fontFamily: 'Arial, sans-serif' }}>
        <h1 className="text-center mb-4">Coffee Estate Management</h1>
        <nav className="mb-4 text-center">
          <Link to="/" className="btn btn-info me-2">Home</Link>

          {/* Add Dropdown */}
          <Dropdown as={ButtonGroup} className="me-2">
            <Dropdown.Toggle variant="primary">
              Add
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/add-acre">Add Acre</Dropdown.Item>
              <Dropdown.Item as={Link} to="/add-labor">Add Labor</Dropdown.Item>
              <Dropdown.Item as={Link} to="/add-user">Add User</Dropdown.Item>
              <Dropdown.Item as={Link} to="/add-plantdetails">Add Plant Details</Dropdown.Item>
              <Dropdown.Item as={Link} to="/add-cropDetail">Add Crop Details</Dropdown.Item>
              <Dropdown.Item as={Link} to="/add-fertilizer">Add Fertilizer</Dropdown.Item>
              <Dropdown.Item as={Link} to="/add-expenditure">Add Expenditure</Dropdown.Item>
              <Dropdown.Item as={Link} to="/add-raindetails">Add Rain Details</Dropdown.Item>
              <Dropdown.Item as={Link} to="/add-reports">Add Reports</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* View Dropdown */}
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant="primary">
              View
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/view-acredetails">View Acre Details</Dropdown.Item>
              <Dropdown.Item as={Link} to="/view-labordetails">View Labor Details</Dropdown.Item>
              <Dropdown.Item as={Link} to="/view-userdetails">View User Details</Dropdown.Item>
              <Dropdown.Item as={Link} to="/view-plantdetails">View Plant Details</Dropdown.Item>
              <Dropdown.Item as={Link} to="/view-cropdetails">View Crop Details</Dropdown.Item>
              <Dropdown.Item as={Link} to="/view-fertilizerdetails">View Fertilizer Details</Dropdown.Item>
              <Dropdown.Item as={Link} to="/view-expendituredetails">View Expenditure Details</Dropdown.Item>
              <Dropdown.Item as={Link} to="/view-raindetails">View Rain Details</Dropdown.Item>
              <Dropdown.Item as={Link} to="/view-reportdetails">View Report Details</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>

        <div className="border p-2 rounded">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-acre" element={<AddAcre />} />
            <Route path="/view-acredetails" element={<ViewAcreDetails />} />

            <Route path="/add-labor" element={<AddLabor />} />
            <Route path="/view-labordetails" element={<ViewLaborDetails />} />

            <Route path="/add-user" element={<AddUser />} />
            <Route path="/view-userdetails" element={<ViewUserDetails />} />

            <Route path='/add-plantdetails' element={<AddPlantDetails />} />
            <Route path='/view-plantdetails' element={<ViewPlantDetails />} />

            <Route path='/add-cropDetail' element={<AddCropDetails />} />
            <Route path='/view-cropdetails' element={<ViewCropDetails />} />

            <Route path='/add-fertilizer' element={<AddFertilizers />} />
            <Route path='/view-fertilizerdetails' element={<ViewFertilizerDetails />} />

            <Route path='/add-expenditure' element={<AddExpenditure />} />
            <Route path='/view-expendituredetails' element={<ViewExpenditureDetails />} />

            <Route path='/add-raindetails' element={<AddRainDetails />} />
            <Route path='/view-raindetails' element={<ViewRainDetails />} />

            <Route path='/add-reports' element={<AddReport />} />
            <Route path='/view-reportdetails' element={<ViewReportDetails />} />

            {/* Redirect all unknown routes to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
