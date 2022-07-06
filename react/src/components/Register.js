import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api/'


export default function Register(){
    

    const [userData,setUserData]=React.useState({
        'email':'',
        'username':'',
        'password':'',
        
    })

  const [res,setRes]=React.useState({})
    const handleChange=(event)=>{
        setUserData({
            ...userData,
            [event.target.name]:event.target.value
        })
       
    }

    const submitForm=(e)=>{
        e.preventDefault()
        const userFormData=new FormData();
        userFormData.append('email',userData.email)
        userFormData.append('username',userData.username)
        userFormData.append('password',userData.password)
        

        
        axios.post(baseUrl+'user/register/',userFormData).then((response) =>{
            if (response.status===201){
                
                setRes({'201':'Account created'})
                window.location.href='/login'
            }
           
        })
    .catch(error=>{
        
        if (error.response.data.email){
        setRes({'400':"user with this email address already exists."})}
        else if (error.response.data.username){
            setRes({'400':"'user with this username already exists.'"}) 
        }

    })
    
       
    
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
                <Link to='/login'><input type="submit"  className="account" value="Have an Account?"/></Link>
            </div>
        </div>
         
        <form className="form-right" onSubmit={submitForm}>
        <div className='row'>{res['400'] && <p className='text-danger'>{res['400']}</p> }</div>

        {res['201'] && <p className='text-sucess'>{res['201']}</p> }
            <h2 className="text-uppercase">Registration form</h2>
           
            <div className="mb-3">
                <label>Your Email</label>
                <input value={userData.email} onChange={handleChange} type="email" className="input-field" name="email" required/>
            </div>
            <div className="row">
                <div className="col-sm-6 mb-3">
                    <label>Username</label>
                    <input value={userData.username} onChange={handleChange} type="text" name="username" id="first_name" className="input-field" required/>
                </div>
                
            </div>
            <div className="row">
                <div className="col-sm-6 mb-3">
                    <label>Password</label>
                    <input value={userData.password} onChange={handleChange} type="password" name="password"  className="input-field" required/>
                </div>
                <div className="col-sm-6 mb-3">
                    <label>Current Password</label>
                    <input value={userData.password} type="password" name="i" id="cpwd" className="input-field"/>
                </div>
            </div>
            <div className="mb-3">
                <label className="option">I agree to the <Link to='#'>Terms and Conditions</Link>
                    <input type="checkbox" checked/>
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="form-field">
                <input  type='submit' value="Register" className="register" name="register"/>
            </div>
        </form>
    </div>

    )
}