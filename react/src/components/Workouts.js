import React from 'react'
import WorkoutAdd from './WorkoutAdd'
import axios from 'axios'
import {Link} from 'react-router-dom'
import WorkoutUpdate from './WorkoutUpdate'
import AuthContext from './context/AuthContext'


const Swal = require('sweetalert2')
const baseUrl = 'http://127.0.0.1:8000/api'

export default function Workouts() {
    let {authTokens,logoutUser}=React.useContext(AuthContext)
    


  const [isClicked, setIsClicked] = React.useState(false)
  const handlePopup = () => {setIsClicked(prev => !prev)}
  const [isClicked2,setIsClicked2] = React.useState(false)

  const [workoutsData,setWorkoutsData] = React.useState([{
    'name':'',
    'date':'',
    'user':'',
    'status':'',
    'exercises':''
}])

React.useEffect(()=>{
  axios.get(baseUrl+'/workouts/',
  {headers:{'Authorization':'JWT '+String(authTokens.access)}}

   ).then((response)=>{
    if (response.status ===200){
  setWorkoutsData(response.data)
}else if (response.statusText === 'Unauthorized'){
 logoutUser()
}
} );
},[isClicked2,isClicked] );  



const [workoutId,setWorkoutId] = React.useState('')

const handlePopup1 =(workoutId)=>{ 
    setWorkoutId(workoutId)
    setIsClicked2(prev=>!prev)
}



const deleteWorkout=(workoutId)=>{
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
                axios.delete(baseUrl+'/workouts/'+workoutId+'/',
                {headers:{'Authorization':'JWT '+String(authTokens.access)}})
                .then((res)=>{
                    Swal.fire({
                        title:'Sucess',text:'Exercise has been deleted',
                        timer: 1000,position: 'top-right'})
                    try{
                        axios.get(baseUrl+'/workouts/',{headers:{'Authorization':'JWT '+String(authTokens.access)}}
                        ).then((response)=>{
                        setWorkoutsData(response.data)
                      } );
                    }catch(error){
                        console.log(error)
                    }

                });
            }catch(error){
                Swal.fire('error','Exercise has not been delete')
            }
         
        }
        })
      }


  return (
    <div className='container'>
    <div className="col ">
    <button style={{float:'right'}} onClick={handlePopup} type="button" className="btn btn-primary btn-lg mb-3">Add new </button>
    {isClicked && <WorkoutAdd handleClose={handlePopup} />}
    {isClicked2 && <WorkoutUpdate handleClose={handlePopup1} workout={workoutId} />}
    </div>
    <div className="container bg-light mt-5 ">
        
    <div className="table-wrap table-responsive">
        <table className="table table-borderless">
            <thead>
                <tr className="p-0">
                    <td className="w350 p-0" >
                        <small className="  btn btn-primary h-1 px-2 mb-2">Upcoming workouts</small>
                    </td>
                    <td className="text-center w100 p-0 py-2" ><small className="text-muted">Date</small>
                    </td>
                   
                    <td className="text-center w100 p-0 py-2" ><small className="text-muted">Status</small></td>
                    
                </tr>
            </thead>
            <tbody>
              {workoutsData.map((workout,index)=>{
                if (workout.status === 'active') {
                    return (
                     <tr key={index}className="border-bottom bg-white">
                    <td className="row">
                        <div className="d-flex align-items-center">
                            <span className="bg-pink me-1"></span>
                            <Link to={`/workouts/${workout.id}`}><span>{workout.name}</span></Link>
                        </div>
                    </td>
                    <td className="text-center">{workout.date.slice(0,10)+" "+workout.date.slice(11,16)}</td>
                    
                    <td className="text-center"><span className="btn btn-secondary pink">{workout.status}</span>
                    </td>
                    <td className="text-center">
                    <i onClick ={()=>deleteWorkout(workout.id)} className="bi bi-trash3 mx-2"></i>
                    <i onClick ={()=>handlePopup1(workout.id)} className="bi bi-pencil-square"></i>                    
                    </td>
                </tr>
              )}
            
              }
               )}
             
            </tbody>
        </table>
        <table className="table table-borderless">
            <thead>
                <tr className="p-0">
                    <td className="w350 p-0" >
                        <small className=" btn btn-primary h-2 px-2">Finished workouts</small>
                    </td>
                    <td className="text-center w100 p-0 py-2" >
                    </td>
                    <td className="text-center w100 p-0 py-2" >
                    </td>
                    
                    
                </tr>
            </thead>
            <tbody>
              {workoutsData.map((workout,index)=>{
                if (workout.status==='finished')
                return (
                <tr  key ={index}className="border-bottom bg-white">
                    <td className="row">
                        <div className="d-flex align-items-center">
                            <span className="bg-pink mx-2"></span>
                            <Link to={`/workouts/${workout.id}`}><span>{workout.name}</span></Link>
                        </div>
                    </td>
                    <td className="text-center">{workout.date.slice(0,10)+" "+workout.date.slice(11,16)}</td>
                    
                    <td className="text-center"><span className="btn btn-secondary pink">{workout.status}</span>
                    </td>
                    <td className="text-center">
                    <i onClick ={()=>deleteWorkout(workout.id)} className="bi bi-trash3 mx-2"></i>
                    <i onClick ={()=>handlePopup1(workout.id)} className="bi bi-pencil-square"></i>     
                        
                    <span className="far fa-flag text-muted"></span></td>
                </tr>
              )})}
             
            </tbody>
        </table>
       
    </div>

</div>
</div>

  )
}