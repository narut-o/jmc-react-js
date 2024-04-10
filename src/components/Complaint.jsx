
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { server } from '../main'
import toast from 'react-hot-toast'
import Rating from '@mui/material/Rating';
import { Link, Navigate } from 'react-router-dom';

const Complaint = ({complaint,user,getImage,setPublicId,setUpdate}) => {
    const [status,setStatus] = useState("pending 🟡")
    const [loading,setLoading] = useState(false);
    const [urgency,setUrgency] = useState(complaint.urgency);



   
    const updateHandler = async(id) =>{
                 setUpdate(true);
            try {


                const {data} = await axios
                
                .put(`${server}/complains/update/${id}`,{status},
                {
                withCredentials:true,
                headers:{"Content-Type":"application/json"}
            });
            toast.success(data.message);
               setUpdate(false);
            } catch (error) {
                toast.error(error.response.data.message);
                setUpdate(false);
            }
    }
    const escalateHandler = async (id)=>{
        setLoading(true);
        setUpdate(true);
        try {
            const {data} = await axios.put(`${server}/complains/escalate/${id}`,{},{withCredentials:true});
            toast.success(data.message);
            setUrgency(prev=>prev+1);
            setLoading(false);
            setUpdate(false);

        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
            setUpdate(false);
        }
    }
    const deleteHandler = async(id)=>{
        setLoading(true);
        setUpdate(true);
        try {
        const {data}  =   await axios.delete(`${server}/complains/delete/${id}`,{withCredentials:true});
        toast.success(data.message);
        setPublicId('');
        setLoading(false);
        setUpdate(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
            setUpdate(false);
        }
    }
    const reopenHandler = async (id)=>{
        setLoading(true);
        setUpdate(true);
        try {

              const {data} = await axios.put(`${server}/complains/reopen/${id}`,{},{withCredentials:true});
              toast.success(data.message);
        setUrgency(1);
        setLoading(false);
        setUpdate(false);

        } catch (error) {
            toast.error(error.resonse.data.message);
            setLoading(false);
            setUpdate(false);
        }
    }
  

  return (
   <div className="complain-master">
    <div className='complaint' onClick={()=>{getImage(complaint.image.public_id)}}>
    <div className="complain-data">
    <div className='complaint-desc'>
    <h4>Category: {complaint.category}</h4>
    <p>Description: {complaint.description}</p><br/>
    <p>Current status: {complaint.status}</p>
    <h4 style={{fontWeight:"100"}} >urgency:<Rating name='size-medium' readOnly value={urgency} style={{color:urgency>=3&&"red"}}  /> </h4>
</div>
{user.role==='admin'||user.role==='superadmin'?<div  className='complaint-status'>
  <h4 style={{fontFamily:"cursive"}} >status: &nbsp; <select className='select' onChange={(e)=>{setStatus(e.target.value)}} defaultValue={complaint.status}  >

   <option  value={"pending 🟡"} >Pending</option>
   <option  value={"resolved 🟢 "} >Resolved</option>
   </select> </h4>
   <button className='btn' onClick={()=>updateHandler(complaint._id)}  >Update</button>
  </div>:<div>
    <h4>status: {complaint.status}</h4>
    {complaint.status==='resolved 🟢 '&&<button className='btn' onClick={()=>{reopenHandler(complaint._id)}} disabled={loading} >Reopen</button>} 
    </div>}
    </div>
  
  </div>
  <div>
{user.role==='admin'||user.role==='superadmin'?
<button className='escalate' onClick={()=>escalateHandler(complaint._id)} disabled={loading} >Escalate</button>:
<button className='escalate' onClick={()=>deleteHandler(complaint._id)}  disabled={loading} >Delete</button>}
</div>
   </div>
     
  )
}

export default Complaint

