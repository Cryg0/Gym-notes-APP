import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import jwt_decode from "jwt-decode";





 const AuthContext = createContext()

 export default AuthContext;

 export const AuthProvider = ({children}) => {

  
    
    const [user,setUser]=useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null)
    const [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    const [loading,setLoading] = useState(true)
    const [res,setRes]=useState({})
    

    let loginUser=  (e)=>{
        e.preventDefault()
       
       
         axios.post('http://127.0.0.1:8000/api/token/',{'email':e.target.email.value,'password':e.target.password.value},{
            headers:{'Content-Type':'application/json'}
        
        }).then((response)=>{

            if (response.status === 200){
                setAuthTokens(JSON.stringify(response.data))
                setUser(jwt_decode(JSON.stringify(response.data.access)))
                localStorage.setItem('authTokens',JSON.stringify(response.data))
                window.location.href='/'
            }else{
                
            }
        }).catch(error =>{
            console.log(error.response.data)
           setRes({'401':error.response.data.detail})
        
        })
        
    }


    let logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        axios.post('http://127.0.0.1:8000/api/user/logout/blacklist/',authTokens.refresh)


        localStorage.removeItem('authTokens')
        window.location.href('/login')

    }

    let updateToken = ()=>{
        

        axios.post('http://127.0.0.1:8000/api/token/refresh/',{'refresh':authTokens?.refresh},{
            headers:{'Content-Type':'application/json'}
        
        }).then((response)=>{

            if (response.status === 200){
                setAuthTokens(response.data)
                setUser(jwt_decode(response.data.access))
                localStorage.setItem('authTokens',JSON.stringify(response.data))
                
            }else{
                logoutUser()
            }
        }).catch(error=>{
            console.log(error)
        })
        if (loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,        
        loginUser:loginUser,
        logoutUser:logoutUser,
        authTokens:authTokens,
        res:res

        }

        useEffect(()=>{
            if(loading){
                updateToken()
            }
           let interval =  setInterval(()=>{
                if(authTokens){
                    updateToken()
                }
            },1000*60*4)
            return ()=>clearInterval(interval)

        },[authTokens,loading])



    return (
        <AuthContext.Provider value ={contextData}>
            { loading ? null :children}
        </AuthContext.Provider>
    )
 }