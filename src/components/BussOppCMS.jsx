import React, { useEffect, useState } from 'react';

function BussOppCMS() {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      console.error('Access token is missing');
      return; // Exit if there is no token
    }

    const apiUrl = 'https://api.webcrm.com/Opportunities?Page=1&Size=50&include=SecurityInfo';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'text/plain',
      },
    })
    .then(response => response.json()) // Adjust the response parsing as needed
    .then(data => {
      setOpportunities(data); // Update your component state with the data
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []); // Empty dependency array means this effect runs once, like componentDidMount

  return (
    <div>
      <h1>Opportunities</h1>
      <ul>
        {opportunities.map(opportunity => (
          
          <li key={opportunity.OpportunityId}>
            <h2>{opportunity.OpportunityNumber}</h2>
            <p>Created at: {opportunity.OpportunityCreatedAt}</p>
            <p>Created by: {opportunity.OpportunityCreatedBy}</p>
            <p>Description: {opportunity.OpportunityDescription}</p>
            <h1>Opportunities</h1>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BussOppCMS;

