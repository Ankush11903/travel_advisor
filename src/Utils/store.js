import { configureStore } from "@reduxjs/toolkit";

import { TravelAdvisorApi } from "./rapidApi";





const store = configureStore({
    reducer: {
        [TravelAdvisorApi.reducerPath]: TravelAdvisorApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(TravelAdvisorApi.middleware),
});
export default store;