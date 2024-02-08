import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FindUserDetails = ({ onUserFound }) => {
    const [personDetails, setPersonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsersAndFindMatch = async () => {
            const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email from local storage
            const token = localStorage.getItem('token'); // Retrieve the token from local storage

            if (!userEmail || !token) {
                setError('User email not found in local storage or authentication token not found.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('https://api.webcrm.com/Persons', {
                    params: {
                        Page: 1,
                        Size: 50,
                        include: 'SecurityInfo'
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'text/plain',
                    }
                });

                const users = response.data; // Assuming the API returns an array of person objects
                const matchingUser = users.find(user => user.PersonEmail === userEmail); 

                if (matchingUser) {
                    setPersonDetails(matchingUser); // Store the matching user object in state
                    localStorage.setItem('OrganisationId', matchingUser.PersonOrganisationId.toString()); // Save OrganisationId to local storage
                    localStorage.setItem('PersonId', matchingUser.PersonId.toString()); // Save PersonId to local storage

                    if (onUserFound) onUserFound(matchingUser); // Trigger callback if provided
                } else {
                    setError('No matching user found.');
                }
            } catch (fetchError) {
                console.error('Error fetching users:', fetchError);
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsersAndFindMatch();
    }, [onUserFound]); // Dependency on onUserFound callback

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!personDetails) return <div>No user details available.</div>;

    return (
        <div>
            <h3>User Details</h3>
            <p><strong>ID:</strong> {personDetails?.PersonId}</p>
            <p><strong>Email:</strong> {personDetails?.PersonEmail}</p>
            <p><strong>Organisation ID:</strong> {personDetails?.PersonOrganisationId}</p>
            {/* Add more fields as necessary */}
        </div>
    );
};

export default FindUserDetails;
