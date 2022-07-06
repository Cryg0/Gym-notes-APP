import React from "react";
import axios from 'axios'

const baseUrl='http://127.0.0.1:8000/api'

const ExerciseAdd = props => {

    const [exerciseData,setExerciseData] = React.useState({
      'name':'',
      'weight':'',
      'sets':'',
      'reps':'',
      'workout':props.workout
      
    })
    


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
    exerciseForm.append('reps',exerciseData.reps)
    exerciseForm.append('sets',exerciseData.sets)
    exerciseForm.append('workout',exerciseData.workout)

try{
  axios.post(baseUrl+"/exercises/",exerciseForm,{
    headers :{
      'content-type':'multipart/form-data'
    }
  })
  .then((res)=>{
    if(res.status===201){
     console.log('ok')
    
     props.handleClose()
     
      
    
    }
  })
}catch(error){
  console.log(error)
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
    <label  className="form-label">Weight</label>
    <input onChange={handleChange} name='weight' type="text" className="form-control" />
  </div>
  <div className="mb-3">
    <label  className="form-label">Sets</label>
    <input onChange={handleChange} name='sets' type="text" className="form-control" />
  </div>
  <div className="mb-3">
    <label  className="form-label">Repetitions</label>
    <input onChange={handleChange} name='reps' type="text" className="form-control" />
  </div>


     




  <button onClick={formSubmit} type="button" className="btn btn-primary">Submit</button>
</form>
      </div>
    </div>
  );
;



}




export default ExerciseAdd;