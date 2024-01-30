// authUtils.js
export function isTokenValid() {
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    if (!tokenTimestamp) return false;
  
    const now = Date.now();
    const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    return now - parseInt(tokenTimestamp) < thirtyMinutes;
  }
  