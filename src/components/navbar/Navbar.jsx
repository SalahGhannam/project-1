import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  mb-2 mb-lg-0">
        <div className='nav-item'>
        <li className="">
          <NavLink className="nav-link " aria-current="page" to='/'>Home</NavLink>
        </li>
      
        <li className="">
          <NavLink className="nav-link " aria-current="page" to='/Categories'>Categories</NavLink>
        </li>
        <li className="">
          <NavLink className="nav-link " aria-current="page" to='/Products'>Products</NavLink>
        </li>
        <li className="">
          <NavLink className="nav-link " aria-current="page" to='/Cart'>Cart</NavLink>
        </li>
        </div>
      <div className='nav-item-sign'>
        <li className=" ">
              <NavLink className="nav-link" aria-current="page" to='/signin'>Sign In</NavLink>
            </li>
            <li className="">
              <NavLink className="nav-link" aria-current="page" to='/signup'>Sign Up</NavLink>
            </li>  
            </div>
          
      </ul>
      
    </div>
  </div>
</nav>

  )
}
