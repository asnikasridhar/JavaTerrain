import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ViewReportDetails = () => {
  const [reportDetails, setReportDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/reportdetails')
      .then(response => {
        setReportDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the report details!', error);
      });
  }, []);

  const data = {
    labels: reportDetails.map(report => `Acre ${report.acre_id}`),
    datasets: [
      {
        label: 'Total Expenditure',
        data: reportDetails.map(report => report.total_expenditure),
        borderColor: 'rgba(255, 99, 132, 0.2)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Total Revenue',
        data: reportDetails.map(report => report.total_revenue),
        borderColor: 'rgba(54, 162, 235, 0.2)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
      {
        label: 'Profit/Loss',
        data: reportDetails.map(report => report.profit_loss),
        borderColor: 'rgba(75, 192, 192, 0.2)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      }
    ]
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Acre ID'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount'
        }
      }
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Report Details</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Report ID</th>
            <th scope="col">Acre ID</th>
            <th scope="col">Total Expenditure</th>
            <th scope="col">Total Revenue</th>
            <th scope="col">Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {reportDetails.map((reportDetail, index) => (
            <tr key={index}>
              <td>{reportDetail.report_id}</td>
              <td>{reportDetail.acre_id}</td>
              <td>{reportDetail.total_expenditure}</td>
              <td>{reportDetail.total_revenue}</td>
              <td>{reportDetail.profit_loss}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default ViewReportDetails;
