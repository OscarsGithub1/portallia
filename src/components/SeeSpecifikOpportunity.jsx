import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, ListGroup } from 'react-bootstrap';

function SeeSpecifikOpportunity() {
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const opportunityId = localStorage.getItem('SelectedOpportunityId');
    const token = localStorage.getItem('token');

    if (!opportunityId || !token) {
      setError('Opportunity ID or token not found. Please try again.');
      setLoading(false);
      return;
    }

    const fetchOpportunityDetails = async () => {
      try {
        const response = await axios.get(`https://api.webcrm.com/Opportunities/${opportunityId}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'text/plain' },
        });
        setOpportunity(response.data);
      } catch (fetchError) {
        console.error('Error fetching opportunity details:', fetchError);
        setError('Failed to fetch opportunity details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunityDetails();
  }, []);

  if (loading) return <div>Loading opportunity details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h5">Opportunity Details</Card.Header>
        <Card.Body>
          {opportunity && (
            <ListGroup variant="flush">
              {Object.entries(opportunity).map(([key, value]) => (
                <ListGroup.Item key={key}>
                  <strong>{key}:</strong> {value !== null ? value.toString() : 'N/A'}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SeeSpecifikOpportunity;
