import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper } from '@mui/material';
import { Button } from 'react-bootstrap';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useHistory } from 'react-router-dom';

const Deliveries = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDeliveryDetails, setSelectedDeliveryDetails] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  useEffect(() => {
    const fetchDeliveries = async () => {
      const organisationId = localStorage.getItem('OrganisationId');
      const personId = localStorage.getItem('PersonId');
      const token = localStorage.getItem('token');


      if (!organisationId || !personId || !token) {
        setError('Missing required information in local storage.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://api.webcrm.com/Deliveries/ByOrganisation/${organisationId}`, {
          params: { Page: 1, Size: 50 },
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'text/plain',
          },
        });

        const deliveries = response.data;
        const matchedDeliveries = deliveries.filter(delivery => delivery.DeliveryOpportunityPersonId.toString() === personId);

        setMatches(matchedDeliveries);
      } catch (fetchError) {
        console.error('Error fetching deliveries:', fetchError);
        setError('Failed to fetch deliveries.');
      }

      setLoading(false);
    };

    fetchDeliveries();
  }, []);

  const handleMatchClick = async (deliveryId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`https://api.webcrm.com/Deliveries/${deliveryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'text/plain',
        },
      });

      setSelectedDeliveryDetails(response.data);
      setUpdatedFields({});
    } catch (fetchError) {
      console.error('Error fetching delivery details:', fetchError);
      setError('Failed to fetch delivery details.');
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setUpdatedFields(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleSaveChanges = async () => {
    // Send updatedFields to the server to save changes
    // For demonstration purposes, we'll just log the updated fields
    console.log('Updated fields:', updatedFields);
  };

  const handleCancel = () => {
    // Navigate back to the previous page
    history.goBack();
  };
  
  const history = useHistory();

  // Define placeholders for each field
  const placeholders = {
    'DeliveryOpportunityDescription': 'Namn på uppdrag',
    'DeliverySearch2': 'Placeringsort',
    'DeliveryOpportunityCustom1': 'Startdatum',
    'DeliveryOpportunityCustom2': 'Slutdatum',
    'DeliveryOpportunityCustom4': 'Roll',
    'DeliveryOpportunityCustom6': 'Uppdragsomfattning %',
    'DeliveryOpportunityCustom7': 'Beskrivningsuppdrag',
    'DeliveryOpportunityCustom8': 'Kompetenskrav',
    'DeliveryOpportunityCustom9': 'Övriga önskemål',
    'DeliveryOpportunityCustom11': 'Pris-h kund',
    'DeliveryOpportunityCustom14': 'Antal timmar',
    'DeliveryOpportunityCustom15': 'Vald konsult',
    'DeliveryPlus1': 'PO-nummer',
    'DeliveryPlus8': 'Förlängningsdatum'
  };

  const fields = Object.keys(placeholders);

  return (
    <div>
      <div style={{ fontSize: '14px', display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {matches.length > 0 ? (
          <ul>
            {matches.map((match, index) => (
              <li key={index} onClick={() => handleMatchClick(match.DeliveryId)} style={{ cursor: 'pointer' }}>
                <p>Delivery ID: {match.DeliveryId}</p>
                <p>DeliveryOpportunityPersonId: {match.DeliveryOpportunityPersonId}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matching deliveries found.</p>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {selectedDeliveryDetails && (
          <Paper elevation={10} style={{ borderRadius: '18px', width: '85%', marginBottom: '60px', padding: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
              <AssignmentOutlinedIcon fontSize="large" style={{ marginRight: '10px', verticalAlign: 'middle' }} />
              <h3 style={{ margin: 0 }}>Avtalsdetaljer</h3>
            </div>
            <div className="row">
              {fields.map((field, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <label htmlFor={field}>{placeholders[field]}</label>
                  {field === 'DeliveryOpportunityCustom7' || field === 'DeliveryOpportunityCustom8' || field === 'DeliveryOpportunityCustom9' ? (
                    <textarea
                      className="form-control"
                      id={field}
                      value={updatedFields[field] || selectedDeliveryDetails[field] || ''}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      placeholder={placeholders[field]} // Add placeholder dynamically
                    />
                  ) : (
                    <input
                      type={(field === 'DeliveryOpportunityCustom1' || field === 'DeliveryOpportunityCustom2' || field === 'DeliveryPlus8') ? 'date' : 'text'}
                      className="form-control"
                      id={field}
                      value={updatedFields[field] || selectedDeliveryDetails[field] || ''}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      placeholder={placeholders[field]} // Add placeholder dynamically
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <Button variant="contained" color="primary" onClick={handleCancel} style={{  border: '1px solid' , borderRadius: '6px', marginRight: '30px' }}>
                  Avbryt
                </Button>
                <Button variant="contained" color="primary" style={{ border: '1px solid' , borderRadius: '6px' }} onClick={handleSaveChanges}>
                  Spara
                </Button>
              </div>  
            </div>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default Deliveries;
