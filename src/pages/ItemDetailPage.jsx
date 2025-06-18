// pages/ItemDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  if (loading) return <p>Loading item...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="page-container">
      <h2>{item.title}</h2>
      <img src={item.image || 'https://via.placeholder.com/300'} alt={item.title} />
      <p>{item.description}</p>
    </div>
  );
};

export default ItemDetailPage;
