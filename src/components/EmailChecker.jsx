import React, { useState } from 'react';
import axios from 'axios';

const EmailChecker = () => {
  const [email, setEmail] = useState('');
  const [personData, setPersonData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token not found in local storage.');
      return;
    }

    try {
      const response = await axios.get(`https://api.webcrm.com/Persons/Search`, {
        params: { input: email, Page: 1, Size: 50, include: ['SecurityInfo'] },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'text/plain',
        },
      });

      const person = response.data.find(p => p.PersonEmail === email);
      if (person) {
        setPersonData(person);
        setError('');

        // Store the required fields in localStorage
        localStorage.setItem('PersonId', person.PersonId.toString());
        localStorage.setItem('PersonEmail', person.PersonEmail);
        localStorage.setItem('OrganisationId', person.PersonOrganisationId.toString());
      } else {
        setError('No matching person found.');
        setPersonData(null);
      }
    } catch (error) {
      console.error('Error fetching person:', error);
      setError('Failed to fetch person.');
      setPersonData(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleInputChange} />
        </label>
        <button type="submit">Check Email</button>
      </form>
      {error && <div>Error: {error}</div>}
      {personData && (
        <div>
          <p>Person ID: {personData.PersonId}</p>
          <p>Email: {personData.PersonEmail}</p>
          <p>OrganisationId: {personData.PersonOrganisationId}</p>
        </div>
      )}
    </div>
  );
};

export default EmailChecker;
