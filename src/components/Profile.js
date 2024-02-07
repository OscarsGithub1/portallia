import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [personData, setPersonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found in localStorage.');
      setLoading(false);
      return;
    }

    axios
      .get('https://api.webcrm.com/Persons/Id', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'text/plain',
        },
      })
      .then((response) => {
        setPersonData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching person data:', error);
        setError('Error fetching person data.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading profile data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!personData) {
    return <p>Error loading profile data.</p>;
  }

  // Render the personData here

  return (
    // Render the profile data
    <h1>{personData.PersonName}</h1>
  );
};

export default Profile;
