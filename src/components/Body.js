import React, { useState, useEffect } from "react";
import Map from "./Map";
import Slider from "./slider";
import { getRestaurantsData ,getHotelsData} from "./api";
import List from "./List";

function Body({
  coordinates,
  setCoordinates,
  rating,
  type,

  setType,
  arrivalDate,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [zoom, setZoom] = useState(10);
  const [places, setPlaces] = useState([]);
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({lat:latitude,lng:longitude});
      const bounds = {
        ne: { lat: latitude + 0.1, lng: longitude + 0.1 }, // Northeast corner
        sw: { lat: latitude - 0.1, lng: longitude - 0.1 }  // Southwest corner
      };
      setBounds(bounds);
    });
  }, []);

  

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(async () => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      if (type === "restaurants" || type === "attractions") {
        getRestaurantsData(type, bounds.sw, bounds.ne).then((data) => {
          setPlaces(data);
          setFilteredPlaces([]);
          setIsLoading(false);
        });
      } else if (type === "hotels") {
        
        getHotelsData(arrivalDate, coordinates.lat, coordinates.lng).then((data) => {
          console.log("data", data);
          setPlaces(data.data);
          setFilteredPlaces([]);
          setIsLoading(false);
        });
      }
    }
  }, [type, bounds, coordinates,arrivalDate]);

  return (
    <div className="flex-grow h-[90vh] flex">
      <div className=" w-[50%]">
        {console.log("restaurant", places)}
        <Slider setZoom={setZoom} />
        {/* <Card restaurant={restaurant}/> */}
        <List
          places={filteredPlaces.length ? filteredPlaces : places}
          isLoading={isLoading}
          type={type}
          setType={setType}
          childClicked={childClicked}
        />
      </div>
      <div className="w-[50%]">
        <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClicked={setChildClicked}
          zoom={zoom}
          setZoom={setZoom}
        />
      </div>
    </div>
  );
}

export default Body;
