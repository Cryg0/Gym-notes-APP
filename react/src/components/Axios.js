import axios from 'axios'




axios.defaults.baseURL='http://127.0.0.1:8000/api/'
axios.defaults.headers.common['Content-Type']='application/json'
axios.defaults.headers.common['Authorization']='JWT '+localStorage.getItem('Access_token')

let refresh = false





axios.interceptors.response.use(res =>res, async error =>{
    if (error.response.status === 401 && !refresh){
        refresh=true
        const response= await axios.post('/user/refresh/',{},{withCredentials:true})
        
        if(response.status===200){
            axios.defaults.headers.common['Authorization']='JWT '+response.data.token
            localStorage.setItem('Access_token',response.data.token)

        return axios(error.config)
        }

        }
    refresh=false
    return error
})
   