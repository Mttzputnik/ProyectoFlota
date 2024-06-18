import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  idUser: "",
  idList: "",
  desc: "",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTask: (state, action) => {
      const { idUser, idList, desc } = action.payload;
      state.tasks.push({ idUser, idList, desc });
    },
    getTasks: (state, action) => {
      state.tasks = action.payload;
    },
    getTaskById: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        return { ...state, ...task };
      }
    },
    editTaskById: (state, action) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTaskById: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const { createTask, getTasks, getTaskById, editTaskById, deleteTaskById } =
  taskSlice.actions;

export default taskSlice.reducer;
