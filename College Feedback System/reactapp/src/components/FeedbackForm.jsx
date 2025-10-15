import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNotification } from '../context/NotificationContext';

// Configure axios base URL
axios.defaults.baseURL = 'https://8080-cbadedaafefecbccbaeaeadcdfcbbccffbb.premiumproject.examly.io';

const FeedbackForm = ({ onFeedbackAdded }) => {
  const [formData, setFormData] = useState({
    courseName: "",
    instructorName: "",
    rating: 1,
    comments: "",
    type: "COURSE",
    category: "General",
    anonymous: false
  });
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);
  const { showSuccess, showError } = useNotification();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'rating' ? parseInt(value) : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare request data matching backend DTO
      const requestData = {
        courseName: formData.courseName,
        instructorName: formData.instructorName,
        type: formData.type,
        rating: formData.rating,
        comments: formData.comments,
        anonymous: formData.anonymous,
        category: formData.category || "General",
        studentId: "STU" + Math.floor(Math.random() * 1000) // Generate random student ID
      };
      
      const response = await axios.post('/api/feedback', requestData);
      const newFeedback = { ...response.data, id: Date.now() };
      setSubmittedFeedbacks(prev => [newFeedback, ...prev]);
      if (onFeedbackAdded) {
        onFeedbackAdded(response.data);
      }
      setFormData({
        courseName: "",
        instructorName: "",
        rating: 1,
        comments: "",
        type: "COURSE",
        category: "General",
        anonymous: false
      });
      showSuccess('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      const errorMsg = error.response?.data?.message || 'Error submitting feedback. Please try again.';
      showError(errorMsg);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="feedback-form">
      {showSuccess && (
        <div className="success-animation">
          <div className="success-checkmark">✅</div>
          <p>Feedback submitted successfully!</p>
        </div>
      )}
      <div className="form-header">
        <h2>📝 Submit Feedback</h2>
        <p>Share your thoughts and help us improve</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>📋 Feedback Type</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="COURSE">Course</option>
            <option value="FACULTY">Faculty</option>
            <option value="FACILITY">Facility</option>
          </select>
        </div>
        <div className="form-group">
          <label>📚 Course/Subject Name</label>
          <input
            type="text"
            name="courseName"
            placeholder="Enter course or subject name"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>👩🏫 Instructor/Faculty Name</label>
          <input
            type="text"
            name="instructorName"
            placeholder="Enter instructor or faculty name"
            value={formData.instructorName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>⭐ Rating</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= formData.rating ? 'active' : ''}`}
                onClick={() => setFormData({...formData, rating: star})}
              >
                ★
              </span>
            ))}
            <span className="rating-label">
              {formData.rating === 1 && 'Poor'}
              {formData.rating === 2 && 'Fair'}
              {formData.rating === 3 && 'Good'}
              {formData.rating === 4 && 'Very Good'}
              {formData.rating === 5 && 'Excellent'}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label>📂 Category</label>
          <select name="category" value={formData.category || 'General'} onChange={handleChange}>
            <option value="General">General</option>
            <option value="Teaching Quality">Teaching Quality</option>
            <option value="Course Content">Course Content</option>
            <option value="Facility">Facility</option>
            <option value="Support">Support</option>
          </select>
        </div>
        <div className="form-group">
          <label>💬 Comments</label>
          <textarea
            name="comments"
            placeholder="Share your detailed feedback here..."
            value={formData.comments}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            🕵️ Submit as anonymous feedback
          </label>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
      
      {submittedFeedbacks.length > 0 && (
        <div className="submitted-feedbacks">
          <h3>📈 Recently Submitted Feedback</h3>
          <div className="table-container">
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Instructor</th>
                  <th>Rating</th>
                  <th>Type</th>
                  <th>Comments</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submittedFeedbacks.map((feedback, index) => (
                  <tr key={feedback.id} className={`fade-in-row delay-${index % 3}`}>
                    <td>{feedback.courseName}</td>
                    <td>{feedback.instructorName}</td>
                    <td>
                      <span className="rating-stars">{renderStars(feedback.rating)}</span>
                      <span className="rating-number">({feedback.rating}/5)</span>
                    </td>
                    <td>
                      <span className={`type-badge ${feedback.type.toLowerCase()}`}>
                        {feedback.type}
                      </span>
                    </td>
                    <td className="comments-cell">
                      {feedback.comments.length > 50 
                        ? feedback.comments.substring(0, 50) + '...' 
                        : feedback.comments}
                    </td>
                    <td>
                      <span className="status-badge submitted">
                        ✓ Submitted
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;