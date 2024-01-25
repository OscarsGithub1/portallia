import React, { useState } from 'react';
import axios from 'axios';

function CreateWorkTaskOpportunity() {
  const [formData, setFormData] = useState({
    company: '',
    description: '',
    opportunityDate: '',
    opportunityValue: '',
    isClosed: false,
    salesResponsible: '',
    pipelineLevel: '',
    userId: '' // Added field for userId
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      opportunityValue: parseFloat(formData.opportunityValue),
      userIds: formData.userId ? [parseInt(formData.userId)] : [] // Convert userId to an array of numbers
    };

    try {
      const token = localStorage.getItem('token'); // Retrieve the token for Authorization
      const response = await axios.post(
        'https://localhost:7042/worktaskopportunity/createWorkTaskOpportunity',
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include if needed
          }
        }
      );

      console.log('WorkTaskOpportunity created:', response.data);
      // Additional logic upon success
    } catch (error) {
      console.error('Error creating WorkTaskOpportunity:', error.response || error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Work Task Opportunity</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="company" className="form-label">Company</label>
          <input type="text" className="form-control" id="company" name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <label htmlFor="opportunityDate" className="form-label">Opportunity Date</label>
          <input type="date" className="form-control" id="opportunityDate" name="opportunityDate" value={formData.opportunityDate} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <label htmlFor="opportunityValue" className="form-label">Value</label>
          <input type="number" className="form-control" id="opportunityValue" name="opportunityValue" value={formData.opportunityValue} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <div className="form-check form-switch mt-4">
            <input className="form-check-input" type="checkbox" id="isClosed" name="isClosed" checked={formData.isClosed} onChange={handleChange} />
            <label className="form-check-label" htmlFor="isClosed">Is Closed?</label>
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="salesResponsible" className="form-label">Sales Responsible</label>
          <input type="text" className="form-control" id="salesResponsible" name="salesResponsible" value={formData.salesResponsible} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="pipelineLevel" className="form-label">Pipeline Level</label>
          <input type="text" className="form-control" id="pipelineLevel" name="pipelineLevel" value={formData.pipelineLevel} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="userId" className="form-label">User ID</label>
          <input type="number" className="form-control" id="userId" name="userId" value={formData.userId} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Create Opportunity</button>
        </div>
      </form>
    </div>
  );
}

export default CreateWorkTaskOpportunity;
