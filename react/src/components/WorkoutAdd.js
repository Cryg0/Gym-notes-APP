import React from "react";
import axios from 'axios'
import Creatable from 'react-select/creatable'
import AuthContext from "./context/AuthContext";




const baseUrl='http://127.0.0.1:8000/api'



const Popup = props => {

  let {user,authTokens}=React.useContext(AuthContext)
  console.log(user)

    const data = [
        {
          value: "cerulean",
          label: "cerulean"
        },
        {
          value: "fuchsia rose",
          label: "fuchsia rose"
        },
        {
          value: "true red",
          label: "true red"
        },
        {
          value: "aqua sky",
          label: "aqua sky"
        },
        {
          value: "tigerlily",
          label: "tigerlily"
        },
        {
          value: "blue turquoise",
          label: "blue turquoise"
        }
      ];
    const [selectedValues, setSelectedValues] = React.useState([])
    const test= (field,value)=>{
      switch(field){
        case 'roles':
          setSelectedValues(value)
          break
        default:
          break
      }
      
     
    }
    const names= [selectedValues.map((data)=>(data.value))]
    



    const [workoutData,setWorkoutData] = React.useState({
      'name':'',
      'date':'',
      // 'user':'1',
      // 'status':'active'
    })
    


const handleChange=(event)=>{

  setWorkoutData({
    ...workoutData,
    [event.target.name]:event.target.value
  })
}

const formSubmit=()=>{
    
    const workoutForm = new FormData()
    const exerciseForm = new FormData()
    exerciseForm.append('data',names)
    workoutForm.append('name',workoutData.name)
    workoutForm.append('date',workoutData.date)
    workoutForm.append('user',user.user_id)
    workoutForm.append('status','active')

    
try{
  axios.post(baseUrl+"/workouts/",workoutForm,{headers:{'Authorization':'JWT '+String(authTokens.access)}}
   
  )
  .then((res)=>{
    if(res){
      const pk=res.data
      console.log(pk)
      exerciseForm.append('pk',pk)
      exerciseSubmit(pk)
    }
  })
}catch(error){
  console.log(error)
}

function exerciseSubmit(){
try{
  axios.post(baseUrl+"/data/",exerciseForm,{headers:{'Authorization':'JWT '+String(authTokens.access)}},{
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
        title: 'Workout has been created',
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

}




  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
        <form>
  <div className="mb-2">
    <label  className="form-label">Name</label>
    <input onChange={handleChange} name='name' type="text" className="form-control"/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Date</label>
    <input onChange={handleChange} name='date' type="datetime-local" className="form-control" />
  </div>


      <Creatable
      isClearable
      isMulti
      onChange={(value)=>test('roles',value)}
      options={data['value']}
      value={selectedValues}


></Creatable>




  <button onClick={formSubmit} type="button" className="btn btn-primary mt-3">Submit</button>
</form>
      </div>
    </div>
  );
;



}




export default Popup;