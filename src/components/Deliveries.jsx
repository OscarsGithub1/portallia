import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Deliveries = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDeliveryDetails, setSelectedDeliveryDetails] = useState(null);

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
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`https://api.webcrm.com/Deliveries/${deliveryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'text/plain',
        },
      });

      setSelectedDeliveryDetails(response.data);
    } catch (fetchError) {
      console.error('Error fetching delivery details:', fetchError);
      setError('Failed to fetch delivery details.');
    }
  };

  const fields = [
    'DeliveryOpportunityDescription',
    'DeliverySearch2',
    'DeliveryOpportunityCustom1',
    'DeliveryOpportunityCustom2',
    'DeliveryOpportunityCustom4',
    'DeliveryOpportunityCustom6',
    'DeliveryOpportunityCustom7',
    'DeliveryOpportunityCustom8',
    'DeliveryOpportunityCustom9',
    'DeliveryOpportunityCustom11',
    'DeliveryOpportunityCustom14',
    'DeliveryOpportunityCustom15',
    'DeliveryPlus1',
    'DeliveryPlus8'
  ];

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
          {fields.map(field => (
            <div key={field} className="mb-3">
              <label className="form-label">{field}</label>
              <input type="text" readOnly className="form-control" value={selectedDeliveryDetails[field] || 'N/A'} />
            </div>
          ))}
          <button onClick={() => setSelectedDeliveryDetails(null)} className="btn btn-secondary">Close</button>
        </div>
      )}
    </div>
  );
};

export default Deliveries;
