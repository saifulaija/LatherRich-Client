/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a single review item
type ReviewItem = {
  name: string;
  rating: number;
  description: string;
  productId: string; 
};

// Define the type for the review state
type ReviewState = {
  reviewItems: ReviewItem[];
};

// Initial state for the review slice
const initialState: ReviewState = {
  reviewItems: [],
};

// Create the review slice
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

// Export actions
export const { addToReview, getReviews, clearReviewItems } = reviewSlice.actions;

export default reviewSlice.reducer;
