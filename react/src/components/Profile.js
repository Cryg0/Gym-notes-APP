import axios from 'axios'
import React from 'react'

import ProfileEdit from './ProfileEdit.'
import Chart from 'react-apexcharts'



export default function Profile(){

    const [isClicked,setIsClicked]=React.useState(false)
    const handlePopup = () => {setIsClicked(prev => !prev)}
    const [profileData,setProfileData]= React.useState({'user':{},'picture':''})
    const [exercises,setExercises] = React.useState([])
    const[charSelect,setCharSelect]=React.useState('')

    

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
            axios.get("/user/profile/")
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
                    <div className="d-flex justify-content-between border-bottom py-2 px-3">
                        <p><span className="me-2"></span>Goals</p>
                        <a ></a>
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
                    <h6 className="d-flex align-items-center mb-3 fw-bold py-3"><i
                        className="text-info me-2">Goals</i>
                        </h6>
                    <small>Bench press</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "60%" }}
                            aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>Body weight</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "72%" }}
                            aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    
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