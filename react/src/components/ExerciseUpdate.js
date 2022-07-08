import React from "react";
import axios from 'axios'

const ExerciseUpdate = props => {
const [exerciseData,setExerciseData]=React.useState([{
  "id": '',
  "name": "",
  "weight": "",
  "sets": "",
  "reps": "",
  "workout":''
  }])
        
    
const handleChange=(event)=>{
  setExerciseData({
    ...exerciseData,
    [event.target.name]:event.target.value
  })
  }
  
  const formSubmit=()=>{
    const exerciseForm = new FormData()
    exerciseForm.append('name',exerciseData.name)
    exerciseForm.append('weight',exerciseData.weight)
    exerciseForm.append('sets',exerciseData.sets)
    exerciseForm.append('reps',exerciseData.reps)
    exerciseForm.append('workout',props.workout)
  
  

  try{
  axios.put("/exercises/"+props.exercise+'/',exerciseForm)
  .then((res)=>{
    if(res.status===200){
    const Swal = require('sweetalert2')
    Swal.fire({
        position: 'top-right',
        toast:true,
        icon: 'success',
        title: 'Exercise details updated',
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
  
  React.useEffect(()=>{
    try{
    axios.get('/exercises/'+props.exercise+'/')
    .then((res)=>{
        setExerciseData(res.data);
    });
}catch(error){
    console.log(error)
}
},[])
  
  
  
  
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
        <form>
  <div className="mb-2">
    <label  className="form-label">Name</label>
    <input onChange={handleChange} value={exerciseData.name} name='name' type="text" className="form-control"/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Weight</label>
    <input onChange={handleChange} value={exerciseData.weight} name='weight' type="text" className="form-control" />
  </div>
  <div className="mb-3">
    <label  className="form-label">Sets</label>
    <input onChange={handleChange} value={exerciseData.sets} name='sets' type="text" className="form-control" />
  </div>
  <div className="mb-3">
    <label  className="form-label">Reps</label>
    <input onChange={handleChange} value={exerciseData.reps} name='reps' type="text" className="form-control" />
  </div>
  
  

  
  
  
  
  <button onClick={formSubmit} type="button" className="btn btn-primary">Submit</button>
  </form>
      </div>
    </div>
  );
  ;
  
  
  
  }

  export default ExerciseUpdate;