import React from 'react'
import { useEffect,useState } from 'react';
import './Categories.css';

export default function Catagories() {
  
    const [categories,setCategories]=useState([]);
    
    const getCategories = async ()=>{
      const response = await fetch ('https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10')
      const data = await response.json();
      setCategories(data.categories);
      console.log(data); 
    };

    useEffect ( ()=>{
      getCategories();
    }
    ,[] );
     
      return (
        <>
        <div className='categories-container'>
          { categories.map(Categorie=>
          <div className='Categorie' key={Categorie.id}>
          <h2>{Categorie.name}</h2>
          <img src={Categorie.image.secure_url} />
          </div>
        )} 
        </div>    


        </>
      )
    }
    
