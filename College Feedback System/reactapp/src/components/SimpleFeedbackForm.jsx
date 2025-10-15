import React, { useState } from 'react';
import { submitFeedback } from '../api';

const SimpleFeedbackForm = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    instructorName: '',
    type: 'COURSE',
    studentId: '',
    comments: '',
    rating: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const feedbackData = {
        ...formData,
        anonymous: !formData.studentId || formData.studentId.trim() === ''
      };
      await submitFeedback(feedbackData);
      alert('Feedback submitted successfully!');
      setFormData({ courseName: '', instructorName: '', type: 'COURSE', studentId: '', comments: '', rating: 0 });
    } catch (error) {
      alert('Error submitting feedback');
    }
  };

  return (
    <div className="feedback-form">
      <h2>📝 Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={(e) => setFormData({...formData, courseName: e.target.value})}
          required
        />
        
        <input
          type="text"
          placeholder="Faculty Name"
          value={formData.instructorName}
          onChange={(e) => setFormData({...formData, instructorName: e.target.value})}
          required
        />
        
        <select
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
          required
        >
          <option value="COURSE">Course Feedback</option>
          <option value="FACULTY">Faculty Feedback</option>
          <option value="GENERAL">General Feedback</option>
        </select>
        
        <input
          type="text"
          placeholder="Student ID (optional - leave blank for anonymous)"
          value={formData.studentId}
          onChange={(e) => setFormData({...formData, studentId: e.target.value})}
        />
        
        <div className="rating-section">
          <label>Rating:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  star <= formData.rating ? 'active' : ''
                }`}
                onClick={() => setFormData({...formData, rating: star})}
              >
                {star <= formData.rating ? '⭐' : '☆'}
              </span>
            ))}
          </div>
        </div>
        
        <textarea
          placeholder="Your comments..."
          value={formData.comments}
          onChange={(e) => setFormData({...formData, comments: e.target.value})}
          rows="4"
          required
        />
        
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default SimpleFeedbackForm;