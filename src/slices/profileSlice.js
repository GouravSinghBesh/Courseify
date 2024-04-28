import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null
}

const profileSlice = createSlice({
    name : "profile",
    initialState : initialState,
    reducers : {
        setuser(state,action){
            state.user = action.payload
        }
    }
})

export const {setuser} = profileSlice.actions;
export default profileSlice.reducer;