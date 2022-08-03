import axios from 'axios'
import react from 'react'
import {Link} from 'react-router-dom'

export default function LatestWorkout (){
    const [latestWorkout,setLatestWorkout]=react.useState({})

    react.useEffect(()=>{
        axios.get('/workouts/latest/')
        .then((res)=>{
            setLatestWorkout(res.data)
        })
    },[])
  
    return (
        <ul>
            <Link to={'workouts/'+latestWorkout.id}>{latestWorkout.name} {latestWorkout.date}</Link>
        </ul>

    )
}