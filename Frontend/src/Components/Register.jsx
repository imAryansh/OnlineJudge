import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import Header from './Header';
import Footer from './Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const history = useNavigate();
  const [message, setMessage] = useState('');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', formData);
      setMessage(response.data.message);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        history.push('/login');
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data); 
      } else {
        setMessage('Registration failed. Please try again.'); 
      }
      console.error('Signup failed', error);
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
      <Footer/>
    </div>
  );
};

export default Register;
