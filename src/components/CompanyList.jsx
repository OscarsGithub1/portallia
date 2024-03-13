import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OpportunitiesListOne from './OpportunitiesListOne';
  

// Import your image with a relative path
import backgroundImage from '../assets/images/dollarphotoclub_61705309.jpg';

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
};

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://localhost:7042/api/Companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={backgroundStyle}>
      <div className="container mt-4">
        <h2>Company List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Type</th>
              <th>Responsible</th>
              <th>Postal City</th>
              <th>Organization Number</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.status}</td>
                <td>{company.type}</td>
                <td>{company.responsible}</td>
                <td>{company.postalCity}</td>
                <td>{company.organizationNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <OpportunitiesListOne/>
    </div>
 
  );
};

export default CompanyList;
