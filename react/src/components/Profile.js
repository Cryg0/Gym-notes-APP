import axios from 'axios'
import React from 'react'
import ProfileEdit from './ProfileEdit.'
import Chart from 'react-apexcharts'
import GoalAdd from './GoalAdd'

const Swal = require('sweetalert2')


export default function Profile(){

    const [isClicked,setIsClicked]=React.useState(false)
    const handlePopup = () => {setIsClicked(prev => !prev)}
    const [profileData,setProfileData]= React.useState({'user':{},'picture':''})
    const [exercises,setExercises] = React.useState([])
    const[charSelect,setCharSelect]=React.useState('')
    const[goals,setGoals]=React.useState({"data":[]})
    const[isClicked1,setIsClicked1]=React.useState(false)

    const handlePopup1 = () => {
        setIsClicked1(prev => !prev)}   

    const [state,setState]=React.useState({
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            date: []
          }
        },
        series: [
          {
            name: "series-1",
            data: []
          }
        ]
      
    })

    React.useEffect(()=>{
        try{
            axios.get("goals/",)
            .then((response)=>{
                setGoals(response.data)

        })
        }catch(error){
            console.log(error)
        }
    },[isClicked1])

   
    React.useEffect(()=>{
        try{
            axios.get("chart-data/?exercise="+charSelect)
            .then((response)=>{
                setState(response.data)

        })
        }catch(error){
            console.log(error)
        }
    },[charSelect])


    React.useEffect(()=>{
        try{
            axios.get("/user/profile/",{},{headers:{"Authorization":"JWT "+window.localStorage.getItem('Access_token')}})
            .then((response)=>{
                setProfileData(response.data)
            })
        }catch(error){
            console.log(error)
        }
    },[isClicked])


    React.useEffect(()=>{
        axios.get('/exercises/')
        .then((response)=>{
            setExercises(response.data.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])


    const handleChange=(e)=>{
        setCharSelect(e.target.value)
    }


const deleteGoal=(goal_id)=>{
    console.log(goal_id)
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
            axios.delete('/goals/'+goal_id+'/')
            .then((res)=>{
                Swal.fire({
                    position: 'top-right',
                    toast:true,
                    icon: 'success',
                    title: 'Goal has been deleted',
                    showConfirmButton: false,
                    timer: 1500
                })
                
                    axios.get('/goals/').then((response)=>{
                    setGoals(response.data)
                    } )
                .catch((error)=>{
                    console.log(error)
                })

            });
        }catch(error){
            Swal.fire('error','Goal has not been delete')
        }
        
    }
    })
    }






return(
<div className="container">
    <div className="row">
        <div className="col-12 p-0">
            <nav aria-label="breadcrumb ">
                
            </nav>
        </div>
        <div className="col-md-5">
            <div className="row">
                <div className="col-12 bg-white p-0 px-3 py-3 mb-3">
                    <div className="d-flex flex-column align-items-center">
                        <img className="photo"
                            src={"http://127.0.0.1:8000" + profileData.picture}
                            alt="" />
                        <p className="fw-bold h4 mt-3">{profileData.user.username}</p>

                        <p className="text-muted mb-3">{profileData.user.about}</p>
                        <div className="d-flex ">
                            {/* <div className="btn btn-primary follow me-2">Follow</div> */}
                            <div className="btn btn-outline-primary message" onClick={handlePopup}>Edit</div>
                        </div>
                        {isClicked && <ProfileEdit handleClose={handlePopup} />}
                    </div>
                </div>
                <div className="col-12 bg-white p-0 px-2 pb-3 mb-3">
                    <div className="d-flex justify-content-between border-bottom py-2 px-3">
                        <p><span className="fas fa-globe me-2"></span>Total finished workouts</p>
                        <a>{profileData.user.total_workouts}</a>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2 px-3">
                        <p><span className="fab fa-github-alt me-2"></span>Body weight</p>
                        <a >{profileData.weight} kg</a>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2 px-3">
                        <p><span className="fab fa-twitter me-2"></span>Body height</p>
                        <a >{profileData.height} m</a>
                    </div>
                    
                    
                </div>
            </div>
        </div>
        <div className="col-md-7 ps-md-4">
            <div className="row">
                <div className="col-12 bg-white px-3 mb-3 pb-3">
                    <div className="d-flex align-items-center justify-content-between border-bottom">
                        <p className="py-2">First name</p>
                        <p className="py-2 text-muted">{profileData.user.first_name}</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom">
                        <p className="py-2">Email</p>
                        <p className="py-2 text-muted">{profileData.user.email}</p>
                    </div>
                   
                </div>

                <div className="col-12 bg-white px-3 pb-2">
                {isClicked1 && <GoalAdd handleClose={handlePopup1}  />}
                    <h6 className="d-flex align-items-center fw-bold py-3"><i
                        className="text-info me-2">Goals</i>
                        <i onClick={handlePopup1} className="bi bi-plus-circle"></i>
                        </h6>
                        
                     {goals.data.map((goal,index)=>(

                        <div key={index}>
                            <div className="icons" style={{float:"right"}}>
                        <i  onClick ={()=>deleteGoal(goal.id)}className="bi bi-trash3"></i>
                        </div>
    
                        <small>{goal.name}</small>
                        <span style={{float:"right"}}>{goal.value}</span>
                        <div className="p-2 icons">
       
       
        
        
    </div>
                        <div className="progress mb-3" style={{ height: "5px" }}>
                        
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: goal.current_percent+"%" }}
                                aria-valuenow="120" aria-valuemin="0" aria-valuemax={goal.value}></div>
                        </div>
                         
                        </div>
                     ))}   
                    
                    
                    
                </div>
            </div>
        </div>


        
    </div>
    <div className='row'>
   <h3 className='mt-3 mb-3'>Chart for {charSelect}</h3>
  <select  onChange = {handleChange}className="form-select" aria-label="Default select example">
  <option defaultValue='Bench press'></option>
  {exercises.map((exercise,index)=>(
    <option key={index} value={exercise}>{exercise}</option>
  ))}
 
</select>
    <Chart
                options={state.options}
                series={state.series}
                type="line"
                width="700"
                
                />
    </div>
</div>
)

}