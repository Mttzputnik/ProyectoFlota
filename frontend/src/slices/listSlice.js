import {createSlice} from '@reduxjs/toolkit';

export const listSlice = createSlice({
    name: "list", 
    initialState: {
        lists: [],
        id: "",
        name: "",
        tasks: [],
    },
    reducers: {
        addList: (state, action) => {
            const {id, name, tasks} = action.payload;
            state.lists.push({id, name, tasks});
        },
        getLists: (state, action) => {
            state.lists = action.payload;
        },
        getListById: (state, action) => {
            const list = state.lists.find((l) => l.id === action.payload.id);
            if (list) {
                return {...state, ...list};
            }
        },
        editListById: (state, action) => {
            const index = state.lists.findIndex((l) => l.id === action.payload.id);
            if (index !== -1) {
                state.lists[index] = action.payload;
            }
        },
        deleteListById: (state, action) => {
            state.lists = state.lists.filter((l) => l.id !== action.payload.id);
        },
    },
});

export const {addList, getLists, getListById, editListById, deleteListById} = listSlice.actions;

export default listSlice.reducer;