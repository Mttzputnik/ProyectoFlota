import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        user: userSlide,

    }
});


export default store;