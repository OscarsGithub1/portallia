import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/images/Meone_payoff_grey.png';

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
      const response = await axios.post('https://localhost:7042/api/Auth/login', formData);
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Storing the current timestamp when the token is received
        localStorage.setItem('tokenTimestamp', Date.now().toString());
  
        onLogin(response.data.token);
        history.push('/home');
      } else {
        // Handle login failure
      }
    } catch (error) {
      // Handle errors
    }
  };
  

  return (
    <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div className="login-container" style={{ backgroundColor: '#fff', border: '2px solid #ccc', borderRadius: '10px', padding: '50px', width: '380px', height: '450px' }}>
        <div className="login-logo" href="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={Logo} alt="Logo" style={{ textDecoration: 'none', maxHeight: '60px', marginBottom: '20px' }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group" >
            <label htmlFor="username">Email</label>
            <input style={{ border: '3px solid #ccc'}}
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input style={{ border: '3px solid #ccc'}}
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
            Logga in
          </button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Har du inget konto?</p>
          <button className="btn btn-link" onClick={handleCreateAccount}>Skapa konto</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
