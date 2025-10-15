import React, { useState, useEffect } from 'react';
import api from '../api';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalFeedbacks: 0,
    averageRating: 0,
    positiveResponses: 0,
    pendingReviews: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Feedbacks',
      value: stats.totalFeedbacks,
      icon: '📝',
      color: 'dark'
    },
    {
      title: 'Average Rating',
      value: stats.averageRating?.toFixed(1) || '0.0',
      icon: '⭐',
      color: 'green'
    },
    {
      title: 'Positive Responses',
      value: stats.positiveResponses,
      icon: '👍',
      color: 'medium'
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews,
      icon: '⏳',
      color: 'medium'
    }
  ];

  return (
    <div className="dashboard-stats">
      {statCards.map((card, index) => (
        <div key={index} className={`stat-card ${card.color}`}>
          <div className="stat-icon">{card.icon}</div>
          <div className="stat-content">
            <h3 className="stat-value">{card.value}</h3>
            <p className="stat-title">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;