import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/adminSlice";
import userModalSlice from "./features/userModalSlice";
import userSlice from './features/usersSlice';

const store = configureStore({
    reducer: {
        users: userSlice,
        userModal: userModalSlice,
        admin : adminSlice
    }
})

export default store