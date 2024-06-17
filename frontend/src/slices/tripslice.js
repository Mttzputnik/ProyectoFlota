import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trips: [],
  vehicleId: "",
  startdate: "",
  userId: "",
  endDate: "",
  route: "",
  distanceTraveled: "",
  travelTime: "",
  vehicle: "",
  user: "",
  optimizedRoute: "",
};

export const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    addTrip: (state, action) => {
      const {
        vehicleId,
        startdate,
        userId,
        endDate,
        route,
        distanceTraveled,
        travelTime,
        vehicle,
        user,
        optimizedRoute,
      } = action.payload;
      console.log(action.payload);

      state.vehicleId = vehicleId;
      state.startdate = startdate;
      state.userId = userId;
      state.endDate = endDate;
      state.route = route;
      state.distanceTraveled = distanceTraveled;
      state.travelTime = travelTime;
      state.vehicle = vehicle;
      state.user = user;
      state.optimizedRoute = optimizedRoute;
    },
    getTrips: (state, action) => {
      state.trips = action.payload;
      console.log("getTrips action triggered", action.payload);
    },
    getTripById: (state, action) => {
      console.log("getTripById action triggered with id", action.payload);
    },
    editTripById: (state, action) => {
      const { updatedTripData } = action.payload;
      return {
        ...state,
        ...updatedTripData,
      };
    },
    deleteTripById: (state, action) => {
      return initialState;
    },
  },
});

export const { addTrip, getTrips, getTripById, editTripById, deleteTripById } =
  tripSlice.actions;
export default tripSlice.reducer;
