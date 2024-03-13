/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpportunitiesByPipelineLevel = ({ pipelineLevel }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in again.');
      setLoading(false);
      return;
    }

    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(`https://api.webcrm.com/Opportunities/ByPipelineLevel/${pipelineLevel}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setOpportunities(response.data);
      } catch (fetchError) {
        console.error('Error fetching opportunities:', fetchError);
        setError('Failed to fetch opportunities.');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [pipelineLevel]);

  if (loading) return <div>Loading opportunities...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Opportunities for Pipeline Level: {pipelineLevel}</h3>
      {opportunities.length > 0 ? (
        <ul>
          {opportunities.map((opportunity, index) => (
            <li key={index}>
              <p>Opportunity ID: {opportunity.OpportunityId}</p>
              <p>Description: {opportunity.OpportunityDescription}</p>
              {/* Add more details as needed */ /*}
              /*
            </li>
          ))}
        </ul>
      ) : (
        <p>No opportunities found for this pipeline level.</p>
      )}
    </div>
  );
};

export default OpportunitiesByPipelineLevel ;
*/