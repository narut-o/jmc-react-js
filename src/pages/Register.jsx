import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { Context, server } from '../main';

const Register = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

const {loading,setLoading,user,setUser,isAuthenticated,setIsAuthenticated} = useContext(Context);

    const submitHandler = async (e)=>{
        e.preventDefault();
           setLoading(true);
           try {
               const {data} =   await axios
                .post(`${server}/users/register`,{name,email,password},{withCredentials:true,headers:{"Content-Type":"application/json"}})
               toast.success(data.message);
               setIsAuthenticated(true);
               setLoading(false);
               localStorage.setItem('user',data.user);
           } catch (error) {
               toast.error(error.response.data.message);
               setIsAuthenticated(false);
               setLoading(false);
           }
    }
  if(isAuthenticated)return <Navigate to={'/'} />
  return (
    <div className='login' >
      <section>
        <form onSubmit={submitHandler} >
          <input required value={name} onChange={(e)=>setName(e.target.value)}  type='text' placeholder='Name' />
          <input required value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' />
          <input required value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password' />
          <button type='submit' disabled={loading}  > Sign Up</button>
          <h4>OR</h4>
          <Link to={'/login'} >Login</Link>
        </form>
       
       
      </section>
    </div>
  )
}

export default Register