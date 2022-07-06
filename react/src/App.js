
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Workouts from './components/Workouts';
import News from './components/News';


import Login from './components/Login';
import Header2 from './components/Header2';
import Workout from './components/Workout';
import Register from './components/Register';
import PrivateRoutes from './components/PrivateRoute';
import Profile from './components/Profile'


function App() {
  return (
    <div className="App">
    <Header2/>
     
      <BrowserRouter>
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
