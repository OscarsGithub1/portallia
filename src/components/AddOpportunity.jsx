import React, { useState } from 'react';
import { Form, Button, Card, Col } from 'react-bootstrap';
import axios from 'axios';

function AddOpportunity() {
  const [formData, setFormData] = useState({
    OpportunityAssignedTo: 0,
    OpportunityAssignedTo2: 0,
    OpportunityComment: '',
    OpportunityCreatedAt: new Date().toISOString(),
    OpportunityCreatedBy: '',
    OpportunityCurrencyName: '',
    OpportunityCurrencySymbol: '',
    OpportunityDescription: '',
    OpportunityDiscount: 0,
    OpportunityErpId: '',
    OpportunityErpReadOnly: '',
    OpportunityErpStatus: 'NotReadyForSynchronization',
    OpportunityErpSyncDateTime: new Date().toISOString(),
    OpportunityGmRevenue1: 0,
    OpportunityGmRevenue2: 0,
    OpportunityGmRevenue3: 0,
    OpportunityGmRevenue4: 0,
    OpportunityGmRevenue5: 0,
    OpportunityGmRevenue6: 0,
    OpportunityGmRevenue7: 0,
    OpportunityGmRevenue8: 0,
    OpportunityGmRevenue9: 0,
    OpportunityGmRevenue10: 0,
    OpportunityGmRevenue11: 0,
    OpportunityGmRevenue12: 0,
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/Opportunities', {
        opportunityDto: formData,
      });

      // Handle the response, e.g., show a success message
      console.log('Opportunity created successfully:', response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error creating opportunity:', error);
    }
  };

  return (
    <Card border="primary" style={{ width: '50%', margin: 'auto', marginTop: '50px', padding: '20px' }}>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* Your existing form fields */}
          {/* ... */}
          
          {/* Opportunity GM Revenue 1 to 12 */}
          {[...Array(12).keys()].map((index) => (
            <Form.Group as={Col} key={index} controlId={`OpportunityGmRevenue${index + 1}`}>
              <Form.Label>{`Opportunity GM Revenue ${index + 1}`}</Form.Label>
              <Form.Control type="number" name={`OpportunityGmRevenue${index + 1}`} value={formData[`OpportunityGmRevenue${index + 1}`]} onChange={handleChange} />
            </Form.Group>
          ))}

          {/* Continue adding similar input elements for other fields */}
          
          <Button variant="primary" type="submit">
            Create Opportunity
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddOpportunity;
