import React, { useState } from 'react';
import FindUserDetails from './FindUserDetails';
import OpportunitiesByOrganisation from './OpportunitiesByOrganisation'; // Ensure this component is correctly imported

const Document = () => {
  // Initialize state variables for organisationId and personId
  const [organisationId, setOrganisationId] = useState(null);
  const [personId, setPersonId] = useState(null);

  // Define the handleUserFound callback function
  const handleUserFound = (userDetails) => {
    setOrganisationId(userDetails.PersonOrganisationId);
    setPersonId(userDetails.PersonId); // Update the personId state when a user is found
  };

  return (
    <div className='fileupload-container'>
      <h4>Ladda upp dokument</h4>
      {/* Pass handleUserFound to FindUserDetails as a prop */}
      <FindUserDetails onUserFound={handleUserFound} /> 
      {/* Conditionally render OpportunitiesByOrganisation when both organisationId and personId are set */}
      {organisationId && personId && (
        <OpportunitiesByOrganisation organisationId={organisationId} personId={personId} />
      )}
    </div>
  );
};

export default Document;



/*
import React from 'react'

function Document() {
  return (
    <div>Document</div>
  )
}

export default Document
*/