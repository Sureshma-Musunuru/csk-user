import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { userdatactx, userlogoutctx, usertokenctx } from "../App";
import Footer from "../components/Footer";
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";


export default function Alert()
{
    const [Alert, setAlert] = useState(null);
    const {id} = useParams();
    const frequencyRef = useRef();
    const userInfoData = useContext(userdatactx);
    const userTokenData = useContext(usertokenctx);
    const userLogoutCtx = useContext(userlogoutctx)
    const navigate = useNavigate();
    useEffect( () => {fetch('https://api.maristproject.online/api/alerts/getbyid',{ method: "POST",
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + userTokenData,
    },
    body: JSON.stringify({"id":id}),
    }).then((res) => res.json()).then((json) => {if(json){setAlert(json)}})}, [id]);


    function deleteAlert()
    {
      
        fetch('https://api.maristproject.online/api/alerts/delete', { method: "POST",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"id": Alert.id}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){navigate("/alerts")}})
    }

    function updateAlert()
    {
      
        fetch('https://api.maristproject.online/api/alerts/update', { method: "POST",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"id": Alert.id,"frequency":frequencyRef.current.value}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){alert(json.message);navigate("/alerts")}})
    }

   
      
    return(
        <>
     <div className="main-data-container container-fluid">
        <h2>My Alerts</h2>
        
     {Alert && <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='origin' label='Origin' value={Alert.origin}/>
      <MDBInput className='mb-4' type='email' id='destination' label='Destination' value={Alert.destination}/>
      <div className="form-control">
        <label className="form-label">Frequency</label>
      
      <select ref={frequencyRef} className="form-select" aria-label="Default select example">
        {Alert.frequency == "3 mins" ? <option value="3 mins" selected>3 Mins</option> : <option value="3 mins">3 Mins</option>}
        {Alert.frequency == "15 mins" ? <option value="15 mins" selected>15 Mins</option> : <option value="15 mins">15 Mins</option>}
        {Alert.frequency == "30 mins" ? <option value="30 mins" selected>30 Mins</option> : <option value="30 mins">30 Mins</option>}
        {Alert.frequency == "1 hour" ? <option value="1 hour" selected>1 Hour</option> : <option value="1 hour">1 Hour</option>}
        {Alert.frequency == "4 hours" ? <option value="4 hours" selected>4 Hours</option> : <option value="4 hours">4 Hours</option>}
       
      </select>
      </div>

     

      <MDBBtn type='button' block onClick={deleteAlert} className="mt-4 btn btn-danger">
        Delete Alert
      </MDBBtn>

      <MDBBtn type='button' block onClick={updateAlert} className="mt-4 btn btn-primary">
        update Alert
      </MDBBtn>
      </form>
}
     </div>
     <Footer/></>);
}