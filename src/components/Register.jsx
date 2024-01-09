import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; // Import axios
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
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
      // API endpoint for registration
      const endpoint = 'https://localhost:7042/api/Auth/register';

      // Make a POST request to the register endpoint
      await axios.post(endpoint, {
        username: formData.username,
        password: formData.password,
      });

      // On successful registration, clear form and redirect to home page
      setFormData({ username: '', password: '' });
      history.push('/home');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      // Handle errors here (e.g., show an error message to the user)
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
