import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    username: null,
    is_loggedin: false,
    role: null
}

const authSlice = createSlice({
    name: 'userReducer',  
    initialState,      
    reducers: {
        setuserdata: (state, action) => {
            state.username = action.payload.username;
            state.is_loggedin = action.payload.is_loggedin;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.username = null;
            state.is_loggedin = false;
            state.role = null;
        }
    }
});

export const { setuserdata, logout } = authSlice.actions;

export default authSlice.reducer;
