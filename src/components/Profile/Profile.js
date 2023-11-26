import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import "./Profile.css";
// Make sure to set the app element for the Modal
Modal.setAppElement('#root');

function Profile() {
    const navigate = useNavigate();
  const { transactionId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUserDetails, setEditedUserDetails] = useState({
    transaction_id: transactionId,
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

  const openEditModal = () => {
    setEditedUserDetails(userDetails);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = async () => {
    try {
        console.log(transactionId);
        console.log(editedUserDetails);
      await axios.put(`http://localhost:8085/update`, editedUserDetails);
      // Close the modal after successfully updating the data
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };
  const handleDelete = () =>
  {
    const storedUserId=localStorage.getItem('userId');
     axios.delete(`http://localhost:8085/deleteid/${transactionId}`)
     navigate('/signup');
  }
  const homepage = () =>
  {
    navigate('/shop');
  }
  return (
    <div className='profile-container '>
    <div>
        <center>
            <div className='profile-card'>
      <h1>User Profile</h1>
      <h2>Transaction ID: {transactionId}</h2>
      <h3>User Details</h3>
      <p>First Name: {userDetails.firstName}</p>
      <p>Last Name: {userDetails.lastName}</p>
      <p>Email: {userDetails.email}</p>
      <p>Password: {userDetails.password}</p>
      <div className='button-group'>
      <button onClick={openEditModal} className='button'>Edit Profile</button><br/>
      <button className='button' onClick={homepage}>Back to Homepage</button>
      <button onClick={handleDelete} className='button' >Delete Profile</button></div>
      </div>
      </center>
      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Profile Modal"
      >
       
      <div className='nn'>
      <h2>Edit Profile</h2>
        <label className='nnnn'>
          First Name:
        </label>
        <input
            type="text"
            name="firstName"
            value={editedUserDetails.firstName}
            onChange={(e) =>
              setEditedUserDetails({ ...editedUserDetails, firstName: e.target.value })
            }
          />
        <label className='nnnn'>
          Last Name:
        </label>
        <input
            type="text"
            name="lastName"
            value={editedUserDetails.lastName}
            onChange={(e) =>
              setEditedUserDetails({ ...editedUserDetails, lastName: e.target.value })
            }
          />
        <br/>
        <label className='nnnn'>
          Email:
        </label>
        <input
            type="email"
            name="email"
            value={editedUserDetails.email}
            onChange={(e) =>
              setEditedUserDetails({ ...editedUserDetails, email: e.target.value })
            }
           disabled
          />
        <label className='nnnn'>
          Password:
        </label>
        <input
            type="password"
            name="password"
            value={editedUserDetails.password}
            onChange={(e) =>
              setEditedUserDetails({ ...editedUserDetails, password: e.target.value })
            }
          />
          <div className='button-group'>
        <button className='button' onClick={handleSave} >Save</button><br/>
        <button className='button' onClick={closeEditModal} >Cancel</button></div>
      </div>
      </Modal>
    </div>
    </div>
  );
}

export default Profile;