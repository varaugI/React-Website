// pages/LandingPage.jsx
import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import './LandingPage.css';

const LandingPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching items:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading items...</p>;

  return (
    <div className="page-container">
      <h2>Explore Items</h2>
      <div className="grid-container">
        {items.map(item => (
          <ItemCard key={item.customId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
