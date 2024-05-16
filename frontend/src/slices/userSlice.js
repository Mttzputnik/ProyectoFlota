import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  email: "",
  user_name: "",
  lastname: "",
  avatar: "",
  active_user: false,
  current_password: "",
  createdAt: "",
  updatedAt: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
           const{ 
            email,
            user_name,
            lastname,
            avatar,
            active_user,
            current_password,
            } = action.payload;
            console.log(action.payload);

            state.email = email;
            state.user_name = user_name;
            state.lastname = lastname;
            state.avatar = avatar;
            state.active_user = active_user;
            state.current_password = current_password;
        },
        getUsersById: (state, action) => {
            console.log("getUsersById action triggered with id", action.payload);
        },
        editUsersById: (state, action) => {
            const {updatedUserData} = action.payload;
            return{
                ...state,
                ...updatedUserData,
            };
        },
        
        deleteUsersById: (state, action) => {
            return initialState;
        },
    },
});

export const { addUser, getUsers, getUsersById, editUsersById, deleteUsersById } = userSlice.actions;
export default userSlice.reducer;