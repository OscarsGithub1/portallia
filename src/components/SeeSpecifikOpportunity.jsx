import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper } from '@mui/material';
import { Button } from 'react-bootstrap';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useHistory } from 'react-router-dom';

function SeeSpecifikOpportunity() {
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatedFields, setUpdatedFields] = useState({});
  const [originalFields, setOriginalFields] = useState({});
  const history = useHistory();

  useEffect(() => {
    const opportunityId = localStorage.getItem('SelectedOpportunityId');
    const token = localStorage.getItem('token');

    if (!opportunityId || !token) {
      setError('Missing required information in local storage.');
      setLoading(false);
      return;
    }

    const fetchOpportunityDetails = async () => {
      try {
        const response = await axios.get(`https://api.webcrm.com/Opportunities/${opportunityId}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        });
        setOpportunity(response.data);
        setOriginalFields(response.data);
      } catch (fetchError) {
        console.error('Error fetching opportunity details:', fetchError);
        setError('Failed to fetch opportunity details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunityDetails();
  }, []);

  const handleFieldChange = (fieldName, value) => {
    setUpdatedFields(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleSaveChanges = async () => {
    // Send updatedFields to the server to save changes
    try {
      // Assuming you have an endpoint to update opportunity details
      const response = await axios.put(`https://api.webcrm.com/Opportunities/${opportunity.id}`, updatedFields, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' },
      });
      console.log('Changes saved successfully:', response.data);
      // Update originalFields with updatedFields
      setOriginalFields(updatedFields);
    } catch (error) {
      console.error('Error saving changes:', error);
      // Handle error appropriately
    }
  };

  const handleCancel = () => {
    // Reset updatedFields to originalFields
    setUpdatedFields(originalFields);
    // Navigate back to the previous page
    history.goBack();
  };

  // Mapping of API field names to user-friendly display names
  const placeholders = {
    'OpportunitySearch2': 'Placeringsort',
    'OpportunityCustom6': 'Uppdragsomfattning %',
    'OpportunityCustom1': 'Start',
    'OpportunityCustom3': 'Slut',
    'OpportunityCustom4': 'Sista svarsdag',
    'OpportunityCustom7': 'Roll',
    'OpportunityCustom8': 'Beskrivning uppdrag',
    'OpportunityCustom9': 'Kompetenskrav',
    'OpportunityCustom10': 'Övriga önskemål',
  };

  if (loading) return <div>Loading opportunity details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        {opportunity && (
          <Paper elevation={10} style={{ borderRadius: '18px', width: '85%', marginBottom: '60px', padding: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
              <AssignmentOutlinedIcon fontSize="large" style={{ marginRight: '10px', verticalAlign: 'middle' }} />
              <h3 style={{ margin: 0 }}>Affärsdetaljer</h3>
            </div>
            <div className="row">
              {Object.entries(placeholders).map(([field, displayName]) => (
                <div key={field} className="col-md-4 mb-4">
                  <label htmlFor={field}>{displayName}</label>
                  {field === 'OpportunityCustom8' || field === 'OpportunityCustom9' || field === 'OpportunityCustom10' ? (
                    <textarea
                      className="form-control"
                      id={field}
                      value={updatedFields[field] || originalFields[field] || ''}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      placeholder={displayName}
                    />
                  ) : (
                    <input
                      type={(field === 'OpportunityCustom1' || field === 'OpportunityCustom3' || field === 'OpportunityCustom4') ? 'date' : 'text'}
                      className="form-control"
                      id={field}
                      value={updatedFields[field] || originalFields[field] || ''}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      placeholder={displayName}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <Button variant="contained" color="primary" onClick={handleCancel} style={{ border: '1px solid', borderRadius: '6px', marginRight: '30px' }}>
                  Avbryt
                </Button>
                <Button variant="contained" color="primary" style={{ border: '1px solid', borderRadius: '6px' }} onClick={handleSaveChanges}>
                  Spara
                </Button>
              </div>
            </div>
          </Paper>
        )}
    </div>
  );
}

export default SeeSpecifikOpportunity;
