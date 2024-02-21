import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FindPersonId = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPersonId = async () => {
      const userEmail = localStorage.getItem('userEmail');
      const token = localStorage.getItem('token');

      if (!userEmail || !token) {
        setError('User email or token not found in local storage.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://api.webcrm.com/Persons/Search`, {
          params: { input: userEmail, Page: 1, Size: 50, include: ['SecurityInfo'] },
          headers: { 'Authorization': `Bearer ${token}`, 'accept': 'text/plain' },
        });

        const person = response.data.find(p => p.PersonEmail === userEmail);
        if (person) {
          localStorage.setItem('PersonId', person.PersonId.toString());
          localStorage.setItem('OrganisationId', person.PersonOrganisationId.toString());
        } else {
          setError('No matching person found.');
        }
      } catch (fetchError) {
        console.error('Error fetching person ID:', fetchError);
        setError('Failed to fetch person ID.');
      }

      setLoading(false);
    };

    fetchPersonId();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Person and Organisation IDs have been stored in local storage.</div>;
};

export default FindPersonId;
