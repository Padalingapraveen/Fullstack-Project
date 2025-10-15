import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <nav className="navbar">
          <div className="nav-brand">
            <h2>🎓 EduFeedback</h2>
          </div>
          <div className="nav-links">
            <button onClick={() => navigate('/auth')} className="btn-primary">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Transform Your Educational Experience</h1>
            <p className="hero-subtitle">
              A comprehensive feedback system that empowers students, faculty, and administrators 
              to create better learning environments through meaningful insights and data-driven decisions.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate('/auth')} className="btn-hero-primary">
                Start Giving Feedback
              </button>
              <button className="btn-hero-secondary">
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">
              <div className="dashboard-mockup">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="mockup-content">
                  <div className="chart-bar"></div>
                  <div className="chart-bar"></div>
                  <div className="chart-bar"></div>
                  <div className="feedback-cards">
                    <div className="feedback-card"></div>
                    <div className="feedback-card"></div>
                  </div>
                </div>
              </div>
              <div className="floating-elements">
                <div className="element element-1">📊</div>
                <div className="element element-2">🔒</div>
                <div className="element element-3">📱</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Powerful Features for Everyone</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👨‍🎓</div>
              <h3>For Students</h3>
              <p>Submit anonymous feedback on courses, faculty, and facilities. Your voice matters in shaping education quality.</p>
              <ul>
                <li>Anonymous feedback options</li>
                <li>Course and faculty ratings</li>
                <li>Facility feedback</li>
                <li>Easy submission process</li>
              </ul>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👩‍🏫</div>
              <h3>For Faculty</h3>
              <p>Access detailed analytics and insights to improve teaching methods and course content based on student feedback.</p>
              <ul>
                <li>Performance analytics</li>
                <li>Student feedback insights</li>
                <li>Course improvement suggestions</li>
                <li>Trend analysis</li>
              </ul>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👨‍💼</div>
              <h3>For Administrators</h3>
              <p>Comprehensive dashboard to manage users, campaigns, and generate institutional reports for strategic decisions.</p>
              <ul>
                <li>User management</li>
                <li>Campaign creation</li>
                <li>Institutional reports</li>
                <li>System analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>Why Choose EduFeedback?</h2>
              <div className="benefit-item">
                <div className="benefit-icon">🔐</div>
                <div>
                  <h4>Secure & Private</h4>
                  <p>Advanced security measures ensure all feedback remains confidential and anonymous when needed.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">📈</div>
                <div>
                  <h4>Data-Driven Insights</h4>
                  <p>Powerful analytics and reporting tools help institutions make informed decisions for improvement.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">⚡</div>
                <div>
                  <h4>Real-Time Processing</h4>
                  <p>Instant feedback processing and notifications keep everyone informed and engaged.</p>
                </div>
              </div>
            </div>
            <div className="benefits-stats">
              <div className="stat-card">
                <h3>10,000+</h3>
                <p>Students Engaged</p>
              </div>
              <div className="stat-card">
                <h3>500+</h3>
                <p>Faculty Members</p>
              </div>
              <div className="stat-card">
                <h3>95%</h3>
                <p>Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Institution?</h2>
            <p>Join thousands of educational institutions already using EduFeedback to improve their academic environment.</p>
            <button onClick={() => navigate('/auth')} className="btn-cta">
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>🎓 EduFeedback</h3>
              <p>Empowering education through meaningful feedback</p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Product</h4>
                <ul>
                  <li>Features</li>
                  <li>Analytics</li>
                  <li>Security</li>
                  <li>Integrations</li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Support</h4>
                <ul>
                  <li>Help Center</li>
                  <li>Documentation</li>
                  <li>Contact Us</li>
                  <li>Status</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 EduFeedback. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;