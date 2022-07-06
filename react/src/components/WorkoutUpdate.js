import React from "react";
import axios from 'axios'
import AuthContext from "./context/AuthContext";

const baseUrl = 'http://127.0.0.1:8000/api'


const WorkoutUpdate = props => {

  const { authTokens, user } = React.useContext(AuthContext)
  const [workoutData, setWorkoutData] = React.useState({
    'name': '',
    'date': '',
    'user': '',
    'status': ''
  })


  const handleChange = (event) => {

    setWorkoutData({
      ...workoutData,
      [event.target.name]: event.target.value
    })
  }

  const formSubmit = () => {

    const workoutForm = new FormData()
    workoutForm.append('name', workoutData.name)
    workoutForm.append('date', workoutData.date)
    workoutForm.append('user', user.user_id)
    workoutForm.append('status', workoutData.status)

    
    try {
      axios.put(baseUrl + "/workouts/" + props.workout + '/', workoutForm,
        { headers: { 'Authorization': 'JWT ' + String(authTokens.access) } }
      )
        .then((res) => {
          if (res.status === 200) {
            const Swal = require('sweetalert2')
            Swal.fire({
              position: 'top-right',
              toast: true,
              icon: 'success',
              title: 'Workout details updated',
              showConfirmButton: false,
              timeProgressBar: true,
              timer: 1500
            })
            props.handleClose()
          }
        })
    } catch (error) {
      console.log(error)
    }



  }
  React.useEffect(() => {
    try {
      axios.get(baseUrl + '/workouts/' + props.workout + '/',
        { headers: { 'Authorization': 'JWT ' + String(authTokens.access) } })
        .then((res) => {
          setWorkoutData(res.data);
        });
    } catch (error) {
      console.log(error)
    }
  }, [])



  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
        <form>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input value={workoutData.name} onChange={handleChange} name='name' type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Date: {workoutData.date.slice(0, 10) + ' ' + workoutData.date.slice(11, 16)}</label>
            <input value={workoutData.date} onChange={handleChange} name='date' type="datetime-local" className="form-control" />

          </div>
          <div className="mb-3">
            <label className="form-label me-3">Status </label>
            <select value={workoutData.status} onChange={handleChange} name="status">
              <option value='active'>Active</option>
              <option value='finished'>Finished</option>
            </select>

          </div>



          <button onClick={formSubmit} type="button" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </div>
  );
  ;



}




export default WorkoutUpdate;