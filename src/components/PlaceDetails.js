import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6} className="flex h-56">
      <CardMedia 
        className="h-56 w-[48%]"
        image={place?.photo?.images?.large?.url ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent className="w-[40%]">
        <div gutterBottom variant="h6" className="text-lg font-bold">{place.name}</div>
        <Box className="flex justify-between">
          <Rating name="read-only" value={Number(place.rating)} readOnly size="small" />
          <Typography component="legend" className="text-sm">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box className="flex justify-between">
          <div className="text-xs">Ranking{place.ranking}</div>
        </Box>
        {place?.awards?.map((award) => (
          <div key={award.display_name} className="flex justify-between items-center">
            <img src={award.images.small} alt={award.display_name} />
            <div className="text-sm text-secondary">{award.display_name}</div>
          </div>
        ))}
        {place?.cuisine?.slice(0, 2).map(({ name }) => (
  <Chip key={name} size="small" label={name} className=" text-xs" />
))}

        {place?.address && (
          <div gutterBottom  className="flex items-center text-xs text-secondary mt-2">
            <LocationOnIcon fontSize="small" /> {place.address}
          </div>
        )}
        {place?.phone && (
          <div gutterBottom variant="subtitle2" className="flex items-center text-xs">
            <PhoneIcon fontSize="small" /> {place.phone}
          </div>
        )}
        <div>
          {place?.web_url && <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>Trip Advisor</Button>}
          {place?.website && <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>Website</Button>}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
