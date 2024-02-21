import React, { useState } from 'react';
import FindUserDetails from './FindUserDetails';
import OpportunitiesByOrganisation from './OpportunitiesByOrganisation'; // Import the correct component

const Document = () => {
  const [cvFile, setCvFile] = useState(null);
  const [pbFile, setPbFile] = useState(null);
  const [otFile, setOtFile] = useState(null);
  const [organisationId, setOrganisationId] = useState(null);
  const [personId, setPersonId] = useState(null); // Add state to store the personId

  // Your existing file handling code...

  const handleUserFound = (userDetails) => {
    setOrganisationId(userDetails.PersonOrganisationId);
    setPersonId(userDetails.PersonId); // Update the personId state when a user is found
  };

  return (
    <div className='fileupload-container'>
      <h4>Ladda upp dokument</h4>
      {/* Your existing file upload UI... */}
      <FindUserDetails onUserFound={handleUserFound} /> 
      {/* Render OpportunitiesByOrganisation with both organisationId and personId */}
      {organisationId && personId && (
        <OpportunitiesByOrganisation organisationId={organisationId} personId={personId} />
      )}
    </div>
  );
};

export default Document;
