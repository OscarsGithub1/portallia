import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup } from 'react-bootstrap';

const OpportunitiesByResponsible = ({ matchOpportunityNumber }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [matchedOpportunities, setMatchedOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const responsibleId = localStorage.getItem('ResponsibleId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOpportunities = async () => {
      let page = 1;
      let hasMore = true;

      if (!responsibleId || !token) {
        setError('Required information not found. Please ensure you are logged in and try again.');
        setLoading(false);
        return;
      }

      while (hasMore) {
        try {
          const response = await axios.get(`https://api.webcrm.com/Opportunities/ByResponsible/${responsibleId}`, {
            params: { Page: page, Size: 50, include: 'SecurityInfo' },
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'text/plain' },
          });

          const data = response.data;
          if (data.length > 0) {
            setOpportunities(prev => [...prev, ...data]);
            page += 1;
          } else {
            hasMore = false;
          }
        } catch (fetchError) {
          console.error('Error fetching opportunities:', fetchError);
          setError('Failed to fetch opportunities.');
          hasMore = false;
        }
      }
      setLoading(false);
    };

    fetchOpportunities();
  }, [responsibleId, token]);

  useEffect(() => {
    const matched = opportunities.filter(opportunity => opportunity.OpportunityNumber === matchOpportunityNumber);
    console.log(`Found ${matched.length} matching opportunities for Opportunity Number: ${matchOpportunityNumber}`);

    // Log details of each matched opportunity
    matched.forEach((opportunity, index) => {
      console.log(`Matched Opportunity ${index + 1}:`, opportunity);
    });

    setMatchedOpportunities(matched);
  }, [opportunities, matchOpportunityNumber]);

  if (loading) return <div>Loading opportunities...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="mt-3">
      <h3>Matched Opportunities</h3>
      {matchedOpportunities.length > 0 ? (
        matchedOpportunities.map((opportunity, index) => (
          <Card className="mb-3" key={index}>
            <Card.Header>Opportunity ID: {opportunity.OpportunityId}</Card.Header>
            <ListGroup variant="flush">
              {Object.entries(opportunity).map(([key, value]) => (
                <ListGroup.Item key={key}>
                  <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value, null, 2) : value.toString()}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        ))
      ) : (
        <p>No matching opportunities found for Opportunity Number: {matchOpportunityNumber}.</p>
      )}
    </Container>
  );
};

export default OpportunitiesByResponsible;
