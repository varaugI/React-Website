// pages/LandingPage.jsx
import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import './LandingPage.css';

const LandingPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching items:', err);
        setLoading(false);
      });
  }, []);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="explore-section">
        <h2 className="explore-heading">Explore Items</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading items...</p>
        ) : (
          <div className="grid-container">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ItemCard key={item.customId} item={item} />
              ))
            ) : (
              <p style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>
                No items found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
