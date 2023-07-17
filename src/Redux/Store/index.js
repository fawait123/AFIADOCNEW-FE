import { configureStore } from "@reduxjs/toolkit";
import { Loader } from "../Reducers/loaderAPI";
export const StoreRedux = configureStore({
  reducer: {
    Loader,
  },
});
