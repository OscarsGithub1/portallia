import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/images/Meone_payoff_grey.png';
import EmailChecker from './EmailChecker';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post('https://localhost:7042/api/Auth/login', formData);
      if (loginResponse.status === 200 && loginResponse.data.token) {
        const { token } = loginResponse.data; // Destructure the token from the response for easier access
        
        localStorage.setItem('token', token);
        localStorage.setItem('tokenTimestamp', Date.now().toString());
        localStorage.setItem('userEmail', formData.username); // Storing the userEmail right after login
  
        // Use the token to authorize the request for fetching the PersonId
        try {
          const personResponse = await axios.get('https://api.webcrm.com/Persons/Search', {
            params: { input: formData.username, Page: 1, Size: 50, include: ['SecurityInfo'] },
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'text/plain', // Ensure the accept header is set as specified
            },
          });
  
          const person = personResponse.data.find(p => p.PersonEmail === formData.username);
          if (person) {
            localStorage.setItem('PersonId', person.PersonId.toString());
          } else {
            console.error('No matching person found for the given email.');
          }
        } catch (error) {
          console.error('Error fetching person ID:', error);
        }
  
        onLogin(token);
        history.push('/home'); // Navigate to home after all operations are successful
      } else {
        console.error('Login failed with status:', loginResponse.status);
      }
    } catch (error) {
      
    }

  };
  const handleCreateAccount = () => {
    // Redirect to create account page or perform any action you need
    // For example:
    history.push('/register');
  };
  

  return (
    <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div className="login-container" style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '50px', width: '400px', height: '450px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)' }}>
        <div className="login-logo" href="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={Logo} alt="Logo" style={{ textDecoration: 'none', maxHeight: '60px', marginBottom: '20px' }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: '10px' }} className="form-group" >
            <label htmlFor="username">Email</label>
            <input style={{ border: '3px solid rgba(0, 0, 0, 0.5)' }}
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ marginTop: '10px' }} htmlFor="password">Lösenord</label>
            <input style={{ border: '3px solid rgba(0, 0, 0, 0.5)' }}
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '20px' }}>
            Logga in
          </button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center', fontStretch: 'rem'}}>
          <p>Har du inget konto?</p>
          <button className="btn btn-link" onClick={handleCreateAccount}>Skapa konto</button>
        </div>
      </div>
      

    </div>
  );
};

export default Login; 
