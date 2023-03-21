import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

export default function GetPage()
{
    const [pageData, setPageData] = useState("Loading....");
    const {slug} = useParams();
    useEffect( () => {fetch('https://api.maristproject.online/api/pagesbyslug',{ method: "POST",
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({"slug":slug}),
    }).then((res) => res.json()).then((json) => {if(json){setPageData(json)}else{setPageData(null)}})},[slug]);

    return(
        <>
            {pageData ? <div><h1 style={{textAlign:"center"}}>{pageData.title}</h1> <div className="container" dangerouslySetInnerHTML={{__html: pageData.content}}></div></div> : <h1>Page Not Found</h1>}<Footer/></>);
}