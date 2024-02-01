const fetch = require('node-fetch');

// API-nyckel och authcode
const apiKey = 'DIN_API_NYCKEL';
const authCode = 'acf27487-be50-40e7-9ce8-f34b8a567889';

// Uppdateringsintervall i millisekunder (30 minuter)
const updateInterval = 30 * 60 * 1000;

// Funktion för att hämta nytt token och schemalägga uppdatering varje 30 minuter
async function updateAccessToken() {
  try {
    const response = await fetch(`https://api.webcrm.com/Auth/ApiLogin?authcode=${authCode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      const { AccessToken, ExpiresIn } = data;

      console.log('Ny AccessToken:', AccessToken);
      console.log('Uppdatera om 30 minuter');

      // Schemalägg nästa uppdatering om 30 minuter
      setTimeout(updateAccessToken, ExpiresIn * 1000 - 5 * 60 * 1000); // Uppdatera 5 minuter före token utgång
    } else {
      console.error('Fel vid uppdatering av AccessToken:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Fel vid uppdatering av AccessToken:', error.message);
  }
}

// Starta uppdatering av AccessToken
updateAccessToken();
