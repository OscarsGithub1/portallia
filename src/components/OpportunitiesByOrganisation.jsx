import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const OpportunitiesByOrganisation = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const personId = localStorage.getItem('PersonId'); // Retrieve PersonId from local storage
  const token = localStorage.getItem('token'); // Retrieve the token from local storage
  const history = useHistory(); // Initialize useHistory hook

  useEffect(() => {
    if (!personId || !token) {
      setError('Required information not found. Please ensure you are logged in and try again.');
      setLoading(false);
      return;
    }

    const fetchOpportunities = async () => {
      let page = 1;
      const size = 50;
      let allFetched = false;

      while (!allFetched) {
        try {
          const response = await axios.get(`https://api.webcrm.com/Opportunities/ByPipelineLevel/1`, {
            params: { Page: page, Size: size, include: 'SecurityInfo' },
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'text/plain' },
          });

          if (response.data.length > 0) {
            setOpportunities(prev => [...prev, ...response.data.filter(opportunity => opportunity.OpportunityPersonId.toString() === personId)]);
            page += 1;
          } else {
            allFetched = true;
          }
        } catch (error) {
          console.error('Error fetching opportunities:', error);
          setError('Failed to fetch opportunities.');
          allFetched = true; // Stop loop on error
        }
      }
      setLoading(false);
    };

    fetchOpportunities();
  }, [personId, token]); // Add personId and token as dependencies to useEffect

  const handleOpportunityClick = (opportunityId) => {
    localStorage.setItem('SelectedOpportunityId', opportunityId); // Store the clicked OpportunityId in local storage
    history.push('/SeeSpecifikOpportunity'); // Redirect to SeeSpecifikOpportunity page
  };

  if (loading) return <div>Loading opportunities...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Opportunities for Person ID: {personId}</h3>
      {opportunities.length > 0 ? (
        <ul>
          {opportunities.map((opportunity, index) => (
            <li key={index} style={{ cursor: 'pointer' }} onClick={() => handleOpportunityClick(opportunity.OpportunityId)}>
              <p>Opportunity ID: {opportunity.OpportunityId}</p>
              <p>Description: {opportunity.OpportunityDescription}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching opportunities found for this person at pipeline level 1.</p>
      )}
    </div>
  );
};

export default OpportunitiesByOrganisation;
