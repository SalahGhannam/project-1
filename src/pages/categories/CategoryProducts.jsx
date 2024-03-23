import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './CategoryProducts.css'

export default function CategoryProducts() {
    const {id} = useParams('id');
    const [products,setProducts] = useState([]);

    const getProducts = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
        setProducts(data.products);
    };

    useEffect ( ()=>{
        getProducts();
    },[]);

    const  addToCart = async (productId)=>{
       const token = localStorage.getItem('userToken');
        const {data} = await axios.post(`${import.meta.env.VITE_API}/cart`, {productId},
        {headers:{
        Authorization:`Tariq__${token}`
        }
    });
        console.log(data);
    };
       

  return (
    <div className='row'>
     {
     products.map(product=>
        <div className='col-md-4' key={product._id}>
     <div className='product'>
      <h2>{product.name}</h2>
      <img src={product.mainImage.secure_url} />
      <button onClick={()=>addToCart(product._id)}>Add To Cart</button>
      </div> 
     </div>
     )
     }
    </div>
  )
}
