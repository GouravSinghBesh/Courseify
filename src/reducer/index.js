import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import profileReducer from "../slices/profileSlice";
import authReducer from "../slices/authSlice";

const rootReducer = combineReducers({
    cart : cartReducer,
    auth : authReducer,
    profile : profileReducer
})

export default rootReducer