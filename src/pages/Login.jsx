import React, { useContext, useState } from 'react'
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';


const Login = () => {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const {isAuthenticated,setIsAuthenticated,loading,setLoading,isAdmin,setIsAdmin} = useContext(Context);
const [success,setSuccess] = useState(false);

  const submitHandler = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data} =   await axios.post(`${server}/users/login`,{email,password},{
        headers:{
          "Content-Type":"application/json",
          
        },
        withCredentials:true
         
        })
      
        toast.success(data.message)
        setLoading(false);
        localStorage.setItem('user',data.user);
        setIsAuthenticated(true);


       
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setIsAuthenticated(false);

    
    }
  }
  
  if(isAuthenticated)
  return <Navigate to={'/'} />
  return (
    <div className='login' >
       <section>
        <form onSubmit={submitHandler} >
        <input required value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' />
          <input required value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password' />
          <button type='submit' disabled={loading} >Login</button>
          <h4>OR</h4>
          <Link to={"/register"} >Sign Up</Link>
        </form>
       </section>
    </div>
  )
}

export default Login