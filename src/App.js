
import './App.css';
import './Footer.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from './components/Navbar.jsx';
import Login from './components/Login';
import Register from './components/Register';
import Example from './components/example';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import UserList from './components/Userlist.jsx';
import NewWorkTaskCard from './components/worktask.jsx';
import Footer from './components/Footer.jsx';




function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/Register">
          <NewWorkTaskCard/>
        <UserList/> 
        <Register/>
        

        </Route >
        <Route path="/login">
        <Login/>
        </Route>
        
      </Switch>
      
    </div>
      <Footer/>
    </Router>

  );
}

export default App;
