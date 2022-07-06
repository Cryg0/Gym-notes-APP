
import React from 'react'
import AuthContext from './context/AuthContext'

const baseUrl='http://127.0.0.1:8000/api/'

export default function Login(){
    let {loginUser} = React.useContext(AuthContext)
    
    
    
    
   return (
<div className="container">
    
        <div className="row">
           
            <div className="col-md-4 offset-md-4">
                <div className="login-form bg-light mt-4 p-4">
                    <form onSubmit={loginUser} method="" className="row g-3">
                        <h4>Welcome Back</h4>
                        <div className="col-12">
                            <label>Email</label>
                            <input  autoComplete="off" id='email' required  type="email" name="email" className="form-control" placeholder="Username"/>
                        </div>
                        <div className="col-12">
                            <label>Password</label>
                            <input  autoComplete="off" required  type="password" name="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="rememberMe"/>
                                <label className="form-check-label" for="rememberMe"> Remember me</label>

                            </div>
                        </div>
                        <div className="col-12">
                            <button  type="submit" className="btn btn-dark float-end">Login</button>
                        </div>
                    </form>
                    <hr className="mt-4"/>
                    <div className="col-12">
                        <p className="text-center mb-0">Have not account yet? <a href="/register">Signup</a></p>
                    </div>
                </div>
            </div>
            </div>
            </div>
    

    )
}