import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

const Deliveries = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDeliveryDetails, setSelectedDeliveryDetails] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [showDetails, setShowDetails] = useState(false); // State to toggle visibility
  const history = useHistory();

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

      setLoading(true);

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
        setLoading(false);
      } catch (fetchError) {
        console.error('Error fetching deliveries:', fetchError);
        setError('Failed to fetch deliveries.');
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  const handleMatchClick = async (deliveryId) => {
    const selected = matches.find(delivery => delivery.DeliveryId === deliveryId);
    if (selected) {
      setSelectedDeliveryDetails(selected);
      setUpdatedFields({});
      setShowDetails(true); // Show the delivery details
    } else {
      console.error('Selected delivery not found');
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setUpdatedFields(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleSaveChanges = async () => {
    // Your logic for saving changes...
  };

  const handleCancel = () => {
    setShowDetails(false); // Hide the delivery details and show the deliveries list again
  };

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
      {!showDetails && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
          <Paper elevation={10} style={{ width: '90%', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
              <AssignmentOutlinedIcon fontSize="large" style={{ marginRight: '10px' }} />
              <h3>Deliveries</h3>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
              <TableContainer component={Paper} elevation={10} sx={{ borderRadius: '8px', height: '588px', maxHeight: '650px', overflowY: 'auto', marginTop: '15px'}}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Delivery ID</TableCell>
                      <TableCell>Person ID</TableCell>
                      <TableCell>Opportunity Plus1</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Delivery Number</TableCell>
                      <TableCell>Created By</TableCell>
                      <TableCell>Delivery Person ID</TableCell>
                      {/* Add more headers as needed */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {matches.map((match, index) => (
                      <TableRow key={index} hover onClick={() => handleMatchClick(match.DeliveryId)}>
                        <TableCell>{match.DeliveryId}</TableCell>
                        <TableCell>{match.DeliveryOpportunityPersonId}</TableCell>
                        <TableCell>{match.DeliveryOpportunityPlus1}</TableCell>
                        <TableCell>{new Date(match.DeliveryCreatedAt).toLocaleDateString()}</TableCell>
                        <TableCell>{match.DeliveryNumber}</TableCell>
                        <TableCell>{match.DeliveryCreatedBy}</TableCell>
                        <TableCell>{match.DeliveryPersonId}</TableCell>
                        {/* Add more cells as needed */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </div>
      )}

      {showDetails && selectedDeliveryDetails && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                      placeholder={placeholders[field]}
                    />
                  ) : (
                    <input
                      type={(field === 'DeliveryOpportunityCustom1' || field === 'DeliveryOpportunityCustom2' || field === 'DeliveryPlus8') ? 'date' : 'text'}
                      className="form-control"
                      id={field}
                      value={updatedFields[field] || selectedDeliveryDetails[field] || ''}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      placeholder={placeholders[field]}
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
        </div>
      )}
    </div>
  );
};

export default Deliveries;
