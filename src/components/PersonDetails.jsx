import React from 'react';

const PersonDetails = ({ person }) => {
  if (!person) {
    return <div>No person data available.</div>;
  }

  return (
    <div>
      <h3>Person Details</h3>
      <p><strong>ID:</strong> {person.PersonId}</p>
      <p><strong>Email:</strong> {person.PersonEmail}</p>
      <p><strong>Organisation ID:</strong> {person.PersonOrganisationId}</p>
    </div>
  );
};

export default PersonDetails;
