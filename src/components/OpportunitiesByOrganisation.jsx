import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpportunitiesByOrganisation = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [personId, setPersonId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const organisationId = localStorage.getItem('OrganisationId');
        const storedPersonId = localStorage.getItem('PersonId');

        setPersonId(storedPersonId);

        if (!organisationId || !storedPersonId || !token) {
            setError('Required information not found. Please ensure you are logged in and try again.');
            setLoading(false);
            return;
        }

        const fetchAndFilterOpportunities = async () => {
            try {
                const response = await axios.get(`https://api.webcrm.com/Opportunities/ByOrganisation/${organisationId}`, {
                    params: {
                        Page: 1,
                        Size: 50,
                        include: 'SecurityInfo',
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                });

                const fetchedOpportunities = response.data;
                console.log('Fetched Opportunities:', fetchedOpportunities);

                const relevantOpportunities = fetchedOpportunities.filter(opportunity => {
                    console.log(`Comparing: ${opportunity.OpportunityPersonId} to ${storedPersonId}`);
                    return opportunity.OpportunityPersonId === storedPersonId;
                });

                console.log('Filtered Opportunities:', relevantOpportunities);
                setOpportunities(relevantOpportunities);
            } catch (fetchError) {
                console.error('Error fetching opportunities:', fetchError);
                setError('Failed to fetch opportunities.');
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilterOpportunities();
    }, []);

    if (loading) return <div>Loading opportunities...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h3>Relevant Opportunities for Person ID: {personId}</h3>
            {opportunities.length > 0 ? (
                <ul>
                    {opportunities.map((opportunity, index) => (
                        <li key={index}>
                            <p>Opportunity ID: {opportunity.OpportunityId}</p>
                            <p>Description: {opportunity.OpportunityDescription}</p>
                            {/* More details can be added here */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No matching opportunities found for this person.</p>
            )}
        </div>
    );
};

export default OpportunitiesByOrganisation;
