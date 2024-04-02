/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ReviewItem = {
  name: string;
  rating: number;
  description: string;
  productId: string;
};

type ReviewState = {
  reviewItems: ReviewItem[];
};

const initialState: ReviewState = {
  reviewItems: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addToReview: (state, action: PayloadAction<ReviewItem>) => {
      state.reviewItems.push(action.payload);
    },
    getReviews: (state, action: PayloadAction<ReviewItem[]>) => {
      state.reviewItems = action.payload;
    },
    clearReviewItems: (state) => {
      state.reviewItems = [];
    },
  },
});

export const { addToReview, getReviews, clearReviewItems } =
  reviewSlice.actions;

export default reviewSlice.reducer;
