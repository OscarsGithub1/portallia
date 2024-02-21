import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', // Assuming username is the email
    password: '',
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkEmailExists = async (email) => {
    let page = 1;
    const size = 50; // Adjust based on API's allowed maximum
    let found = false;

    const token = localStorage.getItem('token'); // Ensure the token is available
    if (!token) {
      console.error('No token found');
      return false;
    }

    while (!found) {
      try {
        const response = await axios.get(`https://api.webcrm.com/Persons?Page=${page}&Size=${size}&include=SecurityInfo`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'text/plain',
          },
        });

        const persons = response.data; // Assuming the response data is the list of persons
        const person = persons.find(p => p.PersonEmail === email);
        if (person) {
          found = true;
          // Optionally store the person data in the state or elsewhere if needed
        } else if (persons.length < size) {
          break; // Exit the loop if the last page has fewer items than the maximum size, indicating the end of data
        }

        page++; // Increment the page number for the next iteration
      } catch (error) {
        console.error('Error fetching persons:', error);
        break; // Exit the loop in case of an error
      }
    }

    return found;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailExists = await checkEmailExists(formData.username);
    if (!emailExists) {
      setError('Email does not match our records. Please try again.');
      return;
    }

    try {
      const endpoint = 'https://localhost:7042/api/Auth/register';
      await axios.post(endpoint, {
        username: formData.username,
        password: formData.password,
      });

      setFormData({ username: '', password: '' }); // Clear form data
      history.push('/home'); // Redirect to the home page or another page of your choice
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
