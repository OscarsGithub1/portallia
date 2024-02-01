import React from 'react';
import { Navbar } from 'react-bootstrap';
import OngoingTasks from './Cards/OngoingTasks';
import CustomerList1 from './customers';
import UserWorkTaskStats from './UserWorkTaskStats';
import CompanyList from './CompanyList';
import OpportunityList from './OpportunityList'; // Kontrollera sökvägen här


// Import your image with a relative path
import backgroundImage from '../assets/images/dock-1846008_1920.jpg';
import LogoutButton from './Logout';
import BussOppCMS from './BussOppCMS';

const backgroundImageStyle = {
  backgroundImage: `url(${backgroundImage})`, // Set the background image using the imported path
  backgroundSize: 'cover', // Adjust background size to cover the container
  backgroundRepeat: 'no-repeat', // Prevent background image from repeating
  backgroundAttachment: 'fixed', // Fix the background in place
  minHeight: '100vh', // Set a minimum height to cover the entire viewport
};

function Home() {
  return (
    <div>
      <div style={backgroundImageStyle} className="bg-img">
        {/* Your code components */}
        <Navbar bg="light" expand="lg">
          {/* Navbar content */}
        </Navbar>
        <UserWorkTaskStats />
        <h1 className="text-center mt-4">HomePage</h1>
        <CustomerList1 />
        <OngoingTasks />
        <CompanyList />
        <OpportunityList/>

        <LogoutButton/>
        <BussOppCMS/>
        {/* Add any other code components as needed */}
      </div>
    </div>
  );
}

export default Home;
