import AuthContext from './context/AuthContext'
import React from 'react'
import {Link} from 'react-router-dom'

export default function Header(){

let {user,logoutUser}= React.useContext(AuthContext)

return (
  <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light " >
    <div className="container-fluid">
      <a className="navbar-brand" href="/"><img className="navbar-logo" src="./logo.jfif" alt="logo" /></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" ><h5>Note your workouts</h5></a>
          </li>

          <li className="nav-item ">
            <Link className="nav-link ms-5" to="/">Workouts</Link>
          </li>
        </ul>


        {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">


          <li className="nav-item ">
            <form className="d-flex"  >
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

          </li>
        </ul> */}

        {user == null &&
          <ul className="navbar-nav ms-auto mb-5 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " href="/login" tabIndex="-1" aria-disabled="true">Login</Link>
            </li>
          </ul>
        }




        {user &&
          <ul className="navbar-nav ms-auto mb-5 mb-lg-0">
            <li className="nav-item  dropdown   " >
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {user.username}
              </a>
              <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                
                <li><hr className="dropdown-divider" /></li>
                <li><a onClick={logoutUser} className="dropdown-item" >Logout</a></li>
              </ul>
            </li>
          </ul>
        }

      </div>
    </div>
  </nav>

    )
}