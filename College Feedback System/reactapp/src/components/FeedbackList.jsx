import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';

// Configure axios base URL
axios.defaults.baseURL = 'https://8080-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io';

const FeedbackList = ({ userFeedback = false, facultyView = false }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 5;
  const [sort, setSort] = useState('createdAt');
  const [direction, setDirection] = useState('desc');
  const [courseFilter, setCourseFilter] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '★' : '☆');
    }
    return stars.join('');
  };

  const fetchFeedbacks = useCallback(async () => {
    try {
      let url = '/api/feedback';
      if (userFeedback) {
        url = '/api/feedback/my';
      } else if (facultyView) {
        url = '/api/feedback';
      }
      
      const response = await axios.get(url);
      let feedbackData = Array.isArray(response.data) ? response.data : [];
      
      setFeedbacks(feedbackData);
      setFilteredFeedbacks(feedbackData);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setFeedbacks([]);
      setFilteredFeedbacks([]);
    } finally {
      setLoading(false);
    }
  }, [userFeedback, facultyView]);

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

  if (loading) return <div>Loading...</div>;

  // Pagination logic
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);
  const totalPages = Math.ceil(filteredFeedbacks.length / feedbacksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="feedback-list">
      {facultyView && (
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
      )}
      <div className="feedback-table-container">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Instructor</th>
              <th>Type</th>
              <th>Rating</th>
              <th>Comments</th>
              <th>Student ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentFeedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.courseName}</td>
                <td>{feedback.instructorName}</td>
                <td>{feedback.type}</td>
                <td>
                  <div className="rating-display">
                    <span className="stars">{renderStars(feedback.rating)}</span>
                    <span className="rating-number">({feedback.rating}/5)</span>
                  </div>
                </td>
                <td className="comments-cell">
                  {feedback.comments || 'No comments'}
                </td>
                <td>
                  {feedback.studentId || 'Not provided'}
                </td>
                <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredFeedbacks.length === 0 && (
        <div className="no-feedback">
          <p>No feedback available.</p>
        </div>
      )}
      
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

export default FeedbackList;