import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AddOpportunity = () => {
  const initialOpportunityState = {
    OpportunityAssignedTo: '',
    OpportunityAssignedTo2: '',
    OpportunityComment: '',
    OpportunityCreatedAt: '',
    OpportunityCreatedBy: '',
    OpportunityCurrencyName: '',
    OpportunityCurrencySymbol: '',
    OpportunityDescription: '',
    OpportunityDiscount: '',
    OpportunityErpId: '',
    // Initialize other fields similarly
  };
  
  const [opportunityData, setOpportunityData] = useState(initialOpportunityState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOpportunityData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://api.webcrm.com/Opportunities', opportunityData, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      // Handle success (e.g., clearing the form, showing a success message)
      setOpportunityData(initialOpportunityState);
    } catch (err) {
      setError('Failed to add opportunity. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 1,
        p: 2,
        border: '1px solid #fff',
        borderRadius: '4px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Typography variant="h6">Add New Opportunity</Typography>
      {/* Text fields for string inputs */}
      <TextField
        margin="normal"
        required
        fullWidth
        id="OpportunityDescription"
        label="Opportunity Description"
        name="OpportunityDescription"
        value={opportunityData.OpportunityDescription}
        onChange={handleChange}
      />
      {/* Repeat TextFields for other string fields */}
      
      {/* Select fields for enumerated values */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="erp-status-label">Opportunity ERP Status</InputLabel>
        <Select
          labelId="erp-status-label"
          id="OpportunityErpStatus"
          name="OpportunityErpStatus"
          value={opportunityData.OpportunityErpStatus}
          label="Opportunity ERP Status"
          onChange={handleChange}
        >
          <MenuItem value={"NotReadyForSynchronization"}>Not Ready For Synchronization</MenuItem>
          <MenuItem value={"ReadyForSynchronization"}>Ready For Synchronization</MenuItem>
          {/* Add other options as necessary */}
        </Select>
      </FormControl>
      {/* Add more Selects for other enumerated fields */}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default AddOpportunity;
