import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TravelAdvisorApi = createApi({
  reducerPath: 'TravelAdvisorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://travel-advisor.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'e732dd34d2msh920d4344be8f614p18c306jsnd69853c5ae1f');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getHotels: builder.query({ query: ({lat, lng}) => `/hotels/list-by-latlng?latitude=${lat}&longitude=${lng}&lang=en_US&hotel_class=1%2C2%2C3&limit=30&adults=1&amenities=beach%2Cbar_lounge%2Cairport_transportation&rooms=1&child_rm_ages=7%2C10&currency=USD&checkin=2022-03-08&zff=4%2C6&subcategory=hotel%2Cbb%2Cspecialty&nights=2` })
  })
});

export const {
    useGetHotelsQuery,
} = TravelAdvisorApi;