import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { userdatactx, userlogoutctx, usertokenctx } from "../App";
import Footer from "../components/Footer";
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

import {
    useJsApiLoader,
    Autocomplete,
  } from '@react-google-maps/api'
import { SkeletonText } from "@chakra-ui/react";

export default function AddAlert()
{
    const [Alert, setAlert] = useState(null);
   
    const userInfoData = useContext(userdatactx);
    const userTokenData = useContext(usertokenctx);
    const userLogoutCtx = useContext(userlogoutctx)
    const navigate = useNavigate();
   
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
      })
      if (!isLoaded) {
        return <SkeletonText />
      }
    

    function addAlert()
    {
        var origin = document.getElementById("origin").value;
        var destination = document.getElementById("destination").value;
        var frequency = document.getElementById("frequency").value;
        var frequencyperday = document.getElementById("frequencyperday").value;

        fetch('https://api.maristproject.online/api/addalert', { method: "DELETE",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"origin": origin,"destination": destination,"frequency": frequency,"frequencyperday": frequencyperday}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){navigate("/alerts")}})
    }

   
      
    return(
        <>
     <div className="container" style={{minHeight:"calc(100vh - 100px)"}}>
        <h2>Add Alert</h2>
        
     <form className='justify-content-center form-container' >
     <div className="form-control mb-3 p-3">
        <Autocomplete>
                <MDBInput type='text' id='origin' label='Origin' />
        </Autocomplete>
     </div>
     <div className="form-control mb-3 p-3">
     <Autocomplete>
        <MDBInput type='text' id='destination' label='Destination' />
     </Autocomplete>
     </div>
     
      
      
      <div className="form-control mb-3">
        <label className="form-label">Frequency</label>
      
      <select className="form-select" id="frequency" aria-label="Default select example">
        <option value="Daily">Daily</option>
        <option value="Weekdays">Weekdays</option>
        <option value="Weekends">Weekends</option>
      </select>
      </div>

      <div className="form-control mb-3">
        <label className="form-label">Frequency per day</label>
      
      <select className="form-select" id="frequencyperday" aria-label="Default select example">
        <option value="15 mins">15 mins</option>
        <option value="30 mins">Weekdays</option>
        <option value="1 hour">Weekends</option>
       
      </select>
      </div>
        <div className="row">
      <MDBBtn type='button' onClick={addAlert} className="btn btn-danger col-md-4">
       Add Alert
      </MDBBtn>
      </div>
      </form>

     </div>
     <Footer/></>);
}