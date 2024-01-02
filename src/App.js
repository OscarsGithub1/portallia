import React from 'react';
import './App.css';
import './Footer.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login';
import Register from './components/Register';
// Import the Home component if it exists
import Home from './components/Home';
// Import other components as needed
import UserList from './components/Userlist.jsx';
import NewWorkTaskCard from './components/worktask.jsx';
import MyFooter from './components/Footer.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/register">
            <NewWorkTaskCard />
            <UserList /> 
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          {/* Add other routes as needed */}
        </Switch>
      <MyFooter/>
      </div>
      
    </Router>
  );
}

export default App;
