import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const SuperAdmin = () => {

  const {user,isAuthenticated} = useContext(Context);
  
 
  if(!isAuthenticated||!user.role==='superadmin')
  return<Navigate to={'/login'} />



  return (
        <div className='btn-box' >
         <Link className='btn' id='active' to={'/super/admin/complaints'}  >Active Complaints</Link>
         <Link className='btn' id='resolved'  to={'/super/admin/all/complaints'} >Complaints</Link>
         <Link className='btn' id='employees'to={'/super/admin/employees'} >Employees</Link>


        </div>
  )
}

export default SuperAdmin