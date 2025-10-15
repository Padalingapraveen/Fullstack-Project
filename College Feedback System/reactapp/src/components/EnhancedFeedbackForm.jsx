import React, { useState, useEffect } from 'react';
import { getCourses, submitFeedback } from '../api';

const EnhancedFeedbackForm = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
    instructorName: '',
    rating: 0,
    comments: '',
    category: 'COURSE',
    anonymous: false,
    type: 'COURSE'
  });
  const [isDraft, setIsDraft] = useState(false);

  useEffect(() => {
    fetchCourses();
    loadDraft();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('feedbackDraft');
    if (draft) {
      setFormData(JSON.parse(draft));
      setIsDraft(true);
    }
  };

  const saveDraft = () => {
    localStorage.setItem('feedbackDraft', JSON.stringify(formData));
    setIsDraft(true);
  };

  const clearDraft = () => {
    localStorage.removeItem('feedbackDraft');
    setIsDraft(false);
  };

  const handleCourseChange = (courseId) => {
    const course = courses.find(c => c.id === parseInt(courseId));
    setFormData({
      ...formData,
      courseId,
      courseName: course?.courseName || '',
      instructorName: course?.faculty?.username || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback(formData);
      clearDraft();
      setFormData({
        courseId: '',
        courseName: '',
        instructorName: '',
        rating: 0,
        comments: '',
        category: 'COURSE',
        anonymous: false,
        type: 'COURSE'
      });
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback');
    }
  };

  return (
    <div className="enhanced-feedback-form">
      <div className="form-header">
        <h2>📝 Submit Feedback</h2>
        {isDraft && (
          <div className="draft-indicator">
            <span>💾 Draft saved</span>
            <button onClick={clearDraft} className="clear-draft">Clear</button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-section">
          <h3>Feedback Type</h3>
          <div className="radio-group">
            {['COURSE', 'FACULTY', 'FACILITY', 'SERVICE'].map(type => (
              <label key={type} className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={formData.type === type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {formData.type === 'COURSE' && (
          <div className="form-section">
            <label>Select Course</label>
            <select
              value={formData.courseId}
              onChange={(e) => handleCourseChange(e.target.value)}
              required
            >
              <option value="">Choose a course...</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-section">
          <label>Rating</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={`star ${formData.rating >= star ? 'active' : ''}`}
                onClick={() => setFormData({...formData, rating: star})}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="TEACHING">Teaching Quality</option>
            <option value="CONTENT">Course Content</option>
            <option value="ASSESSMENT">Assessment</option>
            <option value="SUPPORT">Support</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="form-section">
          <label>Comments</label>
          <textarea
            value={formData.comments}
            onChange={(e) => setFormData({...formData, comments: e.target.value})}
            placeholder="Share your detailed feedback..."
            rows="4"
          />
        </div>

        <div className="form-section">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.anonymous}
              onChange={(e) => setFormData({...formData, anonymous: e.target.checked})}
            />
            Submit anonymously
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={saveDraft} className="btn-secondary">
            Save Draft
          </button>
          <button type="submit" className="btn-primary">
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedFeedbackForm;