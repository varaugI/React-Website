// frontend/components/ItemCard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemCard.css';

const ItemCard = ({ item, userId }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleAction = async (type, payload) => {
    try {
      const response = await fetch(`http://localhost:5000/interaction/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Action failed:', error);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="item-card" onClick={() => navigate(`/items/${item.customId}`)}>
  {/* Dropdown Button Top-Right */}
  <div className="dropdown-top-right" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
    <button title="More" onClick={toggleDropdown}>⋮</button>
    {dropdownOpen && (
      <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
        <li onClick={() => handleAction('report', { userId, itemId: item._id, reason: 'Inappropriate content' })}>🚫 Report</li>
        <li onClick={() => handleAction('mute', { userId, targetUserId: item.userId })}>🔇 Mute</li>
        <li onClick={() => handleAction('block', { userId, targetUserId: item.userId })}>🚫 Block</li>
      </ul>
    )}
  </div>

  <img
    src={item.image || '/images/camera.png'}
    alt={item.title}
    onError={(e) => (e.target.src = '/images/camera.png')}
  />
  <div className="card-body">
    <h3>{item.title}</h3>
    <p>{item.summary}</p>
    <div className="card-actions">
      <button
        title="Like"
        onClick={(e) => {
          e.stopPropagation();
          handleAction('like', { userId, itemId: item._id });
        }}
      >❤️</button>
      <button
        title="Comment"
        onClick={(e) => {
          e.stopPropagation();
          handleAction('comment', { userId, itemId: item._id, comment: 'Nice item!' });
        }}
      >💬</button>
      <button
        title="Bookmark"
        onClick={(e) => {
          e.stopPropagation();
          handleAction('bookmark', { userId, itemId: item._id });
        }}
      >🔖</button>
    </div>
  </div>
</div>

  );
};

export default ItemCard;
