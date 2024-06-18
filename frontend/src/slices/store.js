import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import vehicleReducer from './vehicleSlice';
import tripReducer from './tripslice'
import tireReducer from './tireSlice';

const store = configureStore({
    reducer: {
        vehicle: vehicleReducer,
        user: userReducer,
        trip: tripReducer,
        tire: tireReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck :false
    }),
});


export default store;