import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewExpenditureDetails = () => {
  const [expenditureDetails, setExpenditureDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/expendituredetails')
      .then(response => {
        setExpenditureDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the expenditure details!', error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-expenditure/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expenditure detail?')) {
      axios.delete(`http://localhost:3000/delete-expenditure/${id}`)
        .then(() => {
          setExpenditureDetails(expenditureDetails.filter(expenditure => expenditure.expenditure_id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the expenditure detail!', error);
        });
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Expenditure Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Expenditure ID</th>
            <th scope="col">Acre ID</th>
            <th scope="col">Water</th>
            <th scope="col">Fertilizer</th>
            <th scope="col">Pruning</th>
            <th scope="col">Others</th>
            <th scope="col">Spent On</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenditureDetails.map((expenditureDetail, index) => (
            <tr key={index}>
              <td>{expenditureDetail.expenditure_id}</td>
              <td>{expenditureDetail.acre_id}</td>
              <td>{expenditureDetail.water}</td>
              <td>{expenditureDetail.fertilizer}</td>
              <td>{expenditureDetail.pruning}</td>
              <td>{expenditureDetail.others}</td>
              <td>{expenditureDetail.edate}</td>
              <td>
                <button 
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(expenditureDetail.expenditure_id)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(expenditureDetail.expenditure_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewExpenditureDetails;
