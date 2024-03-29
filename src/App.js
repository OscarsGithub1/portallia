import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import CompanyList from './components/CompanyList'; // Assuming you have this component
import BusinessOpportunities from './components/BusinessOpportunities'; // Import the BusinessOpportunities component
import CustomerList1 from './components/customers.jsx';
import Document from './components/Document.jsx';
import Deals from './components/Deals.jsx';
import AuthTokenRefresher from './components/AuthTokenRefresher'; // Adjust the path as necessary
import AvtalApi from './components/AvtalApi.jsx';
import SeeSpecifikOpportunity from './components/SeeSpecifikOpportunity.jsx';
import ProfileInformation from './components/ProfileInformation.jsx';
import DealsDetailed from './components/DealsDetailed.jsx';
import AddOpportunity from './components/AddOpportunity.jsx'; 
import BusinessDetailed from './components/BusinessDetailed.jsx';
import Deliveries from './components/Deliveries.jsx';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  // Assuming you have some user state
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // Other user information
  });
  

  return (
    <Router>
      <div className="App">
        <Navbar onLogout={handleLogout} />
        <AuthTokenRefresher /> {/* This will start the token refresh process */}

        <Switch>
          <Route path="/deliveries">
            <Deliveries />
          </Route>
          <Route path="/addopportunity">
            <AddOpportunity/>
          </Route>
          <Route path="/dealsdetailed">
            <DealsDetailed />
          </Route>
          <Route path="/businessdetailed">
            <BusinessDetailed />
          </Route>
          <Route path="/document">
            <Document />
          </Route>
          <Route path="/AvtalApi">
            <AvtalApi/>
          </Route>
          <Route path="/SeeSpecifikOpportunity">
            <SeeSpecifikOpportunity/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <ProfileInformation user={user} />
          </Route>
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/home" component={Home} isAuthenticated={isLoggedIn} />
          <PrivateRoute path="/companies" component={CompanyList} isAuthenticated={isLoggedIn} />
          <Route path="/business-opportunities" component={BusinessOpportunities} isAuthenticated={isLoggedIn} />
          <PrivateRoute path="/Customers" component={CustomerList1  } isAuthenticated={isLoggedIn} />
          <Route path="/deals" component={Deals} isAuthenticated={isLoggedIn} />





          <Redirect from="/" exact to={isLoggedIn ? "/home" : "/"} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
