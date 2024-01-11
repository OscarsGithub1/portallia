import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import CompanyList from './components/CompanyList'; // Import the CompanyList component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <PrivateRoute path="/home" component={Home} isAuthenticated={isLoggedIn} />
          
          {/* Add a new route for the CompanyList component */}
          <PrivateRoute path="/companies" component={CompanyList} isAuthenticated={isLoggedIn} />
          
          {/* Redirect from "/" exact to "/home" or "/login" based on user's login status */}
          <Redirect from="/" exact to={isLoggedIn ? "/home" : "/login"} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
