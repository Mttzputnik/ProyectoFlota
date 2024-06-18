import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    maintenances: [],
    id: "",
    type: "",
    date: "",
    description: "",
    cost: 0.0,
    status: "",
};

const maintenanceSlice = createSlice({
    name: "maintenance",
    initialState,
    reducers: {
      getMaintenances: (state, action) => {
        state.maintenances = action.payload;
        console.log("getMaintenances action triggered", action.payload);
      },

        getMaintenanceById: (state, action) => {
            const { id, type, date, description, cost, status } = action.payload;
            state.id = id;
            state.type = type;
            state.date = date;
            state.description = description;
            state.cost = cost;
            state.status = status;
        },

        addMaintenance: (state, action) => {
            const { type, date, description, cost, status } = action.payload;
            state.type = type;
            state.date = date;
            state.description = description;
            state.cost = cost;
            state.status = status;
        },

        editMaintenance: (state, action) => {
            const { type, date, description, cost, status } = action.payload;
            state.type = type;
            state.date = date;
            state.description = description;
            state.cost = cost;
            state.status = status;
        },


        deleteMaintenance: (state, action) => {
            state.maintenances = state.maintenances.filter(
                (maintenance) => maintenance.id !== action.payload
            );
        },

    },
});