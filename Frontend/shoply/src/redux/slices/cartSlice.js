import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers:{
        addItemToCart: (state, action) => {
            const itemId = action.payload;
            state[itemId]  = (state[itemId] || 0) +1;
        },
        removeItemFromCart: (state, action) => {
            const itemId = action.payload;
            if (state[itemId]) {
                state[itemId] = Math.max(state[itemId] - 1, 0);

                if (state[itemId] === 0) {
                    delete state[itemId];
                }
            }
        }
    }
})

export const {addItemToCart, removeItemFromCart} = cartSlice.actions;
export default cartSlice.reducer;