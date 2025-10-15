import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import FeedbackTable from './FeedbackTable';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [usersRes, feedbacksRes, statsRes] = await Promise.all([
        api.get('/users'),
        api.get('/feedback'),
        api.get('/dashboard/stats')
      ]);
      setUsers(usersRes.data || []);
      setFeedbacks(feedbacksRes.data?.content || feedbacksRes.data || []);
      setStats(statsRes.data || {});
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchData();
    } catch (error) {
      alert('Error deleting user');
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await api.delete(`/feedback/${id}`);
      fetchData();
    } catch (error) {
      alert('Error deleting feedback');
    }
  };

  const renderOverview = () => (
    <div className="admin-overview">
      <h2>📊 Admin Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>👥 Total Users</h3>
          <p className="stat-number">{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>💬 Total Feedbacks</h3>
          <p className="stat-number">{feedbacks.length}</p>
        </div>
        <div className="stat-card">
          <h3>⭐ Average Rating</h3>
          <p className="stat-number">{stats.averageRating?.toFixed(1) || '0.0'}</p>
        </div>
        <div className="stat-card">
          <h3>👍 Positive Responses</h3>
          <p className="stat-number">{stats.positiveResponses || 0}</p>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="admin-users">
      <h2>👥 User Management</h2>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                <td>
                  <button 
                    onClick={() => deleteUser(user.id)}
                    className="btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFeedbacks = () => (
    <div className="admin-feedbacks">
      <h2>💬 Feedback Management</h2>
      <FeedbackTable userRole="ADMIN" />
    </div>
  );

  const renderAnalytics = () => (
    <div className="admin-analytics">
      <h2>📈 Analytics</h2>
      <div className="analytics-grid">
        <div className="chart-card">
          <h3>User Distribution by Role</h3>
          <div className="role-distribution">
            {['STUDENT', 'FACULTY', 'ADMIN'].map(role => {
              const count = users.filter(u => u.role === role).length;
              return (
                <div key={role} className="role-item">
                  <span className="role-name">{role}</span>
                  <div className="role-bar">
                    <div 
                      className="role-fill"
                      style={{ width: `${(count / users.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="role-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="chart-card">
          <h3>Feedback Trends</h3>
          <div className="trend-chart">
            {[1, 2, 3, 4, 5].map(rating => {
              const count = feedbacks.filter(f => f.rating === rating).length;
              return (
                <div key={rating} className="trend-item">
                  <span>{rating}⭐</span>
                  <div className="trend-bar">
                    <div 
                      className="trend-fill"
                      style={{ height: `${(count / feedbacks.length) * 100}%` }}
                    ></div>
                  </div>
                  <span>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="admin-settings">
      <h2>⚙️ System Settings</h2>
      <div className="settings-grid">
        <div className="setting-card">
          <h3>Database Actions</h3>
          <button className="btn-warning" onClick={fetchData}>
            🔄 Refresh Data
          </button>
        </div>
        <div className="setting-card">
          <h3>Export Data</h3>
          <button className="btn-primary">
            📊 Export Reports
          </button>
        </div>
        <div className="setting-card">
          <h3>System Info</h3>
          <p>Total Users: {users.length}</p>
          <p>Total Feedbacks: {feedbacks.length}</p>
        </div>
      </div>
    </div>
  );

  if (user?.role !== 'ADMIN') {
    return <div className="access-denied">❌ Access Denied - Admin Only</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>🛠️ Admin Panel</h2>
        <nav className="admin-nav">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'users', label: 'Users', icon: '👥' },
            { id: 'feedbacks', label: 'Feedbacks', icon: '💬' },
            { id: 'analytics', label: 'Analytics', icon: '📈' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map(item => (
            <button
              key={item.id}
              className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="admin-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'feedbacks' && renderFeedbacks()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default AdminDashboard;