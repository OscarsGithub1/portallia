
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        // Storing the token
        localStorage.setItem('token', response.data.token);
        // Storing the current timestamp when the token is received
        localStorage.setItem('tokenTimestamp', Date.now().toString());
  
        onLogin(response.data.token);
        history.push('/home'); // Redirect to the home page or another page of your choice
      } else {
        // Handle login failure (e.g., display an error message)
      }
    } catch (error) {
      // Handle errors (e.g., display an error message)
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;