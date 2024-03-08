import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateWorkTaskOpportunity from './CreateWorkTaskOpporunity'; // Make sure the path is correct
import backgroundImage from '../assets/images/shutterstock_451288924-1_grey.jpg'; // Adjust the path as necessary
import UserOrganisations from './UserOrganisations';



function BusinessOpportunities() {
    const [workTaskOpportunities, setWorkTaskOpportunities] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const endpoint = `https://localhost:7042/worktaskopportunity/${userId}`;

        axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setWorkTaskOpportunities(response.data);
        })
        .catch(error => {
            console.error('Error fetching WorkTaskOpportunities:', error);
        });
    }, []);

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
    };

    return (
      
        <div style={backgroundStyle}> {/* Use backgroundStyle here */}

            <div className="container mt-4">
            <h2 className="mb-3">Your Work Task Opportunities</h2>
            
            {workTaskOpportunities.length ? (
              
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Company</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date</th>
                            <th scope="col">Value</th>
                            <th scope="col">Is Closed</th>
                            <th scope="col">Pipeline Level</th>
                            <th scope="col">Sales Responsible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workTaskOpportunities.map(opportunity => (
                            <tr key={opportunity.id}>
                                <th scope="row">{opportunity.id}</th>
                                <td>{opportunity.company}</td>
                                <td>{opportunity.description}</td>
                                <td>{new Date(opportunity.opportunityDate).toLocaleDateString()}</td>
                                <td>{opportunity.opportunityValue}</td>
                                <td>{opportunity.isClosed ? 'Yes' : 'No'}</td>
                                <td>{opportunity.pipelineLevel}</td>
                                <td>{opportunity.salesResponsible}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No Work Task Opportunities available.</p>
            )}
    <CreateWorkTaskOpportunity/>
   <UserOrganisations/>


        </div>
    </div>
        
    );
}

export default BusinessOpportunities;
