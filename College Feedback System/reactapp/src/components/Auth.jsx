import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'STUDENT'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.username || !formData.password || (!isLogin && !formData.email)) {
      setError('Please fill in all fields');
      return;
    }
    
    if (isLogin) {
      const result = await login(formData.username, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(typeof result.message === 'string' ? result.message : 'Login failed');
      }
    } else {
      const result = await register(formData);
      if (result.success) {
        setSuccess('Registration successful! You can now sign in with your credentials.');
        setIsLogin(true);
        // Keep username and password for easy login
        setFormData({ 
          username: formData.username, 
          password: formData.password, 
          email: '', 
          role: 'STUDENT' 
        });
      } else {

        setError(typeof result.message === 'string' ? result.message : 'Registration failed');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-illustration">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="auth-graphic">
          <div className="character-container">
            <div className="main-character">
              <div className="character-head">
                <div className="face">
                  <div className="eyes">
                    <div className="eye left-eye">
                      <div className="pupil"></div>
                    </div>
                    <div className="eye right-eye">
                      <div className="pupil"></div>
                    </div>
                  </div>
                  <div className="mouth">
                    <div className={`cartoon-mouth ${isLogin ? 'smile' : 'happy'}`}></div>
                  </div>
                </div>
              </div>
              <div className="character-body">
                <div className="laptop">
                  <div className="laptop-screen">
                    <div className="screen-glow"></div>
                    <div className="code-lines">
                      <div className="code-icon book"></div>
                      <div className="code-icon star"></div>
                      <div className="code-icon cap"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-icons">
              <div className="cartoon-icon icon-1">
                <div className="pen"></div>
              </div>
              <div className="cartoon-icon icon-2">
                <div className="pencil"></div>
              </div>
              <div className="cartoon-icon icon-3">
                <div className="notebook"></div>
              </div>
              <div className="cartoon-icon icon-4">
                <div className="stamp-pad"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-icon">🎓</div>
        <h2>{isLogin ? 'Welcome Back' : 'Join Us'}</h2>
        <p className="auth-subtitle">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </p>
        
        {error && <div className="error">{error}</div>}
        {success && (
          <div className="success">
            {success}
            {isLogin && formData.username && (
              <div style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>
                Use your credentials to login
              </div>
            )}
          </div>
        )}
        
        <div className="input-group">
          <span className="input-icon"></span>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>
        
        <div className="input-group">
          <span className="input-icon"></span>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        
        {!isLogin && (
          <>
            <div className="input-group">
              <span className="input-icon"></span>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="input-group">
              <span className="input-icon"></span>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </>
        )}
        
        <button type="submit">
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
        
        <p className="auth-link">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            className="link-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
              if (!isLogin) {
                // Switching to register, clear form
                setFormData({ username: '', password: '', email: '', role: 'STUDENT' });
              }
            }}
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;