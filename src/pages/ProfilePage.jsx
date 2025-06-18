import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Not authenticated');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message || 'Failed to fetch profile');
        }
      } catch (err) {
        console.error(err);
        setError('Server error');
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="page-container">
      <h2>Profile</h2>
      <ul>
        <li><strong>Username:</strong> {user.username}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Phone:</strong> {user.phone || 'N/A'}</li>
        <li><strong>Gender:</strong> {user.gender}</li>
        <li><strong>Account Type:</strong> {user.accountType}</li>
        <li><strong>Role:</strong> {user.role}</li>
        <li><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</li>
      </ul>
    </div>
  );
};

export default ProfilePage;
