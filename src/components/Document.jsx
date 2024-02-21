/*
import React, { useState } from 'react';
import FindUserDetails from './FindUserDetails';
import OpportunitiesByOrganisation from './OpportunitiesByOrganisation'; // Import the correct component

const Document = () => {


  const handleUserFound = (userDetails) => {
    setOrganisationId(userDetails.PersonOrganisationId);
    setPersonId(userDetails.PersonId); // Update the personId state when a user is found
  };

  return (
    <div className='fileupload-container'>
      <h4>Ladda upp dokument</h4>
      <FindUserDetails onUserFound={handleUserFound} /> 
      {organisationId && personId && (
        <OpportunitiesByOrganisation organisationId={organisationId} personId={personId} />
      )}
    </div>
  );
};

export default Document;

*/

import React from 'react'

function Document() {
  return (
    <div>Document</div>
  )
}

export default Document