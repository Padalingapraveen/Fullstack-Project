import React, { useState, useEffect } from 'react';
import api from '../api';

const Charts = () => {
  const [chartData, setChartData] = useState({
    ratingTrends: {},
    departmentFeedback: {}
  });

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await api.get('/dashboard/charts');
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const renderRatingTrends = () => {
    const trends = Object.entries(chartData.ratingTrends || {});
    const maxRating = 5;
    
    return (
      <div className="chart-container">
        <h3>📈 Rating Trends (Last 7 Days)</h3>
        <div className="line-chart">
          {trends.map(([date, rating], index) => (
            <div key={date} className="chart-bar">
              <div 
                className="bar-fill"
                style={{ height: `${(rating / maxRating) * 100}%` }}
              ></div>
              <span className="bar-label">{date.slice(-2)}</span>
              <span className="bar-value">{rating.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDepartmentFeedback = () => {
    const departments = Object.entries(chartData.departmentFeedback || {});
    const maxCount = Math.max(...departments.map(([, count]) => count), 1);
    
    return (
      <div className="chart-container">
        <h3>🏢 Department-wise Feedback</h3>
        <div className="bar-chart">
          {departments.slice(0, 5).map(([dept, count]) => (
            <div key={dept} className="chart-item">
              <span className="item-label">{dept}</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                ></div>
              </div>
              <span className="item-value">{count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="charts-section">
      {renderRatingTrends()}
      {renderDepartmentFeedback()}
    </div>
  );
};

export default Charts;