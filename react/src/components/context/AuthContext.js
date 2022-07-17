import { createContext, useState, useEffect } from "react";

import axios from 'axios'
import jwt_decode from "jwt-decode";



 const AuthContext = createContext()
 export default AuthContext;


 export const AuthProvider = ({children}) => {

    
    const [user,setUser]=useState(localStorage.getItem('User'))
    const [accessToken,setAccessToken] = useState(()=>localStorage.getItem('Access_token') ? localStorage.getItem('Access_token'): null)
    
    const [res,setRes]=useState({})
    

    
   
    axios.defaults.headers.common['Content-Type']='application/json'
    axios.defaults.headers.common['Authorization']='JWT '+accessToken

    axios.defaults.headers.common['Content-Type']='application/json'
    


    let loginUser=  (e)=>{
        e.preventDefault()
       
    

         axios.post('/user/login/',{'email':e.target.email.value,
            'password':e.target.password.value},{withCredentials:true})
            .then((response)=>{
              
            if (response.status === 200){
              
                setAccessToken(response.data)
                localStorage.setItem('Access_token',response.data.token)
                localStorage.setItem('User',response.data.user)


                window.location.href='/'
               
                
                
                
                
               
              
            }
                
            
        }).catch(error =>{
            
           setRes({'401':error.response.data.detail})
        
        })
        
    }


  
    

    let logoutUser = async ()=>{
       
        await axios.post('/user/logout/',{},{withCredentials:true})
        localStorage.removeItem('User')
        localStorage.removeItem('Access_token')
        
        setAccessToken(null)
        setUser(null)

        

       

    }

    

    let contextData = {
        user:user,        
        loginUser:loginUser,
        logoutUser:logoutUser,
        accessToken:accessToken,
        res:res

        }

       


    return (
        <AuthContext.Provider value ={contextData}>
            { children}
        </AuthContext.Provider>
    )
 }