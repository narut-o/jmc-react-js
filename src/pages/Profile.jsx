import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Complaint from '../components/Complaint';
import CloudImage from '../components/CloudImage';


const Profile = () => {
 const [complaints,setComplaints] = useState([]);
 const {isAuthenticated,user} = useContext(Context);
 const [publicId,setPublicId] = useState("");
 const [update,setUpdate] = useState(false);

 useEffect(()=>{
   if(user.role==='user')
   { 
    axios.get(`${server}/complains/get`,{withCredentials:true}).then(({data})=>{
      setComplaints(data.complaints)
      !publicId&&setPublicId(data.complaints[0].image.public_id);
     
    })
   }
   },[update])

   const getImage = async (public_id)=>{
                setPublicId(public_id);
                
   }


 if(!isAuthenticated)return(<Navigate to={'/login'} />)
  return (
      user.role==='admin'||user.role==='superadmin'?
      <div className='admin-profile' >

      <div className="admin-profile-content">
      <h2>Department: {user.department}</h2>
      <h2>Desgination : {user.role}</h2>
      </div>

      </div>: <div  className='user-profile'>
      
        <div className='image-box'  >
        <CloudImage publicId={publicId} />
        </div>
       
      <div className='complaints-box' >
      
      { complaints.map(complaint=>{
      return <Complaint  complaint = {complaint}  key={complaint._id} user={user} setPublicId={setPublicId} getImage={getImage} setUpdate={setUpdate} />
     })}
    </div>
      </div>
  )
}

export default Profile