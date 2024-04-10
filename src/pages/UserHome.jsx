import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main'
import { Navigate } from 'react-router-dom';
import _1 from '../assets/1.jpg'
import _2 from '../assets/2.jpg'
import _3 from '../assets/3.jpg'
import _4 from '../assets/4.jpg'
import Selector from './Selector';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../styles/home.css'
import { TextField } from '@mui/material';
import ImageSwapper from '../components/ImageSwapper';
import BeatLoader from  "react-spinners/BeatLoader";



const UserHome = () => {

 const {isAuthenticated,loading,setLoading} = useContext(Context);


  const [category,setCategory]  =useState("");
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [previewSource,setPreviewSource] = useState("");
  const [update,setUpdate] = useState(false);

  useEffect(()=>{

  },[update])
 
 const uploadImage = async()=>
 {
    setLoading(true);
    try {
        const signatureResponse = await axios.get(`${server}/signature/get-signature`);
    const {signature,timestamp,apikey,cloudname} = signatureResponse.data;
    const url = `https://api.cloudinary.com/v1_1/${cloudname}/auto/upload`;
    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();
    
      formData.append("file", files[0]);
      formData.append("api_key", apikey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      
      const cloudinaryResponse = await axios.post(url,formData);
      toast.success("Image Uploaded")
      setLoading(false);
      return cloudinaryResponse;
    } catch (error) {
        setLoading(false);
        toast.error("error")
        return {};
    }
 }
  const submitHandler = async(e)=>{
    e.preventDefault();
   setLoading(true);
   try {
    const {data} = await uploadImage();
    const {public_id,url} = data;
      await axios.post(`${server}/complains/create`,
      {category,title,description,public_id,url},
      {withCredentials:true,headers:{"Content-Type":"application/json"}})
      toast.success("Complain Registered")
      setLoading(false);
   } catch (error) {
       toast.error("error")
       setLoading(false);
   }

    
  }
 
  const handleInputChange = (e)=>{
   const file =  e.target.files[0];
     previewFile(file)
  }
  const previewFile = (file)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
         setPreviewSource(reader.result);
        
    }
  }
  const btnHandler = async (e)=>{
       setUpdate(true);
       await submitHandler(e);
       setTitle("");
       setDescription("");
       setCategory("");
      
       setLoading(false);
       setUpdate(false);
       
  }
  

 if(!isAuthenticated)return(
    <Navigate to={'/login'} />
 )
  return (
    <div className="main-div">
       <div className="banner">
       <ImageSwapper images={[_1,_2,_3,_4]} />
       </div>
       <div className='input-div' >
      <div className='prev-img' >
      {previewSource?(
        <img src={previewSource} alt='image' style={{height:"30vh"}} />

      ):<div className='home-title' >
          <h2>File Complaint</h2>
        </div>}
       <img src={_1} />

      </div>
      <div className='input-field' >
      <TextField id="standard-basic" label="Title"  fullWidth onChange={(e)=>{setTitle(e.target.value)}} value={title} />
       <TextField id="standard-basic" label="Description" value={description}  multiline rows={4}fullWidth  onChange={(e)=>{setDescription(e.target.value)}} />
       <Selector category={category} setCategory={setCategory}  />
      </div>
       <form method='post' encType='multipart/form-data' onSubmit={submitHandler}  >
    <input type='file' accept='images/'  onChange={handleInputChange} style={{paddingRight:"4rem"}}/>
    <button type='submit' className='btn' onClick={btnHandler} disabled={loading} >Submit</button>
    {loading&&<BeatLoader color="#36d7b7" />}

 </form>  
     
      
       </div>
       
    </div>
  )
}

export default UserHome;


        
