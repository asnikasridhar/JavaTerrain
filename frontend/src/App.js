import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import AddAcre from './AddAcre';
import AddLabor from './AddLabor';
import AddUser from './AddUser';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
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

  // Define the navigation links for each tab
  const getNavLinks = () => {
    if (activeTab === 'add') {
      return (
        <>
          <Link to="/add-acre" className="btn btn-secondary me-2">Add Acre</Link>
          <Link to="/add-labor" className="btn btn-secondary me-2">Add Labor</Link>
          <Link to="/add-user" className="btn btn-secondary me-2">Add User</Link>
          <Link to="/add-plantdetails" className="btn btn-secondary me-2">Add Plant Details</Link>
          <Link to="/add-cropDetail" className="btn btn-secondary me-2">Add Crop Details</Link>
          <Link to="/add-fertilizer" className="btn btn-secondary me-2">Add Fertilizer</Link>
          <Link to="/add-expenditure" className="btn btn-secondary me-2">Add Expenditure</Link>
          <Link to="/add-raindetails" className="btn btn-secondary me-2">Add Rain Details</Link>
          <Link to="/add-reports" className="btn btn-secondary me-2">Add Reports</Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/view-acredetails" className="btn btn-secondary me-2">View Acre Details</Link>
          <Link to="/view-labordetails" className="btn btn-secondary me-2">View Labor Details</Link>
          <Link to="/view-userdetails" className="btn btn-secondary me-2">View User Details</Link>
          <Link to="/view-plantdetails" className="btn btn-secondary me-2">View Plant Details</Link>
          <Link to="/view-cropdetails" className="btn btn-secondary me-2">View Crop Details</Link>
          <Link to="/view-fertilizerdetails" className="btn btn-secondary me-2">View Fertilizer Details</Link>
          <Link to="/view-expendituredetails" className="btn btn-secondary me-2">View Expenditure Details</Link>
          <Link to="/view-raindetails" className="btn btn-secondary me-2">View Rain Details</Link>
          <Link to="/view-reportdetails" className="btn btn-secondary me-2">View Report Details</Link>
        </>
      );
    }
  };

  return (
    <Router>
      <div className="App container mt-5" style={{ fontFamily: 'Arial, sans-serif' }}>
        <h1 className="text-center mb-4">Coffee Estate Management</h1>
        <nav className="mb-4 text-center">
          <button onClick={() => setActiveTab('view')} className={`btn ${activeTab === 'view' ? 'btn-primary' : 'btn-secondary'} me-2`}>View</button>
          <button onClick={() => setActiveTab('add')} className={`btn ${activeTab === 'add' ? 'btn-primary' : 'btn-secondary'} me-2`}>Add</button>
          <Link to="/" className="btn btn-info me-2">Home</Link>
        </nav>
        <nav className="mb-4 text-center">
          {getNavLinks()}
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

            <Route path='/add-plantdetails' element={<AddPlantDetails />}/>
            <Route path='/view-plantdetails' element={<ViewPlantDetails />}/>

            <Route path='/add-cropDetail' element={<AddCropDetails />}/>
            <Route path='/view-cropdetails' element={<ViewCropDetails />}/>

            <Route path='/add-fertilizer' element={<AddFertilizers />}/>
            <Route path='/view-fertilizerdetails' element={<ViewFertilizerDetails />}/>

            <Route path='/add-expenditure' element={<AddExpenditure />}/>
            <Route path='/view-expendituredetails' element={<ViewExpenditureDetails />}/>

            <Route path='/add-raindetails' element={<AddRainDetails />}/>
            <Route path='/view-raindetails' element={<ViewRainDetails />}/>

            <Route path='/add-reports' element={<AddReport />}/>
            <Route path='/view-reportdetails' element={<ViewReportDetails />}/>

            {/* Redirect all unknown routes to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
