import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userData, {rejectWithValue}) => {
        try{
            const response = await userService.loginUser(userData);
            return response;
        }catch(error){
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(userData,{rejectWithValue}) => {
        try{
            const response = await userService.registerUser(userData);
            return response;
        }catch(error){
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

const userSlice = createSlice({
    name:'user',
    initialState:{
        name: "",
        email: "",
        token: null,
        isLoggedIn: false,
        loading: false,
        error: null,
    },
    reducers:{
        logout: (state)=>{
            state.name = "";
            state.email = "";
            state.token = null;
            state.isLoggedIn = false;
            state.error = null;
            localStorage.removeItem("token");
        },
        setToken: (state,action)=>{
            state.token = action.payload;
            state.isLoggedIn = true;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state,action)=>{
            state.loading = false;
            state.isLoggedIn = true;
            console.log()
            state.name = action.payload.user.name;
            state.email = action.payload.user.email;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        })
        .addCase(loginUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(registerUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.isLoggedIn = false;
            state.name = "";
            state.email = "";
            state.token = null;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export const {logout, setToken} = userSlice.actions;

export default userSlice.reducer;