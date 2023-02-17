import { createSlice } from "@reduxjs/toolkit";

const initialState = [
];
const reducerSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      state.push(action.payload);
    },
    removeFromWishList: (state, action) => {
      const { id } = action.payload;
      const existingCompany = state.find((company) => company.id === id);
      if (existingCompany) {
        return state.filter((company) => company.id !== id);
      }
    },
  },
});

export const { addToWishList, removeFromWishList } = reducerSlice.actions;
export default reducerSlice.reducer;
