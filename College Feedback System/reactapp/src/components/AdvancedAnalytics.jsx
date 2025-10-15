import React, { useState, useEffect } from 'react';
import { getDashboardAnalytics } from '../api';
import axios from 'axios';

// Configure axios base URL
axios.defaults.baseURL = 'https://8080-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io';

const AdvancedAnalytics = () => {
  const [analytics, setAnalytics] = useState({});
  const [reportData, setReportData] = useState(null);
  const [showReport, setShowReport] = useState(false);



  useEffect(() => {
    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await getDashboardAnalytics();
      console.log('Analytics data:', response.data);
      setAnalytics(response.data || {});
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setAnalytics({});
    }
  };



  const generateReport = async () => {
    try {
      // Fetch real feedback data
      const response = await axios.get('/api/feedback');
      const feedbacks = Array.isArray(response.data) ? response.data : [];
      
      if (feedbacks.length === 0) {
        alert('No feedback data available to generate report');
        return;
      }
      
      // Process course ratings
      const courseStats = {};
      feedbacks.forEach(feedback => {
        const course = feedback.courseName;
        if (!courseStats[course]) {
          courseStats[course] = { totalRating: 0, count: 0 };
        }
        courseStats[course].totalRating += feedback.rating;
        courseStats[course].count += 1;
      });
      
      const courseRatings = Object.entries(courseStats).map(([course, stats]) => ({
        course,
        rating: parseFloat((stats.totalRating / stats.count).toFixed(1)),
        count: stats.count
      }));
      
      // Process rating distribution
      const ratingCounts = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
      feedbacks.forEach(feedback => {
        ratingCounts[feedback.rating.toString()]++;
      });
      
      const reportData = {
        courseRatings,
        ratingDistribution: ratingCounts
      };
      
      setReportData(reportData);
      setShowReport(true);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report. Please try again.');
    }
  };

  return (
    <div className="advanced-analytics">
      <h2>📊 Advanced Analytics</h2>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>📈 Key Metrics</h3>
          <div className="metrics-grid">
            <div className="metric">
              <span className="metric-value">{analytics.totalFeedbacks || 0}</span>
              <span className="metric-label">Total Feedbacks</span>
            </div>
            <div className="metric">
              <span className="metric-value">{(analytics.averageRating || 0).toFixed(1)}</span>
              <span className="metric-label">Average Rating</span>
            </div>
            <div className="metric">
              <span className="metric-value">{(analytics.participationRate || 0).toFixed(1)}%</span>
              <span className="metric-label">Participation Rate</span>
            </div>
          </div>
        </div>



        <div className="analytics-card">
          <h3>📋 Report Generator</h3>
          <div className="report-generator">
            <button onClick={generateReport} className="btn-primary">
              Generate Report
            </button>
          </div>
        </div>
      </div>
      
      {showReport && reportData && (
        <div className="report-section">
          <h3>📈 Generated Report</h3>
          
          <div className="analytics-grid">
            <div className="analytics-card">
              <h4>Course Ratings Overview</h4>
              <div className="course-ratings-chart">
                {reportData.courseRatings.map((course, index) => (
                  <div key={index} className="course-rating-bar">
                    <span className="course-name">{course.course}</span>
                    <div className="rating-bar">
                      <div 
                        className="rating-fill"
                        style={{ width: `${(course.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="rating-value">{course.rating} ({course.count})</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="analytics-card">
              <h4>Rating Distribution</h4>
              <div className="rating-distribution-chart">
                {Object.entries(reportData.ratingDistribution).reverse().map(([rating, count]) => (
                  <div key={rating} className="distribution-bar">
                    <span className="star-label">{rating} ★</span>
                    <div className="distribution-progress">
                      <div 
                        className="distribution-fill"
                        style={{ width: `${(count / 100) * 100}%` }}
                      ></div>
                    </div>
                    <span className="count-label">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalytics;