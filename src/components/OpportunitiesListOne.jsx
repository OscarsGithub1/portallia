import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const OpportunitiesListOne = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const personId = localStorage.getItem('PersonId'); // Assuming 'PersonId' is stored in local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    let page = 1;
    const size = 50; // Adjust size as needed
    let hasMore = true;

    const fetchOpportunities = async () => {
      while (hasMore) {
        try {
          const response = await axios.get(`https://api.webcrm.com/Opportunities/ByPipelineLevel/14`, {
            params: { Page: page, Size: size, include: 'SecurityInfo' },
            headers: { 'Authorization': `Bearer ${token}` },
          });
    
          // Filter the data for opportunities that match the personId
          const data = response.data.filter(opportunity => opportunity.OpportunityPersonId.toString() === personId);
    
          // Update the opportunities state if there are any matches
          if (data.length > 0) {
            setOpportunities(opps => [...opps, ...data]);
          }
    
          // Check if the entire response data has any more opportunities, if not, set hasMore to false
          if (response.data.length < size) {
            hasMore = false;
          } else {
            page++;
          }
        } catch (err) {
          console.error('Error fetching opportunities:', err);
          setError('Failed to fetch opportunities');
          hasMore = false;
        }
      }
      setLoading(false);
    };

    fetchOpportunities();
  }, [personId, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opportunity) => {
            // Log each opportunity object
            console.log(opportunity);

            return (
              <tr key={opportunity.OpportunityId}>
                <td>{opportunity.OpportunityId}</td>
                <td>{opportunity.OpportunityDescription}</td>
                {/* Render more data as needed */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OpportunitiesListOne;
