import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      // Found the item
      const found = state.cart.find(
        (item) =>
          item.id === payload.item.id && item.type === payload.selectedType
      );

      if (found) {
        // If same item is already in cart, increase amount
        found.amount++;
      } else {
        // Else add new item to the cart
        state.cart.push({
          ...payload.item,
          type: payload.selectedType,
          amount: 1,
        });
      }
    },

    deleteFromCart: (state, { payload }) => {
      // Found the item
      const index = state.cart.findIndex(
        (item) =>
          item.id === payload.item.id && item.type === payload.selectedType
      );

      if (state.cart[index].amount > 1) {
        // If same item is already in cart, decrease amount
        state.cart[index].amount--;
      } else {
        // Else remove item from the cart
        state.cart.splice(index, 1);
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
