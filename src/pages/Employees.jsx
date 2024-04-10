import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main';
import Employee from '../components/Employee';
import { Navigate } from 'react-router-dom';

const Employees = () => {
    const{isAuthenticated,user} = useContext(Context);

    const [employees,setEmployees] = useState([]);
    const [update,setUpdate] = useState(false);
    useEffect(()=>{
       axios.get(`${server}/users/employees`,{withCredentials:true}).then(res=>{
        setEmployees(res.data.employees);
       })
    },[update])
    if(!isAuthenticated||!user.role==='superadmin')
    return<Navigate to={'/login'} />
  return (
    employees.map(employee=>{
        return <Employee key={employee._id} employee={employee} setUpdate={setUpdate} />
    })
  )
}

export default Employees