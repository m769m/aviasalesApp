import { combineReducers, configureStore } from "@reduxjs/toolkit";

import filtersData from "./slices/filtersSlice";
import ticketData from "./slices/cardSlice";

const rootReducer = combineReducers({
  filtersData,
  ticketData,
});

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
