import React, { useState } from 'react';
<<<<<<< HEAD
import FindUserDetails from './FindUserDetails';
import OpportunitiesByOrganisation from './OpportunitiesByOrganisation'; // Import the correct component
=======
>>>>>>> 26426b59bb1ba78bbad4584f0dade301a2f1a4b8

const Document = () => {
  const [cvFile, setCvFile] = useState(null);
  const [pbFile, setPbFile] = useState(null);
  const [otFile, setOtFile] = useState(null);
<<<<<<< HEAD
  const [organisationId, setOrganisationId] = useState(null);
  const [personId, setPersonId] = useState(null); // Add state to store the personId
=======
>>>>>>> 26426b59bb1ba78bbad4584f0dade301a2f1a4b8

  const handleCvFileChange = (event) => {
    setCvFile(event.target.files[0]);
  };

<<<<<<< HEAD
  const handleUserFound = (userDetails) => {
    setOrganisationId(userDetails.PersonOrganisationId);
    setPersonId(userDetails.PersonId); // Update the personId state when a user is found
=======
  const handlePbFileChange = (event) => {
    setPbFile(event.target.files[0]);
  };

  const handleOtFileChange = (event) => {
    setOtFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('cvFile', cvFile);
    formData.append('pbFile', pbFile);
    formData.append('otFile', otFile);

    try {
      const response = await fetch('YOUR_BACKEND_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      // Handle the response as needed
      console.log('File uploaded successfully', response);
    } catch (error) {
      console.error('Error uploading files', error);
    }
>>>>>>> 26426b59bb1ba78bbad4584f0dade301a2f1a4b8
  };

  return (
    <div className='fileupload-container'>
      <h4>Ladda upp dokument</h4>
<<<<<<< HEAD
      {/* Your existing file upload UI... */}
      <FindUserDetails onUserFound={handleUserFound} /> 
      {/* Render OpportunitiesByOrganisation with both organisationId and personId */}
      {organisationId && personId && (
        <OpportunitiesByOrganisation organisationId={organisationId} personId={personId} />
      )}
=======
      <div className='file-input'>
        <label className='cv-label'>
          <h5 className='cv-file'>
            CV:
          </h5>
          <input className='cv' type="file" onChange={handleCvFileChange} />
        </label>
        <label className='pb-label'>
          <h5 className='pb-file'>
            Personligt Brev:
          </h5>
          <input className='pb' type="file" onChange={handlePbFileChange} />
        </label>
        <label className='ot-label'>
          <h5 className='ot-file'>
            Övriga Filer:
          </h5>
          <input className='ot' type="file" onChange={handleOtFileChange} />
        </label>
      </div>
      <br />
      <button onClick={handleUpload}>Ladda upp</button>
>>>>>>> 26426b59bb1ba78bbad4584f0dade301a2f1a4b8
    </div>
  );
};

export default Document;
