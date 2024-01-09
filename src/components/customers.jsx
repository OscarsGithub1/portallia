import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <button
      type="button"
      style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
};

const CustomerList1 = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7042/api/Customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Kunder</h2>
      <Accordion defaultActiveKey="0">
        {customers.map((customer, index) => (
          <Card key={customer.id}>
            <Card.Header>
              <CustomToggle eventKey={String(index)}>
                {customer.companyName}
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={String(index)}>
              <Card.Body>
                <p><strong>Type:</strong> {customer.typeOfCustomer}</p>
                <p><strong>Website:</strong> <a href={customer.websiteLink}>{customer.websiteLink}</a></p>
                <p><strong>Number:</strong> {customer.number}</p>
                <p><strong>Postal Code:</strong> {customer.postalCode}</p>
                {/* Add more customer details here */}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

export default CustomerList1;

