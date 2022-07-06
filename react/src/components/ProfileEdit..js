import React from "react";

import axios from 'axios'




const baseUrl='http://127.0.0.1:8000/api'


const Profile = props => {
       

    const [profileData,setProfileData]= React.useState({'user':{}})
        
    
  const handleChange=(event)=>{
  
  setProfileData({
    ...profileData,
    [event.target.name]:event.target.value
  })
  }
  
  const formSubmit=()=>{
    const profileForm = new FormData()
    profileForm.append('name',profileData.user.first_name)
  
  

  try{
  axios.put(baseUrl+"/exercises/"+props.exercise+'/',profileForm,{
    headers :{
      'content-type':'multipart/form-data'
    }
  })
  .then((res)=>{
    if(res.status==200){
    const Swal = require('sweetalert2')
    Swal.fire({
        position: 'top-right',
        toast:true,
        icon: 'success',
        title: 'Exercise details updated',
        showConfirmButton: false,
        timeProgressBar:true,
        timer: 1500
    })
    props.handleClose()
    
   

    }
  })
  }catch(error){
  console.log(error)
  }
  

  
  }
  
  React.useEffect(()=>{
    try{
    axios.get(baseUrl+'/exercises/'+props.exercise+'/')
    .then((res)=>{
        setprofileData(res.data);
    });
}catch(error){
    console.log(error)
}
},[])
  
  
  
  
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
        <form>
  <div className="mb-2">
    <label  className="form-label">Name</label>
    <input onChange={handleChange} value={profileData.name} name='name' type="text" className="form-control"/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Weight</label>
    <input onChange={handleChange} value={profileData.weight} name='weight' type="text" className="form-control" />
  </div>
  <div className="mb-3">
    <label  className="form-label">Sets</label>
    <input onChange={handleChange} value={profileData.sets} name='sets' type="text" className="form-control" />
  </div>
  <div className="mb-3">
    <label  className="form-label">Reps</label>
    <input onChange={handleChange} value={profileData.reps} name='reps' type="text" className="form-control" />
  </div>
  
  

  
  
  
  
  <button onClick={formSubmit} type="button" className="btn btn-primary">Submit</button>
  </form>
      </div>
    </div>
  );
  ;
  
  
  
  }

  export default ProfileEdit;