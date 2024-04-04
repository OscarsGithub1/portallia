import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/images/Meone_payoff_grey.png';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const handleLoginAccount = () => {
    // Redirect to create account page or perform any action you need
    // For example:
    history.push('/login');
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
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      setFormData({ firstName: '', lastName: '', username: '', password: '' }); // Clear form data
      history.push('/home'); // Redirect to the home page or another page of your choice
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError(error.response?.data || 'An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="register-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <div className="register-container" style={{ backgroundColor: '#ffffff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)', borderRadius: '28px', padding: '50px', width: '450px', height: '530px' }} >
        <div className="login-logo" href="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={Logo} alt="Logo" style={{ textDecoration: 'none', maxHeight: '60px', marginBottom: '20px' }} />
        </div>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: '10px' }} className="form-group row">
            <div className="col">
              <label htmlFor="firstName">Förnamn</label>
              <input style={{ border: '3px solid rgba(0, 0, 0, 0.5)'}}
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="lastName">Efternamn</label>
              <input style={{ border: '3px solid rgba(0, 0, 0, 0.5)'}}
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label style={{ marginTop: '10px' }} htmlFor="username">Email</label>
            <input style={{ border: '3px solid rgba(0, 0, 0, 0.5)'}}
              type="email"
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
            <input style={{ border: '3px solid rgba(0, 0, 0, 0.5)'}}
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button style={{ width: '100%', marginTop: '20px' }} type="submit" className="btn btn-dark">Registera</button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Har du redan ett konto?</p>
          <button className="btn btn-link" onClick={handleLoginAccount}>Logga in</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
