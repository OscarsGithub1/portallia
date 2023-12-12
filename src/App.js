
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from './components/Navbar.jsx';
import Login from './components/Login';
import Register from './components/Register';
import Example from './components/example';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';



function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/Register">
          
        <Register/>
        </Route >
        <Route path="/login">
        <Login/>
        </Route>
      </Switch>
      
     
    </div>
    </Router>
  );
}

export default App;
