import React from 'react'
import WorkoutAdd from './WorkoutAdd'
import axios from 'axios'
import {Link} from 'react-router-dom'
import WorkoutUpdate from './WorkoutUpdate'
import AuthContext from './context/AuthContext'
import ReactPaginate from 'react-paginate'


const Swal = require('sweetalert2')


export default function Workouts() {
const [load,setLoad]=React.useState('false')
let {logoutUser}=React.useContext(AuthContext)
const [page,setPage]=React.useState(1)
const [pageF,setPageF]=React.useState(1)
const [isClicked, setIsClicked] = React.useState(false)
const handlePopup = () => {setIsClicked(prev => !prev)}
const [isClicked2,setIsClicked2] = React.useState(false)

const [activeWorkoutsData,setActiveWorkoutsData] = React.useState({'data':[{
    'name':'',
    'date':'',
    'user':'',
    'status':'',
    'exercises':''},
]
})

const [finishedWorkoutsData,setFinishedWorkoutsData] = React.useState({'data':[{
    'name':'',
    'date':'',
    'user':'',
    'status':'',
    'exercises':''}]
})

React.useEffect(()=>{
    axios.get('/workouts/?page='+pageF+"&&sort=finished")
    .then((response)=>{
      if (response.status ===200){
          setFinishedWorkoutsData(response.data)
      }
        
  
  } ).catch(()=>{
    logoutUser()
  });
  },[pageF,isClicked,isClicked2,logoutUser] );  
  



React.useEffect(()=>{
  axios.get('/workouts/?page='+page+"&&sort=active")
  .then((response)=>{
    if (response.status ===200){
        setActiveWorkoutsData(response.data)
        setLoad(false)
    }
        

} )
.catch((error)=>{
    logoutUser()
});
},[page,isClicked,isClicked2,load,logoutUser] );  


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
                axios.delete('/workouts/'+workoutId+'/')
                .then((res)=>{
                    Swal.fire({
                        title:'Sucess',text:'Exercise has been deleted',
                        timer: 1000,position: 'top-right'})
                    setLoad(true)

                });
            }catch(error){
                Swal.fire('error','Exercise has not been delete')
            }
         
        }
        })
      }

     
      
const handlePageClick = (data,status)=>{
    if (status==='finished'){
        setPageF(data.selected+1)
    }
    else if (status==='active'){
        setPage(data.selected+1)
    }
    
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
              {activeWorkoutsData.data.map((workout,index)=>(
                
                   
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
              )
            
              
               )}

      
        <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={activeWorkoutsData.last_page}
        onPageChange={(event)=>handlePageClick(event,'active')}
        containerClassName={'pagination  justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}


        />
        
             
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
              {finishedWorkoutsData.data.map((workout,index)=>{
            
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
             
             <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={finishedWorkoutsData.last_page}
        onPageChange={(event)=>handlePageClick(event,'finished')}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}


        />    
      
        
            </tbody>
        </table>
       
    </div>

</div>
</div>

  )
}