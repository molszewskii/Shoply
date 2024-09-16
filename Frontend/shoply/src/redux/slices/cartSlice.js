import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers:{
        addItemToCart: (state, action) => {
            const itemId = action.payload;
            state[itemId]  = (state[itemId] || 0) +1;
        },
        removeItemFromCart: (state,action) => {
            const itemId = action.payload;
            state[itemId] = Math.max((state[itemId] || 0) - 1, 0)
        }
    }
})

export const {addItemToCart, removeItemFromCart} = cartSlice.actions;
export default cartSlice.reducer;