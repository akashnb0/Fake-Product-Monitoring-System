import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"


function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios
      .get(`http://127.0.0.1:8085/showingid/${userId}`)
      .then((response) => {
        const userData = response.data; 
        console.log(userData.transaction_id + " "+userId + " "+ password + " "+ userData.password);
        console.log(response.data);
        if (userData.password === password) {
          alert('Authentication successful');
          navigate(`/dashboard/${response.data.transaction_id}`);
        } 
        else {
          alert('Invalid credentials. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        alert('Error fetching user data. Please try again later.');
      });
  };

  return (
    <div className='bla'>
    <div className='rev'>
        
      <center>
        <h1 className='rree'>Welcome back! Login</h1>
      </center>
      <label className='revise'>User Id</label>
      <input
        type='text'
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <br />
      <label>Password</label>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className='bb' onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
}

export default Login;