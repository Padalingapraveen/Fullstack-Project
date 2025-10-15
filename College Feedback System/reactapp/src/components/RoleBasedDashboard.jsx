import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardStats from './DashboardStats';
import Charts from './Charts';
import FeedbackTable from './FeedbackTable';
import CampaignManager from './CampaignManager';
import AdvancedAnalytics from './AdvancedAnalytics';

const RoleBasedDashboard = ({ activeTab }) => {
  const { user } = useAuth();

  const renderByRole = () => {
    switch (user?.role) {
      case 'ADMIN':
        return renderAdminDashboard();
      case 'FACULTY':
        return renderFacultyDashboard();
      case 'DEPARTMENT_HEAD':
        return renderDepartmentHeadDashboard();
      case 'COORDINATOR':
        return renderCoordinatorDashboard();
      case 'GUEST':
        return renderGuestDashboard();
      default:
        return renderStudentDashboard();
    }
  };

  const renderAdminDashboard = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <DashboardStats />
            <Charts />
            <FeedbackTable userRole={user?.role} />
          </>
        );
      case 'campaigns':
        return <CampaignManager />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'users':
        return <div className="coming-soon">👥 User Management - Coming Soon</div>;
      default:
        return <DashboardStats />;
    }
  };

  const renderFacultyDashboard = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <DashboardStats />
            <Charts />
          </>
        );
      case 'feedback':
        return <FeedbackTable userRole={user?.role} facultyName={user?.username} />;
      case 'performance':
        return <div className="performance-view">📊 My Performance Analytics</div>;
      default:
        return <DashboardStats />;
    }
  };

  const renderDepartmentHeadDashboard = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <DashboardStats />
            <AdvancedAnalytics />
          </>
        );
      case 'faculty':
        return <div className="faculty-management">👨‍🏫 Faculty Performance Management</div>;
      case 'reports':
        return <AdvancedAnalytics />;
      default:
        return <DashboardStats />;
    }
  };

  const renderCoordinatorDashboard = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      case 'campaigns':
        return <CampaignManager />;
      case 'courses':
        return <div className="course-management">📚 Course Management</div>;
      default:
        return <DashboardStats />;
    }
  };

  const renderGuestDashboard = () => {
    return (
      <div className="guest-dashboard">
        <h2>👋 Welcome, Guest</h2>
        <p>You have limited access to public summaries and reports.</p>
        <div className="public-stats">
          <DashboardStats />
        </div>
      </div>
    );
  };

  const renderStudentDashboard = () => {
    return (
      <div className="student-dashboard">
        <h2>🎓 Student Portal</h2>
        <div className="student-actions">
          <button className="action-card">
            <span className="action-icon">📝</span>
            <span className="action-title">Submit Feedback</span>
          </button>
          <button className="action-card">
            <span className="action-icon">📋</span>
            <span className="action-title">View History</span>
          </button>
          <button className="action-card">
            <span className="action-icon">📊</span>
            <span className="action-title">My Analytics</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="role-based-dashboard">
      {renderByRole()}
    </div>
  );
};

export default RoleBasedDashboard;