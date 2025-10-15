import React from 'react';

const ColorShowcase = () => {
  return (
    <div style={{ padding: '2rem', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <h1 style={{ color: 'var(--text-primary)', textAlign: 'center', marginBottom: '2rem' }}>
        Dashboard Color Scheme
      </h1>
      
      {/* Color Palette Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--dark-primary)', color: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <strong>Dark Primary</strong><br/>#010106
        </div>
        <div style={{ background: 'var(--dark-secondary)', color: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <strong>Dark Secondary</strong><br/>#222B5F
        </div>
        <div style={{ background: 'var(--red-light)', color: 'var(--text-primary)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <strong>Red Light</strong><br/>#fef2f2
        </div>
        <div style={{ background: 'var(--red-medium)', color: 'var(--text-primary)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <strong>Red Medium</strong><br/>#fecaca
        </div>
        <div style={{ background: 'var(--red-dark)', color: 'var(--text-primary)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <strong>Red Dark</strong><br/>#fca5a5
        </div>
        <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <strong>Accent Blue</strong><br/>#222BAD
        </div>
        <div style={{ background: 'var(--accent-teal)', color: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <strong>Accent Teal</strong><br/>#0EB6B3
        </div>
        <div style={{ background: 'var(--accent-green)', color: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <strong>Accent Green</strong><br/>#4EB14B
        </div>
      </div>

      {/* Sample Dashboard Elements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="stat-card blue">
          <div style={{ fontSize: '2rem', color: 'var(--accent-blue)' }}>📊</div>
          <div>
            <h3 style={{ fontSize: '2rem', margin: '0', color: 'var(--text-primary)' }}>1,234</h3>
            <p style={{ margin: '0', color: 'var(--text-secondary)' }}>Total Users</p>
          </div>
        </div>
        
        <div className="stat-card green">
          <div style={{ fontSize: '2rem', color: 'var(--accent-green)' }}>✅</div>
          <div>
            <h3 style={{ fontSize: '2rem', margin: '0', color: 'var(--text-primary)' }}>89%</h3>
            <p style={{ margin: '0', color: 'var(--text-secondary)' }}>Success Rate</p>
          </div>
        </div>
        
        <div className="stat-card medium">
          <div style={{ fontSize: '2rem', color: 'var(--accent-medium)' }}>📈</div>
          <div>
            <h3 style={{ fontSize: '2rem', margin: '0', color: 'var(--text-primary)' }}>567</h3>
            <p style={{ margin: '0', color: 'var(--text-secondary)' }}>Active Sessions</p>
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button className="btn-primary">Primary Action</button>
        <button className="btn-success">Success Action</button>
        <button className="btn-secondary">Secondary Action</button>
      </div>

      {/* Sample Chart */}
      <div className="chart-container" style={{ marginBottom: '2rem' }}>
        <h3>Sample Analytics</h3>
        <div style={{ display: 'flex', alignItems: 'end', gap: '1rem', height: '150px' }}>
          {[40, 70, 55, 80, 65, 90, 75].map((height, index) => (
            <div key={index} style={{ 
              flex: 1, 
              background: 'var(--accent-teal)', 
              height: `${height}%`, 
              borderRadius: '4px 4px 0 0',
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.8rem',
              paddingBottom: '0.5rem'
            }}>
              {height}%
            </div>
          ))}
        </div>
      </div>

      {/* Sample Table */}
      <div className="feedback-table-container">
        <div className="table-header">
          <h3>Sample Data Table</h3>
        </div>
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td><span className="role-badge student">Active</span></td>
              <td>95%</td>
              <td>
                <button className="btn-success btn-sm">View</button>
              </td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td><span className="role-badge faculty">Pending</span></td>
              <td>87%</td>
              <td>
                <button className="btn-primary btn-sm">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ColorShowcase;