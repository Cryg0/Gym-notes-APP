import React from 'react'
import { Link } from 'react-router-dom';

export default function Header(){

    const [isWide,setIsWide] = React.useState(false)

    function handleClick(){
        
        setIsWide(prev =>!prev)
    }

    const [isDark,setIsDark]= React.useState(false)

    function handleClick2() {
        setIsDark(prev =>!prev)
    }
 

    return (<div>

<meta charSet="UTF-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    
   
   
    
   
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'/>
    
<title>Dashboard Sidebar Menu</title>
        <body className={isDark ? "dark" : "white" }>
        <nav className={isWide ? "sidebar" : "sidebar close" }>
        <header>
            <div className="image-text">
                <span className="image">
                    <img src="logo2.jpg" alt=""/>
                </span>

                <div className="text logo-text">
                    <span className="name">Codinglab</span>
                    <span className="profession">Web developer</span>
                </div>
            </div>

            <i  onClick={handleClick}className='bx bx-chevron-right toggle' > </i>
        </header>

        <div className="menu-bar">
            <div className="menu">

                <li className="search-box">
                    <i className='bx bx-search icon'></i>
                    <input type="text" placeholder="Search..."/>
                </li>

                <ul className="menu-links">
                    <li className="nav-link">
                        <a href="/">
                            <i className='bx bx-home-alt icon' ></i>
                            <span className="text nav-text">Dashboard</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="#">
                            <i className='bx bx-bar-chart-alt-2 icon' ></i>
                            <span className="text nav-text">Revenue</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="#">
                            <i className='bx bx-bell icon'></i>
                            <span className="text nav-text">Notifications</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="#">
                            <i className='bx bx-pie-chart-alt icon' ></i>
                            <span className="text nav-text">Analytics</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="#">
                            <i className='bx bx-heart icon' ></i>
                            <span className="text nav-text">Likes</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="/news">
                            <i className='bx bx-wallet icon' ></i>
                            <span className="text nav-text">Wallets</span>
                        </a>
                    </li>

                </ul>
            </div>

            <div className="bottom-content">
                <li className="">
                    <a href="#">
                        <i className='bx bx-log-out icon' ></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>

                <li className="mode">
                    <div className="sun-moon">
                        <i className='bx bx-moon icon moon'></i>
                        <i className='bx bx-sun icon sun'></i>
                    </div>
                    <span className="mode-text text">{isDark ? "Light mode" :"Dark mode"}</span>

                    <div className="toggle-switch">
                        <span onClick={handleClick2}className="switch"></span>
                    </div>
                </li>
                
            </div>
        </div>

    </nav>
    </body>
   
    

 
    </div>)
}