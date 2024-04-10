import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main';
import banner from '../assets/1.jpg'
import axios from 'axios';
import Complaint from '../components/Complaint';
import CloudImage from '../components/CloudImage';
import { Navigate } from 'react-router-dom';

const AllComplaints = () => {
    const{isAuthenticated,user} = useContext(Context);

    const [complaints,setComplaints] = useState([]);
    const [publicId,setPublicId] = useState("");
    const [update,setUpdate] = useState(false);
  
    useEffect(()=>{
        
           axios.get(`${server}/complains/all`,{withCredentials:true}).then(({data})=>{
               setComplaints(data.complaints);
               !publicId&&setPublicId(data.complaints[0].image.public_id);
               
           })
    },[update])
    const getImage = async (public_id)=>{
          setPublicId(public_id);
    
}
  if(!isAuthenticated||!user.role==='superadmin')
  return<Navigate to={'/login'} />

  return (
    <div className='main-container' >

        <div className="image-box">
           <CloudImage publicId={publicId} />
        </div>
        <div className='complaints-box' >
        { complaints.map(complaint=>{
     return <Complaint complaint={complaint} user = {user} getImage={getImage} setPublicId={setPublicId} key={complaint._id} setUpdate={setUpdate} />
       })}
        </div>

      </div>

  )
}

export default AllComplaints