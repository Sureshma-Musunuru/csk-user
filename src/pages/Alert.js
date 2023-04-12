import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { userdatactx, userlogoutctx, usertokenctx } from "../App";
import Footer from "../components/Footer";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";


export default function Alert()
{
    const [allAlerts, setAllAlerts] = useState([]);
   
    const userInfoData = useContext(userdatactx);
    const userTokenData = useContext(usertokenctx);
    const userLogoutCtx = useContext(userlogoutctx)

    useEffect( () => {fetch('https://api.maristproject.online/api/alerts/get',{ method: "POST",
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + userTokenData,
    },
    }).then((res) => res.json()).then((json) => {if(json){setAllAlerts(json)}})},[]);

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
        },
        {
          name: 'Origin',
          selector: row => row.origin,
      },
        {
            name: 'Destination',
            selector: row => row.destination,
        },
        {
          name: 'Edit',
          selector: row =>  <Link className="btn btn-primary edit-button" to={"/alerts/" + row.id}>Edit</Link>,
      },
      ];

      
    return(
        <>
     <div className="main-data-container container-fluid">
        <h2>My Alerts</h2>
        
     <DataTable columns={columns} data={allAlerts} />
     </div>
     <Footer/></>);
}