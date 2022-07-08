import React from "react";
import axios from 'axios'


const ProfileEdit = props => {
    
  const [profileData,setProfileData]= React.useState({'user':{'first_name':''}})
  const handleChange=(event)=>{
  
  setProfileData({
    ...profileData,
    'user':{[event.target.name]:event.target.value}
  })
  
  }

  const handleFileChange = (event)=>{
    setProfileData({
      ...profileData,
      [event.target.name]:event.target.files[0]
    })
   
  }
  
  const formSubmit=()=>{
    const profileForm = new FormData()
    profileForm.append('first_name',profileData.user.first_name)
    profileForm.append('picture',profileData.picture,profileData.picture.name)
  
  try{
  axios.put("/user/profile/",profileForm)
  .then((res)=>{
    if(res.status===200){
    const Swal = require('sweetalert2')
    Swal.fire({
        position: 'top-right',
        toast:true,
        icon: 'success',
        title: 'Profile details updated',
        showConfirmButton: false,
        timer: 1500
    })
    props.handleClose()
    }
  })
  }catch(error){
  console.log(error)
  }
  
  }
  
  React.useEffect(() => {
    try {
      axios.get('/user/profile/')
        .then((res) => {
          setProfileData(res.data);
        });
    } catch (error) {
      console.log(error)
    }
  }, [])
  
return (
<div className="popup-box">
  <div className="box">
    <span className="close-icon" onClick={props.handleClose}>x</span>
    {props.content}
    <form>
      <div className="mb-2">
        <label className="form-label">First name</label>
        <input onChange={handleChange} value={profileData.user.first_name} name='first_name' type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Profile picture</label>
        <img src={"http://127.0.0.1:8000" + profileData.picture} className="img-thumbnail mx-4 mb-2" alt="..."></img>
        <input onChange={handleFileChange} name='picture' type="file" className="form-control" />
      </div>

      <button onClick={formSubmit} type="button" className="btn btn-primary">Submit</button>
    </form>
  </div>
</div>
  )
  }

  export default ProfileEdit;