import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserOrganisations = () => {
  const userId = 19; // Hardcoded userId
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrganisations = async (page = 1, pageSize = 50) => {
      try {
        const response = await axios.get(`https://api.webcrm.com/Organisations`, {
          params: { Page: page, Size: pageSize },
          headers: { 'Authorization': `Bearer ${token}`, 'accept': 'text/plain' },
        });

        // Filter organisations where the OrganisationOwner matches the userId
        const matchedOrganisations = response.data.filter(org => org.OrganisationOwner === userId);

        if (matchedOrganisations.length > 0) {
          setOrganisations(prev => [...prev, ...matchedOrganisations]);
        }

        // If the fetched page is full, there might be more pages to fetch
        if (response.data.length === pageSize) {
          fetchOrganisations(page + 1, pageSize); // Fetch the next page recursively
        } else {
          setLoading(false); // No more pages to fetch
        }
      } catch (error) {
        console.error('Failed to fetch organisations:', error);
        setError('Failed to load organisations.');
        setLoading(false);
      }
    };

    if (token) { // Only proceed if a token is found
      fetchOrganisations();
    } else {
      setError('Authentication token not found.');
      setLoading(false);
    }
  }, [token]); // useEffect dependency array includes token

  if (loading) return <div>Loading organisations...</div>;
  if (error) return <div>Error: {error}</div>;
  if (organisations.length === 0 && !loading) return <div>No matching organisations found.</div>;

  return (
    <div>
      <h3>Matching Organisations</h3>
      <ul>
        {organisations.map((org, index) => (
          <li key={index}>
            Organisation ID: {org.OrganisationId}, Name: {org.OrganisationName}
            {/* Display more organisation details here if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrganisations;
