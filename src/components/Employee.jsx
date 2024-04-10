import axios from 'axios'
import React, { useState } from 'react'
import { server } from '../main'
import toast from 'react-hot-toast'

const Employee = ({employee,setUpdate}) => {
  const [department,setDepartment] = useState(employee.departement);
  const changeHandler = async(id)=>
  {  
    setUpdate(true);

    try {
         const {data} = await axios.put(`${server}/users/update/department/${id}`,{department},{withCredentials:true});
         toast.success(data.message);
         setUpdate(false);
    } catch (error) {
        toast.error(error.response.data.message);
        setUpdate(false);
    }
   
    
     
  }
  return (
    <div className='employee-main-div' >
        <div>
        <h2> Name: {employee.name}</h2>
         <p>Department: {employee.department}</p>
        </div>
          <div className="employee-dep">
          
           <select id='dep-select' onChange={(e)=>{setDepartment(e.target.value)}} defaultValue={employee.department}   >

            <option value={"water"} >water</option>
            <option value={"electricity"} >electricity</option>
            <option value={"infrastructure"} >infrastructure</option>
           </select>
           <button className='btn' onClick={()=>changeHandler(employee._id)} >change departement</button>
          </div>

    </div>
  )
}

export default Employee