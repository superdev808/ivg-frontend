import { configureStore } from "@reduxjs/toolkit";

import guideReducer from "./features/guideSlice";
import flowReducer from "./features/flowSlice";
import editorReducer from "./features/editorSlice";
import { flowApi } from "./services/flowApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { guidesApi } from "./services/guidesApi";
import { guideEdgesApi } from "./services/guideEdgesApi";
import { guideNodesApi } from "./services/guideNodesApi";


export const store = configureStore({
  reducer: {
    flow: flowReducer,
    editor: editorReducer,
    guide: guideReducer,
    [flowApi.reducerPath]: flowApi.reducer,
    [guidesApi.reducerPath]: guidesApi.reducer,
    [guideEdgesApi.reducerPath]: guideEdgesApi.reducer,
    [guideNodesApi.reducerPath]: guideNodesApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return (
      getDefaultMiddleware().concat(
      flowApi.middleware,
      guidesApi.middleware,
      guideEdgesApi.middleware,
      guideNodesApi.middleware)
    )
  }
  
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;