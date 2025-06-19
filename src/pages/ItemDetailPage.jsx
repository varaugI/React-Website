import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetailPage.css';

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const userId = 'demo-user'; // Replace this with actual auth

  useEffect(() => {
    fetch(`http://localhost:5000/items/${id}`)
      .then(res => res.json())
      .then(data => setItem(data))
      .catch(err => console.error('Error fetching item:', err));

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [id]);

  const handleAction = async (type, payload) => {
    try {
      await fetch(`http://localhost:5000/interaction/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error(`${type} action failed`, err);
    }
  };

  const handleCommentPost = async (e) => {
    e.preventDefault();
    const input = e.target.comment;
    if (!input.value.trim()) return;

    await handleAction('comment', {
      userId,
      itemId: item._id,
      comment: input.value,
    });

    input.value = '';
  };

  if (!item) return <div className="item-detail-container">Loading...</div>;

  return (
    <div className="item-detail-container">
      <div className="item-detail-card">
        {/* Dropdown */}
        <div className="dropdown-top-right" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>⋮</button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleAction('report', { userId, itemId: item._id })}>🚫 Report</li>
              <li onClick={() => handleAction('mute', { userId, targetUserId: item.userId })}>🔇 Mute</li>
              <li onClick={() => handleAction('block', { userId, targetUserId: item.userId })}>🚫 Block</li>
            </ul>
          )}
        </div>

        {/* Image */}
        <img
          src={item.image || '/images/camera.png'}
          alt={item.title}
          onError={(e) => (e.target.src = '/images/camera.png')}
        />

        {/* Info */}
        <div className="item-info">
          <h2>{item.title}</h2>
          <p className="item-description">{item.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="card-actions">
          <button onClick={() => handleAction('like', { userId, itemId: item._id })}>❤️</button>
          <button onClick={() => handleAction('bookmark', { userId, itemId: item._id })}>🔖</button>
        </div>
      </div>

      {/* Comments */}
      <div className="comment-section">
        <h4>Comments</h4>
        {item.comments?.length ? (
          item.comments.map((c, i) => (
            <div key={i} className="comment-item">
              <strong>{c.userId}</strong>: {c.comment}
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet.</p>
        )}

        <form onSubmit={handleCommentPost} className="comment-form">
          <input type="text" name="comment" placeholder="Write a comment..." />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default ItemDetailPage;
