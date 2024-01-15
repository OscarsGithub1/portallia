import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import CompanyList from './components/CompanyList'; // Assuming you have this component

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

  return (
    <Router>
      <div className="App">
        <Navbar onLogout={handleLogout} />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <PrivateRoute path="/home" component={Home} isAuthenticated={isLoggedIn} />
          <PrivateRoute path="/companies" component={CompanyList} isAuthenticated={isLoggedIn} />
          <Redirect from="/" exact to={isLoggedIn ? "/home" : "/login"} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
