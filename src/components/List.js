import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import PlaceDetails from "./PlaceDetails";

const List = ({ places, isLoading, type, childClicked }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <div className="p-6">
      <Typography variant="h4">
        {type.charAt(0).toUpperCase() + type.slice(1)} around you
      </Typography>
      {isLoading ? (
        <div className="h-96 flex justify-center items-center">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <div className="space-y-4">
          {places?.length && (
            <>
                Displaying {places.length} result
                {places.length === 1 ? "" : "s"}
                </>
          )}
          <div className="h-[calc(100vh-245px)] overflow-auto overflow-x-hidden">
            <Grid container spacing={3}>
              {places?.map((place, i) => (
                <Grid ref={elRefs[i]} item key={i} xs={12}>
                  <PlaceDetails
                    place={place}
                    selected={Number(childClicked) === i}
                    refProp={elRefs[i]}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
