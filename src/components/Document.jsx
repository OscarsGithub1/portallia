import React, { useState } from 'react';
import FindUserDetails from './FindUserDetails';
import OpportunitiesByOrganisation from './OpportunitiesByOrganisation';

const Document = () => {
  const [cvFile, setCvFile] = useState(null);
  const [pbFile, setPbFile] = useState(null);
  const [otFile, setOtFile] = useState(null);
  const [organisationId, setOrganisationId] = useState(null); // State to store the organisationId

  // Your existing file handling code...

  const handleUserFound = (userDetails) => {
    setOrganisationId(userDetails.PersonOrganisationId); // Update the organisationId state when a user is found
  };

  return (
    <div className='fileupload-container'>
      <h4>Ladda upp dokument</h4>
      {/* Your existing file upload UI... */}
      <FindUserDetails onUserFound={handleUserFound} />
      {organisationId && <OpportunitiesByOrganisation organisationId={organisationId} />}
    </div>
  );
};

export default Document;
