import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const editableFields = ['username', 'gender', 'phone', 'email'];

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
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

          // Set only editable fields
          const initialFormData = {};
          editableFields.forEach(key => {
            initialFormData[key] = data[key] || '';
          });
          setFormData(initialFormData);

        } else {
          setError(data.message || 'Failed to fetch profile');
          if (response.status === 401 || response.status === 403) {
            navigate('/login');
          }
        }
      } catch (err) {
        console.error(err);
        setError('Server error');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleEditToggle = () => {
    setEditing(!editing);
    setSuccessMessage('');
    setError('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch('http://localhost:3000/profile/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(prev => ({ ...prev, ...formData }));
        setEditing(false);
        setSuccessMessage('Profile updated successfully.');
        setError('');
      } else {
        if (response.status === 409) {
          setError('Username already taken.');
        } else {
          setError(data.msg || 'Update failed');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="page-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.username?.charAt(0).toUpperCase()}
        </div>
        <h2>Profile</h2>

        {!editing ? (
          <>
            <ul className="profile-info">
              <li><strong>Username:</strong> <span>{user.username}</span></li>
              <li><strong>Email:</strong> <span>{user.email}</span></li>
              <li><strong>Phone:</strong> <span>{user.phone || 'N/A'}</span></li>
              <li><strong>Gender:</strong> <span>{user.gender}</span></li>
              <li><strong>Account Type:</strong> <span>{user.accountType}</span></li>
              <li><strong>Role:</strong> <span>{user.role}</span></li>
              <li><strong>Created At:</strong> <span>{new Date(user.createdAt).toLocaleString()}</span></li>
            </ul>
            <button className="edit-btn" onClick={handleEditToggle}>Edit Profile</button>
          </>
        ) : (
          <form className="edit-form" onSubmit={handleUpdate}>
            {editableFields.map(key => (
              <div className="edit-form-row" key={key}>
                <label htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {key === 'gender' ? (
                  <select id={key} name={key} value={formData[key]} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <input
                    id={key}
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}

            <div className="edit-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={handleEditToggle}>Cancel</button>
            </div>
          </form>

        )}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
