import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import OpportunitiesByResponsible from './OpportunitiesByResponsiblePerson'; // Make sure the path is correct

const OpportunitiesByPersonAndPipeline = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunityNumber, setSelectedOpportunityNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const personId = localStorage.getItem('PersonId');

  useEffect(() => {
    const fetchOpportunities = async () => {
      let page = 1;
      let hasMorePages = true;

      if (!personId || !token) {
        setError('Required information not found. Please ensure you are logged in and try again.');
        setLoading(false);
        return;
      }

      while (hasMorePages) {
        try {
          const response = await axios.get(`https://api.webcrm.com/Opportunities/ByPipelineLevel/13`, {
            params: { Page: page, Size: 50, include: 'SecurityInfo' },
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'text/plain' },
          });

          if (response.data.length > 0) {
            setOpportunities(prev => [...prev, ...response.data.filter(opportunity => opportunity.OpportunityPersonId.toString() === personId)]);
            page++;
          } else {
            hasMorePages = false;
          }
        } catch (fetchError) {
          console.error('Error fetching opportunities:', fetchError);
          setError('Failed to fetch opportunities.');
          hasMorePages = false;
        }
      }
      setLoading(false);
    };

    fetchOpportunities();
  }, [personId, token]);

  const handleSelectOpportunity = (opportunityNumber) => {
    setSelectedOpportunityNumber(opportunityNumber);
  };

  const renderOpportunityDetails = (opportunity) => {
    return Object.entries(opportunity).map(([key, value]) => (
      <ListGroup.Item key={key}>
        <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value, null, 2) : value.toString()}
      </ListGroup.Item>
    ));
  };

  if (loading) return <div>Loading opportunities...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="mt-3">
      <h3>Opportunities at Pipeline Level 13 for Person ID: {personId}</h3>
      {opportunities.length > 0 ? (
        opportunities.map((opportunity, index) => (
          <Card className="mb-3" key={index}>
            <Card.Header>Opportunity ID: {opportunity.OpportunityId}</Card.Header>
            <ListGroup variant="flush">
              {renderOpportunityDetails(opportunity)}
              <Button onClick={() => handleSelectOpportunity(opportunity.OpportunityNumber)}>Match This Opportunity</Button>
            </ListGroup>
          </Card>
        ))
      ) : (
        <p>No matching opportunities found for this person at pipeline level 13.</p>
      )}
      {selectedOpportunityNumber && <OpportunitiesByResponsible matchOpportunityNumber={selectedOpportunityNumber} />}
    </Container>
  );
};

export default OpportunitiesByPersonAndPipeline;
