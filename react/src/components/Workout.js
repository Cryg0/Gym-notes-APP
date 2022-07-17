import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ExerciseAdd from './ExerciseAdd'

import ExerciseUpdate from './ExerciseUpdate'

const Swal = require('sweetalert2')

export default function Workout(){
const {workoutId}=useParams()
 

const [workoutData,setWorkoutData]=React.useState([])
const [isClicked, setIsClicked] = React.useState(false)
const [isClicked1, setIsClicked1] = React.useState(false)

React.useEffect(()=>{
    try{
    axios.get('/exercises/?workout_id='+workoutId).then((response)=>{
    setWorkoutData(response.data)
  } );
}catch(error){
    console.log(error)
}
  },[isClicked1,isClicked] );  
    
const [exerciseId,setExerciseId] = React.useState('')

  const handlePopup = (exerciseId) => {
    setExerciseId(exerciseId)
    setIsClicked(prev => !prev)}
    

const deleteExercise=(excerciseId)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            try{
                axios.delete('/exercises/'+excerciseId+'/')
                .then((res)=>{
                    Swal.fire({
                        position: 'top-right',
                        toast:true,
                        icon: 'success',
                        title: 'Exercise has been deleted',
                        showConfirmButton: false,
                        timer: 1500
                    })
                   
                        axios.get('/exercises/?workout_id='+workoutId).then((response)=>{
                        setWorkoutData(response.data)
                      } )
                    .catch((error)=>{
                        console.log(error)
                    })

                });
            }catch(error){
                Swal.fire('error','Exercise has not been delete')
            }
         
        }
        })
      }

 

const handlePopup1 = () => {
    setIsClicked1(prev => !prev)}
  



    return(
      <div className="container ">
        <div className='col'><button onClick={(handlePopup1)} style={{float:'right'}} type="button" className="btn btn-primary btn-lg mb-2">Add exercise</button></div>
        
        {isClicked && <ExerciseUpdate handleClose={handlePopup} workout={workoutId} exercise={exerciseId} />}
        {isClicked1 && <ExerciseAdd handleClose={handlePopup1} workout={workoutId}  />}
      <table className="table table-borderless table-responsive card-1 p-4 ">
<thead>
<tr className="border-bottom">
<th>
    <span className="ml-2">Name</span>
</th>
<th>
    <span className="ml-2">Weight</span>
</th>
<th>
    <span className="ml-2">Sets</span>
</th>
<th>
    <span className="ml-2">Repetitions</span>
</th>
<th>
    <span className="ml-4">Action</span>
</th>
</tr>
</thead>
<tbody>

{workoutData.map((workout,index)=>(


<tr  key ={index}className="border-bottom">
<td>
    <div className="p-2">
        <span className="d-block font-weight-bold">
            {workout.name }</span>
           
    </div>
</td>
<td>
     <div className="p-2 d-flex flex-row align-items-center mb-2">
       
        <div className="d-flex flex-column ml-2">
            <span className="d-block font-weight-bold">{workout.weight} kg</span>
            
        </div>
    </div>

</td>
<td>
    <div className="p-2">
        <span className="font-weight-bold">{workout.sets}</span>
    </div>
</td>
<td>
    <div className="p-2 d-flex flex-column">
        <span>{workout.reps}</span>
        
    </div>
</td>
<td>
    <div className="p-2 icons">
        <i onClick ={()=>deleteExercise(workout.id)}className="bi bi-trash3"></i>
        <i onClick={()=>handlePopup(workout.id)}  className="bi bi-pencil-square"></i>
        
        
    </div>
</td>
</tr>
))}


















</tbody>
</table>

   
</div>


    )
}