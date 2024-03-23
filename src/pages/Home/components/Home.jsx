import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/categories/active?page=1&limit=10`);
      setCategories(data.categories);

      console.log(data); 
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <h2>Categories</h2>
      
      <div className='categories-container'>
        {categories.map(category =>
        <Link to={`/categories/${category.id}`}>
          <div className='category' key={category.id}>
            <h2>{category.name}</h2>
            <img src={category.image.secure_url} alt={category.name} />  
          </div>
          </Link>
        )}
      </div>
    </>
  );
}
