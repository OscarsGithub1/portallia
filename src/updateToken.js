import fetch from 'node-fetch';

// Your code to make the API request and handle the response
const authcode = 'acf27487-be50-40e7-9ce8-f34b8a567889';
const apiUrl = `https://api.webcrm.com/Auth/ApiLogin?authcode=${authcode}`;

fetch(apiUrl, {
  method: 'POST',
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the API response here
    console.log('API Response:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
