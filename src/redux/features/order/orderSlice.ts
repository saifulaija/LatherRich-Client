/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrderItem = {
  name: string;
  orderNumber: string;
 
};

type ReviewState = {
  orderItems:OrderItem [];
};

const initialState: ReviewState = {
  orderItems: [],
};

const orderSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addToOrder: (state, action: PayloadAction<OrderItem>) => {
      state.orderItems.push(action.payload);
    },
    getOrder: (state, action: PayloadAction<OrderItem[]>) => {
      state.orderItems = action.payload;
    },
    clearOrderItems: (state) => {
      state.orderItems = [];
    },
  },
});

export const { addToOrder,getOrder,clearOrderItems} =
  orderSlice.actions;

export default orderSlice.reducer;
