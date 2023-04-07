import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  recipes: [],
};

const mainDataSlice = createSlice({
  name: "Main Data",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export default mainDataSlice.reducer;
export const { setUserData, setRecipes } = mainDataSlice.actions;
