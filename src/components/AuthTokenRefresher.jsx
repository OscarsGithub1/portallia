import React, { useEffect } from 'react';
import axios from 'axios';

const AuthTokenRefresher = () => {
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post('https://api.webcrm.com/Auth/ApiLogin', 'authcode=acf27487-be50-40e7-9ce8-f34b8a567889', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        if (response.data && response.data.AccessToken) {
          localStorage.setItem('token', response.data.AccessToken); // Store the new token
          console.log('New Token:', response.data.AccessToken); // Log the new token to the console
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken(); // Fetch token on component mount
    const interval = setInterval(fetchToken, 30 * 60 * 1000); // Refresh token every 30 minutes

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return null; // This component doesn't need to render anything
};

export default AuthTokenRefresher;
