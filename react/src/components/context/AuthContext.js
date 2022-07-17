import { createContext, useState, useEffect } from "react";

import axios from 'axios'
import jwt_decode from "jwt-decode";



 const AuthContext = createContext()
 export default AuthContext;


 export const AuthProvider = ({children}) => {

    

    
    const [state,setState]=useState(false)
    const [user,setUser]=useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null)
    const [accessToken,setAccessToken] = useState(()=>localStorage.getItem('Access_token') ? localStorage.getItem('Access_token'): null)
    
    const [res,setRes]=useState({})
    

    
   
    axios.defaults.headers.common['Content-Type']='application/json'
    



   
 useEffect(()=>{
    (async()=>{
        try{
            const {data}=await axios.get('/user/user/')
            setUser(data)
            }catch(e){
                
            }
        })()
    
    
        },[])
    

    
    axios.defaults.baseURL='http://127.0.0.1:8000/api/'
    axios.defaults.headers.common['Authorization']='JWT '+authTokens?.access
    axios.defaults.headers.common['Content-Type']='application/json'
    


    let loginUser=  (e)=>{
        e.preventDefault()
       
    

         axios.post('/user/login/',{'email':e.target.email.value,
            'password':e.target.password.value},{withCredentials:true})
            .then((response)=>{
              
            if (response.status === 200){
              
                setAccessToken(response.data)
                localStorage.setItem('Access_token',response.data.token)

                window.location.href='/'
               
                
                
                
                
               
              
            }
                
            
        }).catch(error =>{
            
           setRes({'401':error.response.data.detail})
        
        })
        
    }


    let logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        axios.post('/user/logout/blacklist/',{"refresh":authTokens.refresh})


        localStorage.removeItem('authTokens')
        window.location.href='/login'

    }

    let updateToken = ()=>{
        

        axios.post('/token/refresh/',{'refresh':authTokens?.refresh})
        .then((response)=>{

            if (response.status === 200){
                setAuthTokens(response.data)
                setUser(jwt_decode(response.data.access))
                localStorage.setItem('authTokens',JSON.stringify(response.data))
                
            }else{
                logoutUser()
            }
        }).catch(error=>{
            logoutUser()
        })
        if (loading){
            setLoading(false)
        }
=======

    let logoutUser = async ()=>{
       
        await axios.post('/user/logout/',{},{withCredentials:true})
        
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