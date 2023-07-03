import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';



export default function Map ({setCoordinates, setBounds, coordinates,  setChildClicked,zoom,setZoom
    ,
    places
}) {
    
    const [searchEnabled, setSearchEnabled] = useState(false);

    const handleCheckboxChange = (e) => {
      setSearchEnabled(e.target.checked);
    };
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');

    return(
        <div className="h-[100%] w-[100%] relative">
            <div className="absolute top-10 left-64 z-20 bg-white rounded-3xl p-2 ">
        <label htmlFor="search-checkbox" className="flex items-center space-x-2">
          <input
          className="w-5 h-5"
            id="search-checkbox"
            type="checkbox"
            checked={searchEnabled}
            onChange={handleCheckboxChange}
            onChildClick={(child) => {
                setChildClicked(child)
            }}
          />
          <span className="text-base font-medium">Search as I move the map</span>
        </label>
        </div>
            
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                center={coordinates}
                zoom={zoom}
  setZoom={setZoom}
                margin={[50,50,50,50]}
                options={''}
                onChange={(e) => {
                    if(searchEnabled) {
                        setCoordinates({lat: e.center.lat, lng: e.center.lng});
                        setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                    }
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color='primary' fontSize='large' />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place?.photo?.images?.large?.url ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}
            </GoogleMapReact>
        </div> 
    )
}