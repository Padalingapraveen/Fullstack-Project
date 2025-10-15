import React, { useState, useEffect, useCallback } from 'react';
import api, { deleteFeedback } from '../api';

const FeedbackTable = ({ userRole = 'STUDENT', facultyName = null }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    rating: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchFeedbacks = useCallback(async () => {
    try {
      let endpoint = '/feedback';
      const params = {
        page: currentPage,
        size: 10,
        sort: filters.sortBy,
        direction: filters.sortOrder
      };
      
      // Add search filters
      if (filters.search) {
        params.courseName = filters.search;
        params.instructorName = filters.search;
      }
      
      if (filters.rating) {
        params.rating = parseInt(filters.rating);
      }
      
      // Choose endpoint based on user role
      if (userRole === 'ADMIN') {
        endpoint = '/feedback/admin';
      } else if (userRole === 'FACULTY') {
        endpoint = '/feedback/faculty-view';
        if (facultyName) {
          params.facultyName = facultyName;
        }
      }
      
      const response = await api.get(endpoint, { params });
      
      // Handle different response formats
      if (response.data.content) {
        // Paginated response from admin endpoint
        setFeedbacks(response.data.content);
        setTotalPages(response.data.totalPages || 0);
      } else if (Array.isArray(response.data)) {
        // Array response from other endpoints
        setFeedbacks(response.data);
        setTotalPages(Math.ceil(response.data.length / 10));
      } else {
        setFeedbacks([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setFeedbacks([]);
      setTotalPages(0);
    }
  }, [currentPage, filters.sortBy, filters.sortOrder, filters.search, filters.rating, userRole, facultyName]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(0);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        console.log('Deleting feedback with ID:', id);
        await deleteFeedback(id);
        console.log('Feedback deleted successfully');
        fetchFeedbacks();
        alert('Feedback deleted successfully');
      } catch (error) {
        console.error('Error deleting feedback:', error);
        const errorMsg = error.response?.data?.message || error.response?.data || error.message || 'Unknown error';
        alert('Failed to delete feedback: ' + errorMsg);
      }
    }
  };

  return (
    <div className="feedback-table-container">
      <div className="table-header">
        <h3>📋 {userRole === 'ADMIN' ? 'All Student Feedback' : userRole === 'FACULTY' ? 'My Feedback' : 'Latest Student Feedback'}</h3>
        
        <div className="table-filters">
          <input
            type="text"
            placeholder="Search by course or instructor..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="filter-input"
          />
          
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="filter-select"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          
          <select
            value={`${filters.sortBy},${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split(',');
              setFilters(prev => ({ ...prev, sortBy, sortOrder }));
            }}
            className="filter-select"
          >
            <option value="createdAt,desc">Newest First</option>
            <option value="createdAt,asc">Oldest First</option>
            <option value="rating,desc">Highest Rating</option>
            <option value="rating,asc">Lowest Rating</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Instructor</th>
              <th>Rating</th>
              <th>Comments</th>
              <th>Date</th>
              <th>Student</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td className="course-cell">{feedback.courseName}</td>
                <td className="instructor-cell">{feedback.instructorName}</td>
                <td className="rating-cell">
                  <span className="stars">{renderStars(feedback.rating)}</span>
                  <span className="rating-number">({feedback.rating})</span>
                </td>
                <td className="comments-cell">
                  <div className="comment-text">
                    {feedback.comments || 'No comments'}
                  </div>
                </td>
                <td className="date-cell">{formatDate(feedback.createdAt)}</td>
                <td className="student-cell">
                  🔒 Anonymous
                </td>
                <td className="actions-cell">
                  {userRole === 'ADMIN' && (
                    <button 
                      onClick={() => handleDelete(feedback.id)}
                      className="btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  )}
                  {userRole === 'FACULTY' && (
                    <span className="view-only">View Only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="page-btn"
          >
            ← Previous
          </button>
          
          <span className="page-info">
            Page {currentPage + 1} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage >= totalPages - 1}
            className="page-btn"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;