import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemCard.css';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Navigating to:', item.customId); // Debugging log
    navigate(`/items/${item.customId}`);
  };

  return (
    <div className="item-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img
        src={item.image || 'https://via.placeholder.com/150'}
        alt={item.title}
      />
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
    </div>
  );
};

export default ItemCard;
