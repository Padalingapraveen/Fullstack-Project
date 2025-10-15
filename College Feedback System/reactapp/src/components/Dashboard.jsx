import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import DashboardStats from './DashboardStats';
import Charts from './Charts';
import FeedbackTable from './FeedbackTable';
import SimpleFeedbackForm from './SimpleFeedbackForm';
import FeedbackList from './FeedbackList';
import CampaignManager from './CampaignManager';
import AdvancedAnalytics from './AdvancedAnalytics';
import UserManagement from './UserManagement';
import FeedbackManagement from './FeedbackManagement';
import ColorShowcase from './ColorShowcase';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('feedbacks');

  const renderContent = () => {
    if (user?.role === 'STUDENT') {
      return (
        <div className="student-dashboard">
          <SimpleFeedbackForm />
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-overview">
            <DashboardStats />
            <Charts />
            <FeedbackTable />
          </div>
        );
      case 'feedbacks':
        return user?.role === 'ADMIN' ? <FeedbackManagement /> : (
          <div className="feedbacks-section">
            <h2>{user?.role === 'FACULTY' ? 'My Course Feedback' : 'All Feedback'}</h2>
            <FeedbackList facultyView={user?.role === 'FACULTY'} />
          </div>
        );
      case 'campaigns':
        return <CampaignManager />;
      case 'analytics':
        return (
          <div className="analytics-section">
            <AdvancedAnalytics />
          </div>
        );
      case 'users':
        return user?.role === 'ADMIN' ? <UserManagement /> : (
          <div className="access-denied">
            <h2>❌ Access Denied</h2>
            <p>Admin access required</p>
          </div>
        );
      case 'settings':
        return (
          <div className="settings-section">
            <h2>Settings</h2>
            <p>System settings coming soon...</p>
          </div>
        );
      case 'colors':
        return <ColorShowcase />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout">
      {(user?.role === 'FACULTY' || user?.role === 'ADMIN') && (
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;