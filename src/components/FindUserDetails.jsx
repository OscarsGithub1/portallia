import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FindUserDetails = ({ onUserFound }) => {
    const [personDetails, setPersonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsersAndFindMatch = async () => {
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
                    setPersonDetails(person);
                    localStorage.setItem('PersonId', person.PersonId.toString());
                    localStorage.setItem('OrganisationId', person.PersonOrganisationId.toString());

                    if (onUserFound) onUserFound(person);
                } else {
                    setError('No matching user found.');
                }
            } catch (fetchError) {
                console.error('Error fetching user details:', fetchError);
                setError('Failed to fetch user details.');
            }

            setLoading(false);
        };

        fetchUsersAndFindMatch();
    }, [onUserFound]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!personDetails) return <div>No user details available.</div>;

    return (
        <div>
            <h3>User Details</h3>
            <p><strong>ID:</strong> {personDetails.PersonId}</p>
            <p><strong>Email:</strong> {personDetails.PersonEmail}</p>
            <p><strong>Organisation ID:</strong> {personDetails.PersonOrganisationId}</p>
            {/* Add more fields as necessary */}
        </div>
    );
};

export default FindUserDetails;
