import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import "./DashBoard.css";
Modal.setAppElement('#root');

function DashBoard() {
  const navigate = useNavigate();
  const handleProfile =()=>
  {
    navigate(`/profile/${transactionId}`);
  }
  const { transactionId } = useParams();

  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
 

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get(`http://localhost:8085/showingid/${transactionId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchUserDetails();
  }, [transactionId]);

  return (
     <div>
      <center>
        <h1>Welcome to the Dashboard {transactionId}</h1>
        <button onClick={handleProfile} className='button5'>My Profile</button><hr/>
        </center>
     </div>
    
  );
}

export default DashBoard;