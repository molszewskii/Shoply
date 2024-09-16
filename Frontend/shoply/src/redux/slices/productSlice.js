import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../../services/productService";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async() => {
        const data = await productService.fetchProducts();
        return data;
    }
)

const productsSlice = createSlice({
    name:'products',
    initialState:{
        products:[],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action)=>{
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.error.message;
            })
    }

})

export default productsSlice.reducer;