import { userdatactx, userloginctx, userlogoutctx, usertokenctx } from "../App";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';
  import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
  } from '@chakra-ui/react'
  import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { useContext, useEffect } from "react";
import { Button as BButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  PolylineF,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import { getFirebaseToken } from "../firebase";

const center = { lat: 41.72324931731098, lng: -73.93445541543795 }



  export default function Profile()
{
    const userInfoData = useContext(userdatactx);
    const userTokenData = useContext(usertokenctx);
    const userLogoutCtx = useContext(userlogoutctx)

    const LoggedinUser = JSON.parse(userInfoData);
    const [isTokenFound, setTokenFound] = useState(false);
    const [alertSet, setAlertSet] = useState("no");
    
    useEffect(() => {getFirebaseToken(setTokenFound)},[userTokenData]);

    var firebase_token =  localStorage.getItem("firebase_token");
    useEffect(() => {if(firebase_token)
    {
      fetch('https://api.maristproject.online/api/updatetoken', {method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
      },
      body:JSON.stringify({"firebase_token" : firebase_token})
      }).then((res) => res.json())
      .then((json) => {
                        if(json.status == "success")
                        console.log("token updated")
                      }
                      )
    }},[firebase_token]);

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
                      {userLogoutCtx()}
    }

    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    })
  
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [originTemp, setOriginTemp] = useState('')
    const [destTemp, setDestTemp] = useState('')
    const [trafficstatus, settrafficstatus] = useState('')
    const [speedsets, setspeedsets] = useState([]);
    const [decodedpolyline, setdecodedpolyline] = useState([]);

    var origin_temp;
    var destination_temp;
    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()
    const frequencyRef = useRef()

  
    if (!isLoaded) {
      return <SkeletonText />
    }
  
    async function calculateRoute() {
      if (originRef.current.value === '' || destiantionRef.current.value === '') {
        return
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
      console.log("origin  :  "+ originRef.current.value);
      console.log("destination  :  "+ destiantionRef.current.value);
      
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
     var origin_lat = results.routes[0].legs[0].start_location.lat();
      var origin_lng = results.routes[0].legs[0].start_location.lng();
      var dest_lat = results.routes[0].legs[0].end_location.lat();
      var dest_lng = results.routes[0].legs[0].end_location.lng();

      var distance_ =  results.routes[0].legs[0].distance.value;
      var time_ = results.routes[0].legs[0].duration.value;
      console.log("distance " + distance_);
      console.log("time " + time_);
      var traffic_time = distance_ / time_;
      if(traffic_time < 10000 && traffic_time > 8)
      {
          console.log("traffic status is low")
          settrafficstatus("low");
      }

      if(traffic_time < 8 && traffic_time > 5)
      {
          console.log("traffic status is medium")
          settrafficstatus("medium");
      }

      if(traffic_time < 5 && traffic_time > 1)
      {
          console.log("traffic status is high")
          settrafficstatus("high");
      }


      console.log("origin lat : " + origin_lat);
      console.log("origin lng : " + origin_lng);
      console.log("dest lat : " + dest_lat);
      console.log("dest lng : " + dest_lng);
      localStorage.setItem("origin_lat",origin_lat);
      localStorage.setItem("dest_lat",dest_lat);
      localStorage.setItem("origin_lng",origin_lng);
      localStorage.setItem("dest_lng",dest_lng);

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${origin_lat}&lon=${origin_lng}&units=metric&appid=d885aa1d783fd13a55050afeef620fcb`).then(
      response=> response.json()).then(
        data => {
          origin_temp = Math.round(data.main.temp)+"°C";
          setOriginTemp(origin_temp);
        }
      ).catch(error => console.log(error))

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${dest_lat}&lon=${dest_lng}&units=metric&appid=d885aa1d783fd13a55050afeef620fcb`).then(
        response=> response.json()).then(
          data => {
            destination_temp = Math.round(data.main.temp)+"°C";
            setDestTemp(destination_temp);
          }
        ).catch(error => console.log(error))
      setAlertSet("yes");

       
        var currentTime = new Date();
        var currentOffset = currentTime.getTimezoneOffset();
        var ISTOffset = 330; 
        var ISTTime = new Date(currentTime.getTime() + ISTOffset*60000);
        var date_time = ISTTime.toISOString();
        console.log("date  :   "+ date_time);
        var request_data = {
          "origin":{
            "location":{
              "latLng":{
                "latitude": origin_lat,
                "longitude": origin_lng
              }
            }
          },
          "destination":{
            "location":{
              "latLng":{
                "latitude": dest_lat,
                "longitude": dest_lng
              }
            }
          },
          "travelMode": "DRIVE",
          "routingPreference": "TRAFFIC_AWARE_OPTIMAL",
          "extraComputations": ["TRAFFIC_ON_POLYLINE"],
         
          "computeAlternativeRoutes": false,
          "routeModifiers": {
            "avoidTolls": false,
            "avoidHighways": false,
            "avoidFerries": false
          },
          "languageCode": "en-US",
          "units": "IMPERIAL"
        }; 
        //https://routes.googleapis.com/directions/v2:computeRoutes
         fetch(`https://routes.googleapis.com/directions/v2:computeRoutes`,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key' : "AIzaSyCJ-U-AruCKD2yyfEam5wMcWAMCIVT6BS8",
            'X-Goog-FieldMask': '*'
          },
          body: JSON.stringify(request_data)
         } ).then(
        response=> response.json()).then(
          data => {
            setDirectionsResponse(results)
            console.log("poly line : " + data.routes[0].polyline.encodedPolyline)
            var decodePolyline = require('decode-google-map-polyline');
  var polyline = data.routes[0].polyline.encodedPolyline;
  console.log(decodePolyline(polyline));
setdecodedpolyline(decodePolyline(polyline));
  setspeedsets(data.routes[0].travelAdvisory.speedReadingIntervals);

          }
        ).catch(error => console.log(error))
        

    }
  
    function clearRoute() {
      setDirectionsResponse(null)
      setDistance('')
      setDuration('')
      originRef.current.value = ''
      destiantionRef.current.value = ''
    }

    function setAlert()
    {
      var origin = originRef.current.value.split(",")[0];
      var destination = destiantionRef.current.value.split(",")[0];
      let origin_lat = localStorage.getItem("origin_lat");
      let destination_lat = localStorage.getItem("dest_lat");
      let origin_lon = localStorage.getItem("origin_lng");
      let destination_lon = localStorage.getItem("dest_lng");
      let origin_temp = localStorage.getItem("origin_temp");
      let destination_temp = localStorage.getItem("dest_temp");
      var frequency = frequencyRef.current.value;
      fetch("https://api.maristproject.online/api/alerts/add",{method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
      },
      body: JSON.stringify({"origin":origin,
                            "destination":destination,
                            "origin_lat":origin_lat,
                            "origin_lon":origin_lon,
                            "destination_lat":destination_lat,
                            "origin_temp":originTemp,
                            "destination_temp":destTemp,
                            "destination_lon":destination_lon,
                            "frequency":frequency
                          }),
      }).then(
        response=> response.json()).then(
          data => {
            alert(data.message);
          }
        ).catch(error => console.log(error))
      
        setAlertSet("done");
    }
  
    return (

        <Flex
        position='relative'
        flexDirection='row'
        alignItems='center'
        h='calc(100vh - 70px)'
        w='100%'
      >
         <Box
          p={4}
          borderRadius='lg'
          m={4}
          bgColor='white'
          shadow='base'
          minW='container.md'
          zIndex='1'
          w="25%"
          h="100%"
        >
          <div className="form-group my-4">
            <label className="form-label">Origin</label>
            <Autocomplete>
                <input type='text' className="form-control" placeholder='Origin' ref={originRef} />
              </Autocomplete>
          </div>

          <div className="form-group my-4">
            <label className="form-label">Destination</label>
            <Autocomplete>
                <input type='text' className="form-control" placeholder='Destination' ref={destiantionRef} />
              </Autocomplete>
          </div>

          <div className="row">
              <Button className="btn btn-danger py-2 px-3 mx-2" onClick={clearRoute}>Clear Route</Button>
              <Button className="btn btn-primary py-2 px-3 mx-2" onClick={calculateRoute}>Calculate Route</Button>
          </div>
          <div className="distance-box mt-4">
            <div className="container my-2">
            <Text>Distance: {distance} </Text>
            </div>

            <div className="container my-2">
            <Text>Duration: {duration} </Text>
            </div>
            
            <p className="mx-2">Traffic is {trafficstatus}</p>

          </div>
          {alertSet === "yes" && <>
          <div className="weather-report">
              <div className="mx-2">
                <Text>Origin Temp: {originTemp} </Text>
              </div>
              <div className="mx-2">
                  <Text>Destination Temp: {destTemp} </Text>
              </div> 
            </div>
            <div className="setalert row mx-2">
            <p>Set Weather Alert frequency</p>
            <div className="col-md-6">
              <select className="form-control" name="frequency" ref={frequencyRef}>
                <option value="3 mins">3 Mins</option>
                <option value="15 mins">15 Mins</option>
                <option value="30 mins">30 Mins</option>
                <option value="1 hour">1 Hour</option>
                <option value="4 hour">4 Hours</option>
              </select>
            </div>
              <div className="col-md-4">
              <Button className="btn btn-secondary py-2 px-4" onClick={setAlert}>
               Set Alerts
              </Button>
              </div>
          </div>
          </>}

            {alertSet === "done" && 
            <>
          <div className="weather-report my-4">
              <div className="mx-2">
                <Text>Origin Temp: {originTemp} </Text>
              </div>
              <div className="mx-2">
                  <Text>Destination Temp: {destTemp} </Text>
              </div> 
            </div>
          
              <div className="mx-2">
                <Text>Alerts has been set successfully</Text>
              </div>
              <div className="mx-2">
                  <Link to="/alerts" className="alert-link">My Alerts</Link>
              </div> 
            </>
            }
            

            
         
          

        </Box>

        <Box h='100%' w='75%'>
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >
            <Marker position={center} />
            {
                directionsResponse && <>
              <DirectionsRenderer directions={directionsResponse} />
              <PolylineF  onLoad={console.log("polyline 1 ")} path={decodedpolyline}
                        options={{strokeColor: '#3492eb',
                        strokeOpacity: 0.8,
                        strokeWeight: 10,
                        fillColor: '#3492eb',
                        fillOpacity: 0.35,
                        clickable: false,
                        draggable: false,
                        editable: false,
                        visible: true,
                        radius: 30000,
                        paths: decodedpolyline,
                        zIndex: 10000}}  />
                {
                    speedsets.map( (speedinfo) => { if(speedinfo.speed == "SLOW")
                    {
        console.log("speedinfo.speed 1");

                        var start_loc = speedinfo.startPolylinePointIndex;
                        var end_loc = speedinfo.endPolylinePointIndex;
                        var path = [];
                        for(var i = start_loc; i <= end_loc; i++)
                        {
                            path.push(decodedpolyline[i]);
                        }
                        console.log("Slower paths : ");
                        console.log(path);
                        var options = {
                            strokeColor: '#f7c736',
                            strokeOpacity: 0.8,
                            strokeWeight: 10,
                            fillColor: '#f7c736',
                            fillOpacity: 0.35,
                            clickable: false,
                            draggable: false,
                            editable: false,
                            visible: true,
                            radius: 30000,
                            paths: path,
                            zIndex: 20000
                        };
                        return <PolylineF  onLoad={console.log("jjj")} path={path}
                        options={options}  />
                    }
            })

                }

{
        speedsets.map( (speedinfo) => {  if(speedinfo.speed == "TRAFFIC_JAM")
        {
            var start_loc = speedinfo.startPolylinePointIndex;
            var end_loc = speedinfo.endPolylinePointIndex;
            var path = [];
            for(var i = start_loc; i <= end_loc; i++)
            {
                path.push(decodedpolyline[i]);
            }
            console.log("Trafffic Jams paths : ");
            console.log(path);
            var options = options = {
                strokeColor: '#a23633',
                strokeOpacity: 0.8,
                strokeWeight: 10,
                fillColor: '#a23633',
                fillOpacity: 0.35,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                radius: 30000,
                paths: path,
                zIndex: 20000
              };
            return <PolylineF  path={path}
            options={options}  />
        }
    })
    }

                </>
              }
          </GoogleMap>
        </Box>
       
      </Flex>          

    )
}