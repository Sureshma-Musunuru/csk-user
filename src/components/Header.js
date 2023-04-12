import {Link, Navlink} from 'react-router-dom';
import { useContext } from 'react';
import { userdatactx, userlogoutctx, usertokenctx } from '../App';
import { Button } from 'react-bootstrap';


function Header()
{
    const userInfoData = useContext(userdatactx);
    const userTokenData = useContext(usertokenctx);
    const userLogoutCtx = useContext(userlogoutctx)

    function userLogout()
    {
        
      fetch('https://api.maristproject.online/api/logout', {method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
      },
      }).then((res) => res.json())
      .then((json) => {
                        if(json.status == "success")
                        {userLogoutCtx()}
                      }
                      )
    }
    return(
       <>
        <header style={{display: "inline-block", width : "100%"}}>
         
        <nav className="navbar navbar-expand-md navbar lightbg" aria-label="Fourth navbar example">
                <div className="container-fluid">
                  <Link to="/"><img src="images/logo.jpg" style={{maxWidth:"200px"}} alt="CSK Project" /></Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
            
                  <div className="collapse navbar-collapse justify-content-end" id="main-nav">
                     <ul className="navbar-nav mb-2 mb-md-0">
                                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/terms">Terms</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/faqs">FAQs</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                                
                                {userTokenData ? <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    My Account
                                    </Link>
                                    <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/alerts">Alerts</Link></li>
                                    <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                                    <li><Button className="logout" onClick={userLogout}>Logout</Button></li>
                                    </ul>
                                </li> : <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    My Account
                                    </Link>
                                    <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                    <li><Link className="dropdown-item" to="/register">Register</Link></li>
                                    </ul>
                                </li>}
                       </ul>
                  </div>
                </div>
              </nav>
              
        </header>
        </>
    )
}

export default Header;