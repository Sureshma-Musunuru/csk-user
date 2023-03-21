import { useEffect, useState } from "react";
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import Footer from "../components/Footer";

export default function FAQ()
{
    const [faqData, setFaqData] = useState([]);
   
    useEffect( () => {fetch('https://api.maristproject.online/api/faqs',{ method: "POST",
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    }).then((res) => res.json()).then((json) => {if(json){setFaqData(json)}else{setFaqData(null)}})},[]);
 
    return(
        <>
            {faqData ? <div><h1 style={{textAlign:"center"}}>Frequently Asked Questions</h1> 
            <div className="container">
            <MDBAccordion initialActive={1}>
            { faqData.map( (faq,index) => {return(
      <MDBAccordionItem key={index} collapseId={{index}} headerTitle={faq.question}>
        {faq.answer}
      </MDBAccordionItem>)})   }
      </MDBAccordion>
            </div></div> : <h1>No Data Found</h1>}
            <Footer/>
            </>);
}