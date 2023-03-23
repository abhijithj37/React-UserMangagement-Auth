import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "../features/adminSlice";
import userSlice from "../features/userSlice";
const store=configureStore({
    reducer:{
        user:userSlice,
        admin:adminSlice
    }
})
export default store