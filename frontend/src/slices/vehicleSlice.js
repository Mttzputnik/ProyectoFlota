import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vehicles: [],
    brand: "",
    model: "",
    year: 0,
    fuelType: "",
    licensePlate: "",
    mileage: 0,
    status: "",
    maintenances: [],
    trips: [],
    documents: [],
    tires: [],
    fuelConsumptions: [],
};

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    addVehicle: (state, action) => {
      const {
        brand,
        model,
        year,
        fuelType,
        licensePlate,
        mileage,
        status,
        maintenances,
        trips,
        documents,
        tires,
        fuelConsumptions,
      } = action.payload;
      console.log(action.payload);

      state.brand = brand;
      state.model = model;
      state.year = year;
      state.fuelType = fuelType;
      state.licensePlate = licensePlate;
      state.mileage = mileage;
      state.status = status;
      state.maintenances = maintenances;
      state.trips = trips;
      state.documents = documents;
      state.tires = tires;
      state.fuelConsumptions = fuelConsumptions;
    },
    getVehicles: (state, action) => {
      state.vehicles = action.payload;
      console.log("getVehicles action triggered", action.payload);
    },
    getVehicleById: (state, action) => {
      console.log("getVehicleById action triggered with id", action.payload);
    },
    editVehicleById: (state, action) => {
      const { updatedVehicleData } = action.payload;
      return {
        ...state,
        ...updatedVehicleData,
      };
    },
    deleteVehicleById: (state, action) => {
      return initialState;
    },
  },
});

export const {
  addVehicle,
  getVehicles,
  getVehicleById,
  editVehicleById,
  deleteVehicleById,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
