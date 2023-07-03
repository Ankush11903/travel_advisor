import ReactDOM from "react-dom";


import Navbar from "./Navbar";
import Body from "./Body";

import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';


const App = () => {
  
  
  const [coordinates, setCoordinates] = useState({});
  
  
  
  const [type, setType] = useState('restaurants');
 
  const [autocomplete, setAutocomplete] = useState(null);
  const [rating, setRating] = useState(0);
  const [arrivalDate, setArrivalDate] = useState("");
  


  
      
      
      
      
    
  // }, [type, bounds]);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry?.location.lat();
    const lng = autocomplete.getPlace().geometry?.location.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <>
      {console.log("coordinates", coordinates)}
      <Navbar onLoad={onLoad} onPlaceChanged={onPlaceChanged} setType={setType} rating={rating} setRating={setRating} arrivalDate={arrivalDate} setArrivalDate={setArrivalDate}   /><ToastContainer />
      <Body coordinates={coordinates} setCoordinates={setCoordinates}   type={type} setType={setType} rating={rating} setRating={setRating} arrivalDate={arrivalDate}   />
      
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
