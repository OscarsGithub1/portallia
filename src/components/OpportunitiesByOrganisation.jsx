import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const OpportunitiesByOrganisation = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const personId = localStorage.getItem('PersonId');
  const token = localStorage.getItem('token');
  const history = useHistory();

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
          allFetched = true;
        }
      }
      setLoading(false);
    };

    fetchOpportunities();
  }, [personId, token]);

  const handleOpportunityClick = (opportunityId) => {
    localStorage.setItem('SelectedOpportunityId', opportunityId);
    history.push('/SeeSpecifikOpportunity');
  };

  if (loading) return <div className="text-center mt-5">Loading opportunities...</div>;
  if (error) return <div className="alert alert-danger" role="alert">Error: {error}</div>;

  return (
    <div className="container mt-3">
      <h3 className="text-center">Opportunities for Person ID: {personId}</h3>
      {opportunities.length > 0 ? (
        <ul className="list-group">
          {opportunities.map((opportunity, index) => (
            <li key={index} className="list-group-item list-group-item-action" onClick={() => handleOpportunityClick(opportunity.OpportunityId)}>
              <p><strong>Opportunity ID:</strong> {opportunity.OpportunityId}</p>
              <p><strong>Description:</strong> {opportunity.OpportunityDescription}</p>
              <p><strong>Created By:</strong> {opportunity.OpportunityCreatedBy}</p>
              <p><strong>Opportunity Plus1:</strong> {opportunity.OpportunityPlus1}</p>
              <p><strong>Order Date:</strong> {opportunity.OpportunityOrderDate}</p>
              <p><strong>Opportunity Number:</strong> {opportunity.OpportunityNumber}</p>
            </li>
          ))} 
        </ul>
      ) : (
        <p className="text-center">No matching opportunities found for this person at pipeline level 1.</p>
      )}
    </div>
  );
};

export default OpportunitiesByOrganisation;
