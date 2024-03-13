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
      const endpoint = 'https://localhost:7042/api/Auth/register'; // Replace with your actual registration endpoint
      await axios.post(endpoint, {
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      setFormData({ firstName: '', lastName: '', username: '', password: '' }); // Clear form data

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
    <div className="register-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
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
