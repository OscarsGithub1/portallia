import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Deliveries = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDeliveryDetails, setSelectedDeliveryDetails] = useState(null); // State for selected delivery details

  useEffect(() => {
    const fetchDeliveries = async () => {
      const organisationId = localStorage.getItem('OrganisationId');
      const personId = localStorage.getItem('PersonId');
      const token = localStorage.getItem('token');

      if (!organisationId || !personId || !token) {
        setError('Missing required information in local storage.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://api.webcrm.com/Deliveries/ByOrganisation/${organisationId}`, {
          params: { Page: 1, Size: 50 },
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'text/plain',
          },
        });

        const deliveries = response.data;
        const matchedDeliveries = deliveries.filter(delivery => delivery.DeliveryOpportunityPersonId.toString() === personId);

        setMatches(matchedDeliveries);
      } catch (fetchError) {
        console.error('Error fetching deliveries:', fetchError);
        setError('Failed to fetch deliveries.');
      }

      setLoading(false);
    };

    fetchDeliveries();
  }, []);

  const handleMatchClick = async (deliveryId) => {
    const token = localStorage.getItem('token'); // Ensure token is retrieved correctly

    try {
      const response = await axios.get(`https://api.webcrm.com/Deliveries/${deliveryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'text/plain',
        },
      });

      setSelectedDeliveryDetails(response.data); // Store the fetched delivery details
    } catch (fetchError) {
      console.error('Error fetching delivery details:', fetchError);
      setError('Failed to fetch delivery details.');
    }
  };

  return (
    <div>
      <h2>Matching Deliveries</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <li key={index} onClick={() => handleMatchClick(match.DeliveryId)} style={{ cursor: 'pointer' }}>
              Delivery ID: {match.DeliveryId}, DeliveryOpportunityPersonId: {match.DeliveryOpportunityPersonId}
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching deliveries found.</p>
      )}

      {selectedDeliveryDetails && (
        <div className="delivery-detail">
          <h3>Delivery Details</h3>
          {/* Render the details of the selected delivery. Adjust based on your data structure */}
          {Object.entries(selectedDeliveryDetails).map(([key, value]) => (
            <p key={key}>{`${key}: ${value}`}</p>
          ))}
          <button onClick={() => setSelectedDeliveryDetails(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Deliveries;
