import React, { useState, useEffect } from 'react';
import { getCampaigns, createCampaign, updateCampaignStatus } from '../api';

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    type: 'COURSE',
    startDate: '',
    endDate: '',
    targetAudience: 'ALL'
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await getCampaigns();
      console.log('Fetched campaigns:', response.data);
      setCampaigns(response.data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setCampaigns([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Creating campaign:', newCampaign);
      const response = await createCampaign(newCampaign);
      console.log('Campaign created:', response.data);
      setShowForm(false);
      setNewCampaign({ name: '', description: '', type: 'COURSE', startDate: '', endDate: '', targetAudience: 'ALL' });
      fetchCampaigns();
    } catch (error) {
      console.error('Error creating campaign:', error);
      const errorMsg = error.response?.data?.message || error.response?.data || error.message || 'Unknown error';
      alert('Failed to create campaign: ' + errorMsg);
    }
  };

  const toggleCampaignStatus = async (id, currentStatus) => {
    try {
      await updateCampaignStatus(id, !currentStatus);
      fetchCampaigns();
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  return (
    <div className="campaign-manager">
      <div className="campaign-header">
        <h2>📅 Feedback Campaigns</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          + New Campaign
        </button>
      </div>

      {showForm && (
        <div className="campaign-form-modal">
          <form onSubmit={handleSubmit} className="campaign-form">
            <h3>Create New Campaign</h3>
            <input
              type="text"
              placeholder="Campaign Name"
              value={newCampaign.name}
              onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
              required
            />
            <textarea
              placeholder="Description"
              value={newCampaign.description}
              onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
            />
            <select
              value={newCampaign.type}
              onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
            >
              <option value="COURSE">Course Feedback</option>
              <option value="FACULTY">Faculty Feedback</option>
              <option value="FACILITY">Facility Feedback</option>
            </select>
            <input
              type="datetime-local"
              value={newCampaign.startDate}
              onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
              required
            />
            <input
              type="datetime-local"
              value={newCampaign.endDate}
              onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
              required
            />
            <div className="form-actions">
              <button type="submit" className="btn-primary">Create</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="campaigns-list">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="campaign-card">
            <div className="campaign-info">
              <h4>{campaign.name}</h4>
              <p>{campaign.description}</p>
              <span className="campaign-type">{campaign.type}</span>
              <span className={`campaign-status ${campaign.active ? 'active' : 'inactive'}`}>
                {campaign.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="campaign-actions">
              <button
                onClick={() => toggleCampaignStatus(campaign.id, campaign.active)}
                className={`btn-toggle ${campaign.active ? 'btn-danger' : 'btn-success'}`}
              >
                {campaign.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignManager;