// UserList.js

import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://api.webcrm.com/Users?Page=1&Size=50';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer TonIDGwYeNO2T1f1TTFOUPKrDEnSyc_iuwVSITlF-fM',
        'Accept': 'application/json', // Adjust the Accept header
      },
    })
      .then(response => response.json())
      .then(data => {
        // Assuming the API returns an array of users in the data field
        setUserList(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures that the effect runs once on mount

  return (
    <div>
      <h2>User List</h2>
      {userList.length > 0 ? (
        <ul>
          {userList.map((user, index) => (
            <li key={index}>
              <strong>UserTitle:</strong> {user.UserTitle}, <strong>UserAccessId:</strong> {user.UserAccessId}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserList;
