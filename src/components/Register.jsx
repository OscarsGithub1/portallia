import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', // Assuming username is the email
    password: '',
  });
  const [error, setError] = useState('');
  const [personData, setPersonData] = useState(null); // State to store the person's data
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchPersons = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      console.error('No token found');
      return [];
    }

    try {
      const response = await axios.get('https://api.webcrm.com/Persons?Page=1&Size=50&include=SecurityInfo', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'text/plain',
        },
      });
      return response.data; // Assuming the response data is the list of persons
    } catch (error) {
      console.error('Error fetching persons:', error);
      return [];
    }
  };

  const checkEmailExists = async (email) => {
    const persons = await fetchPersons();
    const person = persons.find(p => p.PersonEmail === email);
    if (person) {
      setPersonData(person); // Update the state with the found person's data
      return true;
    }
    return false; // Return false if no person is found
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailExists = await checkEmailExists(formData.username);
    if (!emailExists) {
      setError('Email does not match our records. Please try again.');
      return;
    }

    try {
      const endpoint = 'https://localhost:7042/api/Auth/register'; // Replace with your actual registration endpoint
      await axios.post(endpoint, {
        username: formData.username,
        password: formData.password,
      });

      setFormData({ username: '', password: '' }); // Clear form data

      // Redirect to home and pass personData as state
      history.push({
        pathname: '/home',
        state: { personData: personData }
      });
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError(error.response?.data || 'An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Register</h2>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username (Email)</label>
            <input
              type="email"
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
