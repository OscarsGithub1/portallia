import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import OngoingTasks from './Cards/OngoingTasks';
import CustomerList1 from './customers';
import UserWorkTaskStats from './UserWorkTaskStats';
import CompanyList from './CompanyList';
import OpportunityList from './OpportunityList';
import LogoutButton from './Logout';
import BussOppCMS from './BussOppCMS';
import backgroundImage from '../assets/images/dock-1846008_1920.jpg';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import FindPersonId from './FindPersonId';
import OpportunityForm from './OpportunityForm';

const backgroundImageStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
};

function Home() {
  const location = useLocation();
  const personData = location.state?.personData;

  return (
    <div style={backgroundImageStyle} className="bg-img">
      <Navbar bg="light" expand="lg">
        {/* Navbar content */}
      </Navbar>

      {personData && (
        <div className="container mt-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Person Details</h5>
              <p className="card-text"><strong>ID:</strong> {personData.PersonId}</p>
              <p className="card-text"><strong>Email:</strong> {personData.PersonEmail}</p>
              <p className="card-text"><strong>Organisation ID:</strong> {personData.PersonOrganisationId}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <UserWorkTaskStats />
        <h1 className="text-center mt-4">HomePage</h1>
        <CustomerList1 />
        <OngoingTasks />
        <CompanyList />
        <OpportunityList />
        <LogoutButton />
        <BussOppCMS />
        <FindPersonId/>
        <OpportunityForm/>
      </div>
    </div>
  );
}

export default Home;
