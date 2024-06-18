import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import vehicleReducer from './vehicleSlice';
import tripReducer from './tripslice'
import tireReducer from './tireSlice';
import taskReducer from './taskSlice';
import listReducer from './listSlice';
import maintenanceReducer from './maintenanceSlice';

const store = configureStore({
    reducer: {
        vehicle: vehicleReducer,
        user: userReducer,
        trip: tripReducer,
        tire: tireReducer,
        task: taskReducer,
        list: listReducer,
        maintenance: maintenanceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck :false
    }),
});


export default store;