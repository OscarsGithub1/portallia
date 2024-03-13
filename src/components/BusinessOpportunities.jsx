import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateWorkTaskOpportunity from './CreateWorkTaskOpporunity'; // Make sure the path is correct
import backgroundImage from '../assets/images/shutterstock_451288924-1_grey.jpg'; // Adjust the path as necessary



function BusinessOpportunities() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    
   

    const opportunities = [
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },

        // Add more opportunities here...
    ];

    const opportunitiesPerPage = 10; // Maximum 10 items per page
    const pageCount = Math.ceil(opportunities.length / opportunitiesPerPage);
  
    const startIndex = (currentPage - 1) * opportunitiesPerPage;
    const visibleOpportunities = opportunities.slice(startIndex, startIndex + opportunitiesPerPage);

    const filteredOpportunities = visibleOpportunities.filter(opportunity => {
      const companyMatch = opportunity.company.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatch = opportunity.description.toLowerCase().includes(searchQuery.toLowerCase());
      const numberMatch = opportunity.number.toLowerCase().includes(searchQuery.toLowerCase());
      return companyMatch || descriptionMatch || numberMatch;
    });
    
    
  
    const handleChangePage = (event, page) => {
      setCurrentPage(page);
    };

    const handleSearchChange = (event) => {
      const query = event.target.value;
      console.log("Search Query:", query);
      setSearchQuery(query);
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

        </div>
      );
}    

export default BusinessOpportunities;
