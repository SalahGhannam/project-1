import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { UserContext } from '../../context/User'

export default function Navbar() {

  const {userName,setUserName,setUserToken} = useContext(UserContext);
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserName(null);
    navigate('/signin')
  }
  return (

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  mb-2 mb-lg-0">
        
       {
        userName?
        <>
        <div className='nav-item'>
        <li ><NavLink className="nav-link " aria-current="page" >welcome {userName} </NavLink></li> 
<li ><NavLink className="nav-link " aria-current="page" to='/'>Home</NavLink></li>

<li ><NavLink className="nav-link " aria-current="page" to='/Products'>Products</NavLink></li>
 <li ><NavLink className="nav-link " aria-current="page" to='/Cart'>Cart</NavLink></li>
</div>
        
<div className='nav-item-sign'>
        <li > <button onClick={logout}> Logout </button></li> 
        </div>
        </>
        :
        <>
            <div className='nav-item'>

<li ><NavLink className="nav-link " aria-current="page" to='/'>Home</NavLink></li>

<li ><NavLink className="nav-link " aria-current="page" to='/Products'>Products</NavLink></li>
 
</div>
        <div className='nav-item-sign'>
        
        <li><NavLink className="nav-link" aria-current="page" to='/signin'>Sign In</NavLink></li>

        <li><NavLink className="nav-link" aria-current="page" to='/signup'>Sign Up</NavLink></li>  
      </div>
        </>
       }
        
       
      
          
      </ul>
      
    </div>
  </div>
</nav>

  )
}
