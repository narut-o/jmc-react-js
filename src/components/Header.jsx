import React, { useContext, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../assets/logo.png'


const Header = () => {

    const {isAuthenticated,setIsAuthenticated,user} = useContext(Context);
   

    const logoutHandler =async ()=>{
        try {
             await axios.get(`${server}/users/logout`,{
             withCredentials:true
            })
            setIsAuthenticated(false);
            setIsAdmin(false);
            user.role='user';
            toast.success("logged out");
            localStorage.clear();
           
       } catch (error) {
          toast.error(error.response.data.message);
          setIsAuthenticated(true);
       }
       
    }

  return (
    <nav className='header' >
    
    <div >
    <img src={logo} style={{height:"12vh"}} />
     </div>
       
     <article>
       <Link to={"/"}>Home</Link>
       <Link to={"/profile"}>Profile</Link>
     
     { isAuthenticated ? <button className='btn' onClick={logoutHandler} >Logout</button>: <Link to={"/login"}>Log In</Link>}
     </article>
   
   
     </nav>
  )
}

export default Header