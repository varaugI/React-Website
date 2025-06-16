// pages/ProfilePage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './PageStyles.css';

const ProfilePage = () => {
  const { user, loading } = useContext(AuthContext);

if (loading) return <p>Loading...</p>;
if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div className="page-container">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.username}</p> {/* was user.name */}
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default ProfilePage;



