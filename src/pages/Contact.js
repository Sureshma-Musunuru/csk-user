import { useContext, useState } from "react";
import { userloginctx } from "../App";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBTextArea
  }
  from 'mdb-react-ui-kit';
import Footer from "../components/Footer";

export default function Contact()
{
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState("");

    function sendMessage()
    {
        var inputEmail = document.getElementById("userInputEmail").value;
        var inputName = document.getElementById("userInputName").value;
        var inputMessage = document.getElementById("userInputMessage").value;

        fetch('https://api.maristproject.online/api/messages/add', { method: "POST",
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email" : inputEmail, "name" : inputName, "message" : inputMessage}),
    }).then((res) => res.json())
    .then((json) => {
                      if(json.status == "success")
                      {setFormSubmitted(true)}
                    }
                    )
    }

    return(
        <> <MDBContainer className="my-5">
            <h1 style={{textAlign:"center"}}>Contact Us</h1>
        <MDBCard>
          <MDBRow className='g-0'>
  
            <MDBCol md='6'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
            </MDBCol>
  
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>

                <div className='d-flex flex-row mt-2'>
                  <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                  <span className="h1 fw-bold mb-0"><img src="/images/logo.jpg" /></span>
                </div>

                {formSubmitted && <div className='d-flex flex-row mt-2'>
                  <p className="success-toast">Form Sumbitted sucessfully</p>
                </div>}
  
                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Please fill this form, We will contact you soon</h5>
  
                  <MDBInput wrapperClass='mb-4' label='Name' id='userInputName' type='email' size="lg" value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                  <MDBInput wrapperClass='mb-4' label='Email address' id='userInputEmail' type='email' size="lg" value={userEmail}  onChange={(e) => {setUserEmail(e.target.value)}}/>
                  <MDBTextArea wrapperClass='mb-4' label='Message' id='userInputMessage' size="lg" value={userMessage}  onChange={(e) => {setUserMessage(e.target.value)}}/>
                 
  
                <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={sendMessage}>Send Message</MDBBtn>
  
              </MDBCardBody>
            </MDBCol>
  
          </MDBRow>
        </MDBCard>
  
      </MDBContainer>
      <Footer/>
      </>
    )
}

