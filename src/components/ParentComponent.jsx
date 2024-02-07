import React, { useState } from 'react';
import FindUserDetails from './FindUserDetails';
import OpportunitiesByOrganisation from './OpportunitiesByOrganisation';

const ParentComponent = () => {
    const [organisationId, setOrganisationId] = useState(null);
    const [personId, setPersonId] = useState(null);

    const handleUserFound = (userDetails) => {
        setPersonId(userDetails.PersonId);
        setOrganisationId(userDetails.PersonOrganisationId); // Save the OrganisationId from userDetails
    };

    return (
        <div>
            <FindUserDetails onUserFound={handleUserFound} />
            {organisationId && personId && (
                <OpportunitiesByOrganisation
                    organisationId={organisationId}
                    personId={personId}
                />
            )}
        </div>
    );
};

export default ParentComponent;
