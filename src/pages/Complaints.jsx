import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import banner from '../assets/1.jpg'
import { Context, server } from '../main';
import Complaint from '../components/Complaint';
import CloudImage from '../components/CloudImage';
import { Navigate } from 'react-router-dom';

const Complaints = () => {
  const{isAuthenticated,user} = useContext(Context);
  const [complaints,setComplaints] = useState([]);
  const [publicId,setPublicId] = useState("");
  const [update,setUpdate] = useState(false);

  useEffect(()=>{
      axios.get(`${server}/complains/getall`,{withCredentials:true}).then(res=>{
        setComplaints(res.data.complaints);
        setPublicId(res.data.complaints[0].image.public_id);
      })
  },[update])
  const getImage = async (public_id)=>{
    setPublicId(public_id);
}
if(!isAuthenticated||!user.role==='superadmin')
return<Navigate to={'/login'} />

  return (
  
   complaints.length==0?<div className='no-complaints' >
    <h1>No pending complains</h1>
   </div>: <div className='main-container' >

<div className="image-box">
   <CloudImage publicId={publicId} />
</div>
<div className='complaints-box' >
{ complaints.map(complaint=>{
return <Complaint complaint={complaint} user = {user} getImage={getImage} setUpdate={setUpdate}/>
})}
</div>

</div>
  )
}

export default Complaints