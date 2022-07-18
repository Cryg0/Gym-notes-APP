import React from "react";
import axios from 'axios'
import Creatable from 'react-select/creatable'
import AuthContext from "./context/AuthContext";


const WorkoutAdd = props => {

  let {user}=React.useContext(AuthContext)
  
    const data = [
        {
          value: "Bench press",
          label: "Bench press"
        },
        {
          value: "Barbell squats",
          label: "Barbell squats"
        },
        {
          value: "Pullover",
          label: "Pullover"
        },
        {
          value: "Deadlift",
          label: "Deadlift"
        },
        {
          value: "Military press",
          label: "Military press"
        },
        {
          value: "Legs extentions",
          label: "Legs extensions"
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
    const names= [selectedValues.map((data)=>[data.value])]
    const [workoutData,setWorkoutData] = React.useState({
      'name':'',
      'date':'',
    
    })
    
const handleChange=(event)=>{

  setWorkoutData({
    ...workoutData,
    [event.target.name]:event.target.value
  })
}

const formSubmit=()=>{
    
    const workoutForm = new FormData()
    workoutForm.append('name',workoutData.name)
    workoutForm.append('date',workoutData.date)
    workoutForm.append('user',user.user_id)
    workoutForm.append('exercises',names)
    workoutForm.append('status','active')

    

  axios.post("/workouts/",workoutForm)
  .then((res)=>{
    if(res.status===201){
      const Swal = require('sweetalert2')
      Swal.fire({
          position: 'top-right',
          toast:true,
          icon: 'success',
          title: 'Workout has been created',
          showConfirmButton: false,
          timer: 1500
      })
      
      props.handleClose()
     
  
      }
  })
 
.catch((error)=>{
  console.log(error)
})


}




  return (
    <div className="popup-box" >
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
      options={data}
      value={selectedValues}


></Creatable>




  <button onClick={formSubmit} type="button" className="btn btn-primary mt-3">Submit</button>
</form>
      </div>
    </div>
  );
;



}




export default WorkoutAdd;