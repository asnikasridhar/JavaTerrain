import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Dropdown, ButtonGroup, Container, Navbar, Nav } from 'react-bootstrap';
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
import EditAcre from './EditAcre';
import EditUser from './EditUser';
import EditLabor from './EditLabor';
import EditPlant from './EditPlant';
import EditCropDetail from './EditCropDetail';
import EditFertilizer from './EditFertilizer';
import EditExpenditure from './EditExpenditure';
import EditRain from './EditRain';
import AddProperty from './AddProperty';
import ViewPropertyDetails from './ViewPropertyDetails';
import EditProperty from './EditProperty';
import AddBlock from './AddBlock';
import EditBlock from './EditBlock';
import ViewBlock from './ViewBlock';
import Login  from './Login';

function App() {
  const [activeTab, setActiveTab] = useState('view'); // default to 'view'

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="/">Coffee Estate Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/" className="nav-link">Home</Link>

                <Dropdown as={ButtonGroup} className="me-2">
                  <Dropdown.Toggle variant="info">
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
                    <Dropdown.Item as={Link} to="/add-property">Add Property</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/add-block">Add Block</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown as={ButtonGroup} className="me-2">
                  <Dropdown.Toggle variant="info">
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
                    <Dropdown.Item as={Link} to="/view-property">View Property Details</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/view-block">View Block Details</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-acre" element={<AddAcre />} />
            <Route path="/view-acredetails" element={<ViewAcreDetails />} />
            <Route path="/edit-acre/:id" element={<EditAcre />} />

            <Route path="/add-labor" element={<AddLabor />} />
            <Route path="/view-labordetails" element={<ViewLaborDetails />} />
            <Route path="/edit-labor/:id" element={<EditLabor />} />

            <Route path="/add-user" element={<AddUser />} />
            <Route path="/view-userdetails" element={<ViewUserDetails />} />
            <Route path="/edit-user/:id" element={<EditUser />} />

            <Route path="/add-plantdetails" element={<AddPlantDetails />} />
            <Route path="/view-plantdetails" element={<ViewPlantDetails />} />
            <Route path="/edit-plant/:id" element={<EditPlant />} />

            <Route path="/add-cropDetail" element={<AddCropDetails />} />
            <Route path="/view-cropdetails" element={<ViewCropDetails />} />
            <Route path="/edit-cropdetail/:id" element={<EditCropDetail />} />

            <Route path="/add-fertilizer" element={<AddFertilizers />} />
            <Route path="/view-fertilizerdetails" element={<ViewFertilizerDetails />} />
            <Route path="/edit-fertilizerdetail/:fertilizer_id" element={<EditFertilizer />} />

            <Route path="/add-expenditure" element={<AddExpenditure />} />
            <Route path="/view-expendituredetails" element={<ViewExpenditureDetails />} />
            <Route path="/edit-expenditure/:id" element={<EditExpenditure />} />

            <Route path="/add-raindetails" element={<AddRainDetails />} />
            <Route path="/view-raindetails" element={<ViewRainDetails />} />
            <Route path="/edit-rain/:id" element={<EditRain />} />

            <Route path="/add-reports" element={<AddReport />} />
            <Route path="/view-reportdetails" element={<ViewReportDetails />} />

            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/view-property" element={<ViewPropertyDetails />} />
            <Route path="/edit-property/:id" element={<EditProperty />} />

            <Route path="/add-block" element={<AddBlock />} />
            <Route path="/view-block" element={<ViewBlock />} />
            <Route path="/edit-block/:id" element={<EditBlock />} />

            {/* Redirect all unknown routes to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>

        {/* Footer */}
        <footer className="bg-dark text-white text-center mt-auto py-3">
          <Container>
            <p>&copy; 2024 Coffee Estate Management. All rights reserved.</p>
            <p>Designed by CoffeeEstateTech</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
