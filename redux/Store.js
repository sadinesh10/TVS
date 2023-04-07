import { configureStore } from "@reduxjs/toolkit";
import mainDataReducer from "./mainDataSlice";

const Store = configureStore({
  reducer: {
    mainReducer: mainDataReducer,
  },
});


export default Store