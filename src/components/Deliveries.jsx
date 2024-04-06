import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

const Deliveries = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDeliveryDetails, setSelectedDeliveryDetails] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [showDetails, setShowDetails] = useState(false); // State to toggle visibility
  const history = useHistory();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

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
          params: { Page: currentPage, Size: 10 }, // Adjust the size as needed
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
  }, [currentPage]); // Update the fetchDeliveries call when currentPage changes

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

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
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
          <div style={{ width: '90%', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <AssignmentTurnedInOutlinedIcon fontSize="large" style={{ marginRight: '10px' }} />
              <h3 >Uppdrag</h3>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
              <TableContainer component={Paper} elevation={10} sx={{ borderRadius: '8px', height: '588px', maxHeight: '650px', overflowY: 'auto', marginTop: '15px'}}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontWeight: 'bold' }}>                   
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <DescriptionOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                          Beskrivning
                        </div>
                      </TableCell>
                      <TableCell style={{fontWeight: 'bold' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <EventOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                          Startdatum
                        </div>
                      </TableCell>
                      <TableCell style={{fontWeight: 'bold' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <EventOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                          Slutdatum
                        </div>
                      </TableCell>
                      <TableCell style={{fontWeight: 'bold' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <NumbersOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                          Pris-h
                        </div>
                      </TableCell>
                      <TableCell style={{fontWeight: 'bold' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <NumbersOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                          Antal-h
                        </div>
                      </TableCell>
                      <TableCell style={{fontWeight: 'bold' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <PlaceOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                          Postort
                        </div>
                      </TableCell>
                      <TableCell style={{fontWeight: 'bold' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <AccountBoxOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                          Ansvarig
                        </div>
                      </TableCell>
                      {/* Add more headers as needed */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {matches.map((match, index) => (
                      <TableRow key={index} hover onClick={() => handleMatchClick(match.DeliveryId)}>
                        <TableCell>{match.DeliveryOpportunityDescription}</TableCell>
                        <TableCell>{match.DeliveryOpportunityCustom1}</TableCell>
                        <TableCell>{match.DeliveryOpportunityCustom2}</TableCell>
                        <TableCell>{match.DeliveryOpportunityCustom11}</TableCell>
                        <TableCell>{match.DeliveryOpportunityCustom14}</TableCell>
                        <TableCell>{match.DeliverySearch2}</TableCell>
                        <TableCell>{match.DeliveryCreatedBy}</TableCell>
                        {/* Add more cells as needed */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>              
            )}          
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                display: 'flex', 
                justifyContent: 'center', 
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.6)' 
              }}>
                <Pagination
                  count={pageCount}
                  page={currentPage}
                  onChange={handleChangePage}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                      {...item}
                    />
                  )}
                />
            </div>
          </div>
        </div>
      )}

      {showDetails && selectedDeliveryDetails && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={10} style={{ borderRadius: '18px', width: '85%', marginBottom: '60px', padding: '50px', marginTop: '100px' }}>
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
                  Tillbaka
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
