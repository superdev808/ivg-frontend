import { configureStore } from "@reduxjs/toolkit";

import flowReducer from "./features/flowSlice";
 import { flowApi } from "./services/flowApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    flow: flowReducer,
    [flowApi.reducerPath]: flowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(flowApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;