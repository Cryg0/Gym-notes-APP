import React from 'react'
import axios from 'axios'




const baseUrl='http://127.0.0.1:8000/api/'
export default function Register(){
    

    const [userData,setUserData]=React.useState({
        'email':'',
        'username':'',
        'password':'',
        'status':''
    })

  
    const handleChange=(event)=>{
        setUserData({
            ...userData,
            [event.target.name]:event.target.value
        })
       
    }

    const submitForm=()=>{
        const userFormData=new FormData();
        userFormData.append('email',userData.email)
        userFormData.append('username',userData.username)
        userFormData.append('password',userData.password)
        console.log(userData)

        try{
        axios.post(baseUrl+'user/register/',userFormData).then((response) =>{
            console.log(response.data)
        })
    }catch(error){
        
        setUserData({'status':'error'})
    }
     }
    
    
 return (
        <div className="wrapper">
        <div className="form-left">
            <h2 className="text-uppercase">information</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Diam volutpat commodo.
            </p>
            <p className="text">
                <span>Sub Head:</span>
                Vitae auctor eu augudsf ut. Malesuada nunc vel risus commodo viverra. Praesent elementum facilisis leo vel.
            </p>
            <div className="form-field">
                <a href='/login'><input type="submit"  className="account" value="Have an Account?"/></a>
            </div>
        </div>
         {userData.status=='sucess' && <p className='text-success'>Thanks for registration</p> }
         {userData.status =='error' && <p className='text-danger'>Something wrong</p> }
        <form className="form-right">
            <h2 className="text-uppercase">Registration form</h2>
           
            <div className="mb-3">
                <label>Your Email</label>
                <input value={userData.email} onChange={handleChange} type="email" className="input-field" name="email" required/>
            </div>
            <div className="row">
                <div className="col-sm-6 mb-3">
                    <label>Username</label>
                    <input value={userData.username} onChange={handleChange} type="text" name="username" id="first_name" className="input-field"/>
                </div>
                
            </div>
            <div className="row">
                <div className="col-sm-6 mb-3">
                    <label>Password</label>
                    <input value={userData.password} onChange={handleChange} type="password" name="password"  className="input-field"/>
                </div>
                <div className="col-sm-6 mb-3">
                    <label>Current Password</label>
                    <input value={userData.password} type="password" name="i" id="cpwd" className="input-field"/>
                </div>
            </div>
            <div className="mb-3">
                <label className="option">I agree to the <a href="#">Terms and Conditions</a>
                    <input type="checkbox" checked/>
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="form-field">
                <input  onClick = {submitForm} type='submit' value="Register" className="register" name="register"/>
            </div>
        </form>
    </div>

    )
}