import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AddOpportunity from './AddOpportunity';
import UserOrganisations from './UserOrganisations';
import OpportunityForm from './OpportunityForm';
import OpportunitiesListOne from './OpportunitiesListOne';
import Deliveries from './Deliveries';
import OpportunityList from './OpportunityList';

const OpportunitiesByOrganisation = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const personId = localStorage.getItem('PersonId');
  const token = localStorage.getItem('token');
  const history = useHistory();

  useEffect(() => {
    const fetchOpportunities = async () => {
      if (!personId || !token) {
        setError('Required information not found. Please ensure you are logged in and try again.');
        setLoading(false);
        return;
      }
  
      let page = 1;
      let allFetched = false;
  
      while (!allFetched) {
        try {
          const response = await axios.get(`https://api.webcrm.com/Opportunities/ByPipelineLevel/1`, {
            params: { Page: page, Size: 50, include: 'SecurityInfo' },
            headers: { 'Authorization': `Bearer ${token}` },
          });
  
          const filteredOpportunities = response.data.filter(opportunity => opportunity.OpportunityPersonId.toString() === personId);
  
          if (filteredOpportunities.length > 0) {
            setOpportunities(prev => [...prev, ...filteredOpportunities]);
            page += 1;
          } else {
            allFetched = true;
          }
        } catch (error) {
          console.error('Error fetching opportunities:', error);
          setError('Failed to fetch opportunities.');
          allFetched = true;
        }
      }
      setLoading(false);
    };
  
    fetchOpportunities();
  }, [personId, token]);
  
  const handleOpportunityClick = (opportunityId) => {
    // Replace '/SeeSpecifikOpportunity' with your actual route
    history.push(`/SeeSpecifikOpportunity/${opportunityId}`);
  };

  if (loading) return <Box>Loading opportunities...</Box>;
  if (error) return <Box sx={{ color: 'error.main' }}>Error: {error}</Box>;

  return (
    <Box>
      <Deliveries/>
     {/*  <UserOrganisations/> */}
       
      
      
        <AddOpportunity /> 
      
      {/*  <OpportunityForm/> */}
      
     {/*  <OpportunitiesListOne/> */}
      
      
    </Box>
  );
 

};

export default OpportunitiesByOrganisation;
