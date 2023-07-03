import axios from "axios";

export const getRestaurantsData = async (type, sw, ne) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
            }
        });
        return data?.filter((place) => (place.name && place.num_reviews > 0));
    }
    catch (error) {
        console.error(error);
    }
};
const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };
export const getHotelsData = async (date, latitude, longitude) => {
    try {
        const response =await fetch(`https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=${latitude}&longitude=${longitude}&checkin=${date}`,options);
        const data=await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
};




