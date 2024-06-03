import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import profileReducer from "../slices/profileSlice";
import authReducer from "../slices/authSlice";
import courseSlice from "../slices/courseSlice";

const rootReducer = combineReducers({
    cart : cartReducer,
    auth : authReducer,
    profile : profileReducer,
    course : courseSlice
})

export default rootReducer