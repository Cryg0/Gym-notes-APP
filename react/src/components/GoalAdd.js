import React from "react";
import axios from 'axios'
import AuthContext from './context/AuthContext'

const GoalAdd = props => {
    let {user} = React.useContext(AuthContext)

    const [goalData,setGoalData] = React.useState({
      'name':'',
      'value':'',
      'user':user.user_id
      
      
    })
    
const handleChange=(event)=>{

  setGoalData({
    ...goalData,
    [event.target.name]:event.target.value
  })
}

const formSubmit=()=>{

    const goalForm = new FormData()
    
    goalForm.append('name',goalData.name)
    goalForm.append('value',goalData.value)
    goalForm.append('user',goalData.user)

try{
  axios.post("/goals/",goalForm)
  .then((res)=>{
    if(res.status===201){
    
    
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
    <input onChange={handleChange} name='name' type="text" className="form-control" />
  </div>
  <div className="mb-3">
    <label  className="form-label">Value</label>
    <input onChange={handleChange} name='value' type="text" className="form-control" />
  </div>

  <button onClick={formSubmit} type="button" className="btn btn-primary">Submit</button>
</form>
      </div>
    </div>
  );
;



}




export default GoalAdd;