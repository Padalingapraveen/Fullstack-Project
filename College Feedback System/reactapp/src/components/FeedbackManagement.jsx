import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 5;
  const [sort, setSort] = useState('createdAt');
  const [direction, setDirection] = useState('desc');
  const [courseFilter, setCourseFilter] = useState('');

  const fetchFeedbacks = useCallback(async () => {
    try {
      const response = await api.get('/feedback');
      const feedbackData = Array.isArray(response.data) ? response.data : [];
      setFeedbacks(feedbackData);
      setFilteredFeedbacks(feedbackData);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setFeedbacks([]);
      setFilteredFeedbacks([]);
    }
  }, []);

  // Filter and sort feedbacks
  useEffect(() => {
    let filtered = [...feedbacks];
    
    // Apply course filter
    if (courseFilter.trim()) {
      filtered = filtered.filter(feedback => 
        feedback.courseName.toLowerCase().includes(courseFilter.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sort];
      let bValue = b[sort];
      
      if (sort === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredFeedbacks(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [feedbacks, courseFilter, sort, direction]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  // Pagination logic
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);
  const totalPages = Math.ceil(filteredFeedbacks.length / feedbacksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteFeedback = async (id) => {
    try {
      await api.delete(`/feedback/${id}`);
      fetchFeedbacks();
    } catch (error) {
      alert('Error deleting feedback');
    }
  };

  return (
    <div className="feedback-management">
      <h2>💬 Feedback Management</h2>
      
      <div className="simple-controls">
        <div className="course-filter">
          <input
            type="text"
            placeholder="🔎 Filter by course name..."
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          />
        </div>
        
        <div className="sort-bar">
          <div className="sort-options">
            <button 
              className={sort === 'createdAt' ? 'active' : ''}
              onClick={() => setSort('createdAt')}
            >
              Date
            </button>
            <button 
              className={sort === 'rating' ? 'active' : ''}
              onClick={() => setSort('rating')}
            >
              Rating
            </button>
            <button 
              className={sort === 'courseName' ? 'active' : ''}
              onClick={() => setSort('courseName')}
            >
              Course
            </button>
          </div>
          <button 
            className="sort-direction"
            onClick={() => setDirection(direction === 'desc' ? 'asc' : 'desc')}
          >
            {direction === 'desc' ? '↓' : '↑'}
          </button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Faculty</th>
              <th>Type</th>
              <th>Rating</th>
              <th>Comments</th>
              <th>Student ID</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFeedbacks.map(feedback => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.courseName}</td>
                <td>{feedback.instructorName}</td>
                <td>{feedback.type}</td>
                <td>
                  <span className="rating-display">
                    {'⭐'.repeat(feedback.rating)}
                    <span className="rating-number">({feedback.rating}/5)</span>
                  </span>
                </td>
                <td className="comments-cell">
                  {feedback.comments?.substring(0, 50)}...
                </td>
                <td>Anonymous</td>
                <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    onClick={() => deleteFeedback(feedback.id)}
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
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Next
          </button>
          
          <div className="page-info">
            Showing {indexOfFirstFeedback + 1}-{Math.min(indexOfLastFeedback, filteredFeedbacks.length)} of {filteredFeedbacks.length} feedback
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;