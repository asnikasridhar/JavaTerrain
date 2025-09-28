import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const  ViewPropertyDetails=()=> {
  const [properties, setProperties] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const userId = userDetails?.user_id;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Im called" + userId)
    if (userId) {
      axios
        .get(`http://localhost:3000/properties/${userId}`)
        .then((response) => {
          setProperties(response.data);
        })
        .catch((error) => {
          console.error('Error fetching properties:', error);
        });
    }
  }, [userId]);

  const handleEdit = (propertyId) => {
    // Handle edit logic here
    console.log(`Edit property with ID: ${propertyId}`);
    navigate(`/edit-property/${propertyId}`);
  };

  const handleDelete = (propertyId) => {
    axios
      .delete(`http://localhost:3000/delete-property/${propertyId}`)
      .then((response) => {
        console.log('Property deleted successfully');
        setProperties(properties.filter((property) => property.property_id !== propertyId));
      })
      .catch((error) => {
        console.error('Error deleting property:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center">Property Details</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Total Acre</th>
            <th>Address 1</th>
            <th>Address 2</th>
            <th>Pincode</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.property_id}>
              <td>{property.property_name}</td>
              <td>{property.total_acre}</td>
              <td>{property.address_1}</td>
              <td>{property.address_2}</td>
              <td>{property.pincode}</td>
              <td>{new Date(property.created_on).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(property.property_id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(property.property_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewPropertyDetails;
 