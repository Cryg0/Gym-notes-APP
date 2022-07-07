import axios from 'axios'
import React from 'react'
import AuthContext from './context/AuthContext'
import ProfileEdit from './ProfileEdit.'



export default function Profile(){

    let {authTokens}=React.useContext(AuthContext)
    const [isClicked,setIsClicked]=React.useState(false)
    const handlePopup = () => {setIsClicked(prev => !prev)}
    const [profileData,setProfileData]= React.useState({'user':{},'picture':''})


    React.useEffect(()=>{
        try{
            axios.get("http://127.0.0.1:8000/api/user/profile/",
            {headers:{'Authorization':'JWT '+String(authTokens.access)}})
            .then((response)=>{
                setProfileData(response.data)
            })
        }catch(error){
            console.log(error)
        }
    },[isClicked])



    return(
        <div className="container">
        <div className="row">
            <div className="col-12 p-0">
                <nav aria-label="breadcrumb ">
                    <ol className="breadcrumb py-3 px-3">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Library</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                </nav>
            </div>
            <div className="col-md-5">
                <div className="row">
                    <div className="col-12 bg-white p-0 px-3 py-3 mb-3">
                        <div className="d-flex flex-column align-items-center">
                            <img className="photo"
                                src={"http://127.0.0.1:8000"+profileData.picture}
                                alt=""/>
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
                            <a href="#">{profileData.user.total_workouts}</a>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2 px-3">
                            <p><span className="fab fa-github-alt me-2"></span>gkfgh</p>
                            <a href="">bootdey</a>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2 px-3">
                            <p><span className="fab fa-twitter me-2"></span>Twitter</p>
                            <a href="">@bootdey</a>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2 px-3">
                            <p><span className="fab fa-instagram me-2"></span>Instagram</p>
                            <a href="">bootdey</a>
                        </div>
                        <div className="d-flex justify-content-between py-2 px-3">
                            <p><span className="fab fa-facebook-f me-2"></span>facebook</p>
                            <a href="">bootdey</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-7 ps-md-4">
                <div className="row">
                    <div className="col-12 bg-white px-3 mb-3 pb-3">
                        <div className="d-flex align-items-center justify-content-between border-bottom">
                            <p className="py-2">Full Name</p>
                            <p className="py-2 text-muted">{profileData.user.first_name}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-bottom">
                            <p className="py-2">Email</p>
                            <p className="py-2 text-muted">{profileData.user.email}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-bottom">
                            <p className="py-2">Phone</p>
                            <p className="py-2 text-muted">(239) 816-9029</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-bottom">
                            <p className="py-2">Mobile</p>
                            <p className="py-2 text-muted">(320) 380-4539</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <p className="py-2">Address</p>
                            <p className="py-2 text-muted"> Soma,San Francisco,CA</p>
                        </div>
                    </div>
                    <div className="col-12 bg-white px-3 pb-2">
                        <h6 className="d-flex align-items-center mb-3 fw-bold py-3"><i
                                className="text-info me-2">assignment</i>Project
                            Status</h6>
                        <small>Web Design</small>
                        <div className="progress mb-3" style={{height: "5px"}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "60%"}}
                                aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <small>One Page</small>
                        <div className="progress mb-3" style={{height: "5px"}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "72%"}}
                                aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <small>Mobile Template</small>
                        <div className="progress mb-3" style={{height: "5px"}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "50%"}}
                                aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <small>Backend API</small>
                        <div className="progress mb-3" style={{height: "5px"}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "90%"}}
                                aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <small>Website Markup</small>
                        <div className="progress mb-3" style={{height: "5px"}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}}
                                aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}