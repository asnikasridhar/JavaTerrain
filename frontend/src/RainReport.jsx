import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RainReport = () => {
  const HEAVY_RAIN_THRESHOLD = 50; // mm, configurable
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', propertyId: '' });
  const [activeTab, setActiveTab] = useState('daily'); // daily | weekly | monthly | block

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/rain-report', { params: filters });
      setReport(response.data.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
    setLoading(false);
  };

  const downloadReport = (format) => {
    const query = new URLSearchParams({ ...filters, format }).toString();
    window.open(`/api/rain-report?${query}`, '_blank');
  };

  const getChartData = (dataArray, labelKey, valueKey) => ({
    labels: dataArray.map(item => item[labelKey]),
    datasets: [
      {
        label: 'Rainfall (mm)',
        data: dataArray.map(item => item[valueKey]),
        borderColor: 'rgba(33, 150, 243, 1)',
        backgroundColor: dataArray.map(item =>
          parseFloat(item[valueKey]) > HEAVY_RAIN_THRESHOLD
            ? 'rgba(244, 67, 54, 0.5)'
            : 'rgba(33, 150, 243, 0.2)'
        ),
        fill: true,
        tension: 0.3
      }
    ]
  });

  const renderTable = (dataArray, columns, valueKey) => (
    <table style={styles.table}>
      <thead>
        <tr>
          {columns.map(col => <th key={col.key} style={styles.th}>{col.header}</th>)}
        </tr>
      </thead>
      <tbody>
        {dataArray.map((row, idx) => (
          <tr key={idx}>
            {columns.map(col => {
              const cellValue = row[col.key];
              const isHeavy = col.key === valueKey && parseFloat(cellValue) > HEAVY_RAIN_THRESHOLD;
              return <td key={col.key} style={{ ...styles.td, backgroundColor: isHeavy ? '#FFCDD2' : 'transparent' }}>{cellValue}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderTabContent = () => {
    if (!report) return null;

    switch (activeTab) {
      case 'daily':
        return <>
          <Line data={getChartData(report.dailyRainfall, 'date', 'total_rain')} />
          {renderTable(report.dailyRainfall, [
            { header: 'Date', key: 'date' },
            { header: 'Total Rain', key: 'total_rain' }
          ], 'total_rain')}
        </>;
      case 'weekly':
        return <>
          <Line data={getChartData(report.weeklyRainfall, 'week', 'total_rain')} />
          {renderTable(report.weeklyRainfall, [
            { header: 'Year', key: 'year' },
            { header: 'Week', key: 'week' },
            { header: 'Total Rain', key: 'total_rain' }
          ], 'total_rain')}
        </>;
      case 'monthly':
        return <>
          <Line data={getChartData(report.monthlyRainfall, 'month', 'total_rain')} />
          {renderTable(report.monthlyRainfall, [
            { header: 'Year', key: 'year' },
            { header: 'Month', key: 'month' },
            { header: 'Total Rain', key: 'total_rain' }
          ], 'total_rain')}
        </>;
      case 'block':
        return <>
          <Line data={getChartData(report.rainfallByBlock, 'block_name', 'total_rainfall')} />
          {renderTable(report.rainfallByBlock, [
            { header: 'Block Name', key: 'block_name' },
            { header: 'Total Rainfall', key: 'total_rainfall' }
          ], 'total_rainfall')}
        </>;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Rainfall Report Dashboard</h2>

      {/* Filters */}
      <div style={styles.filterContainer}>
        <input
          type="date"
          value={filters.startDate}
          onChange={e => setFilters({ ...filters, startDate: e.target.value })}
          style={styles.input}
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={e => setFilters({ ...filters, endDate: e.target.value })}
          style={{ ...styles.input, marginLeft: 10 }}
        />
        <input
          type="number"
          placeholder="Property ID"
          value={filters.propertyId}
          onChange={e => setFilters({ ...filters, propertyId: e.target.value })}
          style={{ ...styles.input, marginLeft: 10 }}
        />
        <button onClick={fetchReport} style={styles.fetchButton}>Fetch Report</button>
      </div>

      {/* Download Buttons */}
      <div style={styles.downloadContainer}>
        <button onClick={() => downloadReport('json')} style={styles.downloadButton}>JSON</button>
        <button onClick={() => downloadReport('csv')} style={{ ...styles.downloadButton, marginLeft: 10 }}>CSV</button>
        <button onClick={() => downloadReport('excel')} style={{ ...styles.downloadButton, marginLeft: 10 }}>Excel</button>
      </div>

      {loading && <p>Loading report...</p>}

      {report && (
        <>
          <h3 style={{ marginTop: 20 }}>Total Rainfall: {report.totalRainfall} mm</h3>

          {/* Tabs */}
          <div style={styles.tabsContainer}>
            {['daily', 'weekly', 'monthly', 'block'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={activeTab === tab ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={styles.tabContent}>
            {renderTabContent()}
          </div>
        </>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: { padding: 20, maxWidth: 1200, margin: '0 auto' },
  title: { textAlign: 'center', marginBottom: 20 },
  filterContainer: { display: 'flex', flexWrap: 'wrap', marginBottom: 20 },
  input: { padding: 8, fontSize: 14 },
  fetchButton: { marginLeft: 10, padding: '8px 16px', backgroundColor: '#2196F3', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 4 },
  downloadContainer: { marginBottom: 20 },
  downloadButton: { padding: '6px 12px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 4 },
  tabsContainer: { display: 'flex', marginBottom: 10, flexWrap: 'wrap' },
  tabButton: { flex: 1, padding: '10px 20px', cursor: 'pointer', border: '1px solid #ccc', borderBottom: 'none', backgroundColor: '#f1f1f1', fontWeight: 'bold', marginRight: 2, borderRadius: 4 },
  activeTab: { backgroundColor: '#2196F3', color: '#fff' },
  tabContent: { border: '1px solid #ccc', padding: 20, borderRadius: 4, backgroundColor: '#fff' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: 10 },
  th: { backgroundColor: '#2196F3', color: '#fff', padding: 8, textAlign: 'left' },
  td: { padding: 8, borderBottom: '1px solid #ddd' }
};

export default RainReport;
