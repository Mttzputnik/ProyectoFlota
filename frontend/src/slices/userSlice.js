import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  user_name: "",
  lastname: "",
  avatar: "",
  active_user: "",
  current_password: "",
  createdAt: "",
  updatedAt: "",
};

export const userSlide = createSlice({
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
        getUsers: (state, action) => {},
        getUsersById: (state, action) => {},
        editUsersById: (state, action) => {},
        deleteUsersById: (state, action) => {},
    },
});

export const { addUser, getUsers, getUsersById, editUsersById, deleteUsersById } = userReducer.actions;
export default userSlide.reducer;