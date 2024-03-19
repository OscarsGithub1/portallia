import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import Deals from './Deals.jsx';
import BusinessOpportunities from './BusinessOpportunities';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import FindPersonId from './FindPersonId.jsx'


function Home() {
  return (
   
    <div className="container-fluid mt-5">
       <FindPersonId/>
      <div className="d-flex align-items-center mb-5">
        <GradeOutlinedIcon fontSize="large" style={{ marginRight: '8px' }} />
        <h2>meOne Konsultförmedling AB</h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 mb-4">
          <div style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '12px', backgroundColor: 'white' }}>
            <Deals />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '12px', backgroundColor: 'white' }}>
            <BusinessOpportunities />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
