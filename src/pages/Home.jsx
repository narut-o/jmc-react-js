import React, { useContext, useEffect } from 'react'
import { Context, server } from '../main'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Home = () => {

  const {isAuthenticated,user} = useContext(Context);

   
    if(!isAuthenticated)
    return <Navigate to={'/login'} />
    if(user.role==='superadmin')
    return <Navigate to={'/super/admin'} />
    if(user.role==='admin')
    return <Navigate to={'/admin'} />
    if(user.role==='user')
    return <Navigate to={'/user'} />
}

export default Home