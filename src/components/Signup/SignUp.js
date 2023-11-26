import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({}); // State to store validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // No validation errors, proceed with submission
      const response = await axios.post('http://127.0.0.1:8085/adding', formData);
      console.log(response.data);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      alert('Registration successful. Please login to your account using your ID in the console');
      // navigate('/cart/${response.data.transaction_id}');
    } else {
      // Validation errors found, update the errors state
      setErrors(validationErrors);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className='nn'>
      <h1 className='nnn'> Sign Up</h1>
      <label className='nnnn'>First Name </label>
      <input name='firstName' onChange={handleChange} type='text' />
      {errors.firstName && <div className="error">{errors.firstName}</div>}
      <br></br>
      <label>Last Name </label>
      <input name='lastName' onChange={handleChange} type='text' />
      {errors.lastName && <div className="error">{errors.lastName}</div>}
      <br></br>
      <label>Email </label>
      <input name='email' onChange={handleChange} type='text' />
      {errors.email && <div className="error">{errors.email}</div>}
      <br></br>
      <label>Password </label>
      <input name='password' onChange={handleChange} type='text' />
      {errors.password && <div className="error">{errors.password}</div>}
      <br></br>
      <button className='n' onClick={handleSubmit}>Sign Up</button>
      <br></br>
      <label><h4>Already a user?</h4></label>
      <button className='n' onClick={handleLogin}>Login</button>
    </div>
  );
}

export default SignUp;
