import { configureStore } from "@reduxjs/toolkit";

import guideReducer from "./features/guideSlice";
import calculatorReducer from "./features/calculatorSlice";
import flowReducer from "./features/flowSlice";
import editorReducer from "./features/editorSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { guidesApi } from "./services/guidesApi";
import { guideEdgesApi } from "./services/guideEdgesApi";
import { guideNodesApi } from "./services/guideNodesApi";
import { calculatorsApi } from "./services/calculatorsApi";
import { calcEdgesApi } from "./services/calcEdgesApi";
import { calcNodesApi } from "./services/calcNodesApi";

export const store = configureStore({
  reducer: {
    flow: flowReducer,
    editor: editorReducer,
    guide: guideReducer,
    calculator: calculatorReducer,
    [guidesApi.reducerPath]: guidesApi.reducer,
    [guideEdgesApi.reducerPath]: guideEdgesApi.reducer,
    [guideNodesApi.reducerPath]: guideNodesApi.reducer,
    [calculatorsApi.reducerPath]: calculatorsApi.reducer,
    [calcEdgesApi.reducerPath]: calcEdgesApi.reducer,
    [calcNodesApi.reducerPath]: calcNodesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return (
      getDefaultMiddleware().concat(
      calculatorsApi.middleware,
      calcEdgesApi.middleware,
      calcNodesApi.middleware,
      guidesApi.middleware,
      guideEdgesApi.middleware,
      guideNodesApi.middleware)
    )
  }
  
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;