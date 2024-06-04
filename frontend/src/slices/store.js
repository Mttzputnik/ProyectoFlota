import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import vehicleReducer from './vehicleSlice';

const store = configureStore({
    reducer: {
        vehicle: vehicleReducer,
        user: userReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck :false
    }),
});


export default store;