
import { createContext, useState, useContext, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import {Route, Routes, Link, Navlink} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import GetPage from './pages/GetPage';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Alert from './pages/Alert';
import ViewAlert from './pages/ViewAlert';
import AddAlert from './pages/AddAlert';

export const userdatactx = createContext();
export const usertokenctx = createContext();
export const userloginctx = createContext();
export const userlogoutctx = createContext();

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {if(localStorage.getItem("userTokenLocal"))
  {
    setUserInfo(localStorage.getItem("userDataLocal"));
    setUserToken(localStorage.getItem("userTokenLocal"));
  }}, [])

  const userLogin = (loggedin) => {
    localStorage.setItem("userTokenLocal", loggedin.userToken);
    localStorage.setItem("userDataLocal", loggedin.userData);
    setUserInfo(loggedin.userData);
    setUserToken(loggedin.userToken);

  }

  

  const userLogout = () => {
    localStorage.removeItem("userTokenLocal");
    localStorage.removeItem("userDataLocal");
    setUserInfo(null);
    setUserToken(null);

  }

  
  


  return (
    <>
    <userdatactx.Provider value={userInfo} >
        <usertokenctx.Provider value={userToken} >
          <userloginctx.Provider value={userLogin} >
            <userlogoutctx.Provider value={userLogout} >
              <Header/>
              <Routes>
                 {!userToken ? <><Route path="/" element={<Home/>} /> <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} /> </>: <><Route path="/" element={<Profile/>} />  <Route path="/dashboard" element={<Profile/>} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/alerts" element={<Alert/>} />
                  <Route path="/alerts/:id" element={<ViewAlert/>} />
                  <Route path="/alerts/add" element={<AddAlert/>} />       
                  </>}
                  
                  <Route path="/contact" element={<Contact/>} />
                  <Route path="/faqs" element={<FAQ/>} />
                  <Route path="/:slug" element={<GetPage/>} />
              </Routes>
            </userlogoutctx.Provider>
          </userloginctx.Provider>
        </usertokenctx.Provider>
    </userdatactx.Provider>
    </>
  );
}

export default App;
