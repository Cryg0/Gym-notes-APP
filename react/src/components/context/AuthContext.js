import { createContext, useState } from "react";
import axios from 'axios'

 const AuthContext = createContext()
 export default AuthContext;


 export const AuthProvider = ({children}) => {

    const [user,setUser]=useState(JSON.parse(localStorage.getItem('User')))
    const [res,setRes]=useState({})
    
    let loginUser=  (e)=>{
        e.preventDefault()
        
        axios.post('/user/login/',{'email':e.target.email.value,
            'password':e.target.password.value},{withCredentials:true})
            .then((response)=>{
              
            if (response.status === 200){
                localStorage.setItem('Access_token',response.data.token)
                localStorage.setItem('User',JSON.stringify(response.data.user))
                window.location.href='/'

            }
            else{
                setRes({'error':response.response.data.detail})
            }
            }).catch(error =>{
                console.log(error)
           
        })
        }

 let logoutUser = async ()=>{
       
        await axios.post('/user/logout/',{},{withCredentials:true})
        localStorage.removeItem('User')
        localStorage.removeItem('Access_token')
        setUser(null)
    }

    let contextData = {
        user:user,        
        loginUser:loginUser,
        logoutUser:logoutUser,
        res:res

        }

    return (
        <AuthContext.Provider value ={contextData}>
            { children}
        </AuthContext.Provider>
    )
 }