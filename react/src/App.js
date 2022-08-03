
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Workouts from './components/Workouts';
import Login from './components/Login';
import Header from './components/Header';
import Workout from './components/Workout';
import Register from './components/Register';
import PrivateRoutes from './components/PrivateRoute';
import Profile from './components/Profile'

import react from 'react'
import AuthContext from './components/context/AuthContext';




function App() {
  let {user}=react.useContext(AuthContext)

  return (
  <div className="App">
    
     
    <BrowserRouter>
    {user &&<Header/>}
      <Routes>

        <Route element ={<PrivateRoutes/>} >

          <Route path='/' element={<Workouts/>}/>
          
          <Route path='/workouts/:workoutId' element={<Workout/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
         <Route path='/login' element={<Login/>}/> 
        <Route path='/register' element={<Register/>}/>
       


      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
