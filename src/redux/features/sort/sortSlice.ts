import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitial = {
    value: string;
    getValue: string;
  };
  
  const initialState: TInitial = {
    value: '',
    getValue: ''
  };
  
  const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
      changSort: (state, action: PayloadAction<string>) => {
        state.value = action.payload;
        state.getValue = state.value;

      },
      getSort: (state) => {
       
        state.getValue = state.value;
      }
    }
  });
  
  export const { changSort, getSort } = sortSlice.actions;
  
  export default sortSlice.reducer;