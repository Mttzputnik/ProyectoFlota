import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tires: [],
    brand: "",
    model: "",
    installationDate: "",
    mileage: 0,
    wear: 0,
};

export const tireSlice = createSlice({
  name: "tire",
  initialState,
  reducers: {
    addTire: (state, action) => {
      const { brand, model, installationDate, mileage, wear } = action.payload;
      state.tires.push({ brand, model, installationDate, mileage, wear });
    },
    getTires: (state, action) => {
      state.tires = action.payload;
    },
    getTireById: (state, action) => {
      const tire = state.tires.find(t => t.id === action.payload.id);
      if (tire) {
        return { ...state, ...tire };
      }
    },
    editTireById: (state, action) => {
      const index = state.tires.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tires[index] = action.payload;
      }
    },
    deleteTireById: (state, action) => {
      state.tires = state.tires.filter(t => t.id !== action.payload.id);
    },
  },
});

export const {
  addTire,
  getTires,
  getTireById,
  editTireById,
  deleteTireById,
} = tireSlice.actions;

export default tireSlice.reducer;
