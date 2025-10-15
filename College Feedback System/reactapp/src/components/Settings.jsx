import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'College Feedback System',
    emailNotifications: true,
    autoBackup: false,
    maintenanceMode: false,
    maxFeedbackLength: 500
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-container">
      <h2>System Settings</h2>
      
      <div className="settings-section">
        <h3>General Settings</h3>
        
        <div className="setting-item">
          <label>Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleChange('siteName', e.target.value)}
          />
        </div>

        <div className="setting-item">
          <label>Maximum Feedback Length</label>
          <input
            type="number"
            value={settings.maxFeedbackLength}
            onChange={(e) => handleChange('maxFeedbackLength', parseInt(e.target.value))}
            min="100"
            max="1000"
          />
        </div>
      </div>

      <div className="settings-section">
        <h3>System Options</h3>
        
        <div className="setting-item checkbox-item">
          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
            />
            Enable Email Notifications
          </label>
        </div>

        <div className="setting-item checkbox-item">
          <label>
            <input
              type="checkbox"
              checked={settings.autoBackup}
              onChange={(e) => handleChange('autoBackup', e.target.checked)}
            />
            Enable Auto Backup
          </label>
        </div>

        <div className="setting-item checkbox-item">
          <label>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
            />
            Maintenance Mode
          </label>
        </div>
      </div>

      <div className="settings-actions">
        <button onClick={handleSave} className="save-btn">
          Save Settings
        </button>
        {saved && <span className="save-indicator">Settings saved!</span>}
      </div>
    </div>
  );
};

export default Settings;