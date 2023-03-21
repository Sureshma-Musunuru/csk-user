import { useState, useEffect, useContext } from "react";
import {Navigate} from 'react-router-dom';
import Banner from "../components/Banner";
import Carousel from 'react-bootstrap/Carousel';
import Mcarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBRipple } from "mdb-react-ui-kit";
import Footer from "../components/Footer";
import env from "react-dotenv";
function Home()
{
    const [enteredData, setEnteredData] = useState("");
    const [changepage, setChangePage] = useState(false);
    const [banners, setBanners] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [team, setTeam] = useState([]);
    
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };



    useEffect( () => {fetch('https://api.maristproject.online/api/banners', {method:"post"}).then((res) => res.json()).then((json) => setBanners(json))},[]);
    useEffect( () => {fetch('https://api.maristproject.online/api/teams', {method:"post"}).then((res) => res.json()).then((json) => setTeamMembers(json))},[]);
   
   var htmldata = {__html : "<h1>Shiva H1 Tag</h1>"}

    function displayBanners(image_url,title,id)
    {
        return(       
      <Carousel.Item key={id}>
      <img className="d-block w-100" src={"https://api.maristproject.online/"+image_url} alt={title} />
        <Carousel.Caption>
          <h3>{title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
      );
    }
   
    return(
        <>
        <Carousel>
            {banners.map((banner) => {return(displayBanners(banner.image, banner.title, banner.id ))})}
        </Carousel>
        {changepage && <Navigate to="/profile" replace={true} />}

        {teamMembers && <div style={{marginTop:"80px"}}><h2 className="d-flex justify-content-center mx-3">Our Team</h2><Mcarousel responsive={responsive}>
          {teamMembers.map((team) => { return(<MDBCard key={team.id}>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src='/images/profile.png' fluid />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{team.name}</MDBCardTitle>
        <MDBCardTitle>{team.email}</MDBCardTitle>
        <MDBCardTitle>{team.designation}</MDBCardTitle>
        <MDBCardText>
          {team.description}
        </MDBCardText>
        <MDBBtn href='#'>Linkedin</MDBBtn>
      </MDBCardBody>
    </MDBCard>)
   })}
        </Mcarousel>

        </div> }
        <Footer/>

        </>
    )
}

export default Home;