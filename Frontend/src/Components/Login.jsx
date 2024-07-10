import React, { useState } from 'react';
import api from './api';
import Header from './Header';
import { useNavigate,Link } from 'react-router-dom';
import Footer from './Footer';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', formData);
      setMessage(response.data.message);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/Problems');
      }
    } catch (error) {
      if (error.response.status === 401) {
        setMessage('Incorrect email or password');
      } else {
        setMessage('Login failed. Please try again.');
      }
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <Header content="Login"/>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input type="email" name="email" onChange={handleChange} value={formData.email} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" name="password" onChange={handleChange} value={formData.password} />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Don't have account? <Link to="/Register">Register here</Link>
      </p>
      <Footer/>
    </div>
  );
};

export default Login;

