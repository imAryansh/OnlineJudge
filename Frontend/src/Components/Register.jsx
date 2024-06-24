import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', formData);
      setMessage(response.data.message);
      // Optionally, you can redirect the user to login after successful registration
      // history.push('/login');
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <Header content="Register"/>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Firstname: </label>
          <input type="text" name="firstname" onChange={handleChange} value={formData.firstname} />
        </div>
        <div>
          <label>Lastname: </label>
          <input type="text" name="lastname" onChange={handleChange} value={formData.lastname} />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" onChange={handleChange} value={formData.email} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" name="password" onChange={handleChange} value={formData.password} />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
