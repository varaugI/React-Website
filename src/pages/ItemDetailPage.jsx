import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetailPage.css';

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/items/${id}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching item:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="item-detail-container"><p>Loading item...</p></div>;
  if (!item) return <div className="item-detail-container"><p>Item not found.</p></div>;

  return (
    <div className="item-detail-container">
      <div className="item-card-detail">
        <img
          src={item.image || '/images/camera.png'}
          alt={item.title}
          onError={(e) => (e.target.src = '/images/camera.png')}
        />
        <div className="item-info">
          <h2>{item.title}</h2>
          <p className="item-description">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
