import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const Loader = createSlice({
  name: "counter",
  initialState,
  reducers: {
    onloader: (state, payload) => {
      console.log(payload);
      state.isLoading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onloader } = Loader.actions;

export default Loader.reducer;
