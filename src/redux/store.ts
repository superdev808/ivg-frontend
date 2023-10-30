import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";



import workflowsReducer from "./features/workflowsSlice";
import workflowSelectionReducer from "./features/workflowSelectionSlice";
import flowReducer from "./features/flowSlice";


import calculatorReducer from "./features/calculatorSlice";
import editorReducer from "./features/editorSlice";

import { workflowsApi } from "./services/workflowsApi";
import { workflowEdgesApi } from "./services/workflowEdgesApi";
import { workflowNodesApi } from "./services/workflowNodesApi";
import { calculatorsApi } from "./services/calculatorsApi";
import { calcEdgesApi } from "./services/calcEdgesApi";
import { calcNodesApi } from "./services/calcNodesApi";
import { calcOperationsApi } from "./services/calcOperationsApi";
import { workflowMenuItemsApi } from "./services/workflowsMenuItemsApi";
import { workflowMenuQuestionsApi } from "./services/workflowsMenuQuestionsApi";

export const store = configureStore({
  reducer: {
    flow: flowReducer,
    editor: editorReducer,
    workflowSelection: workflowSelectionReducer,
    workflows: workflowsReducer,
    calculator: calculatorReducer,
    [workflowsApi.reducerPath]: workflowsApi.reducer,
    [workflowEdgesApi.reducerPath]: workflowEdgesApi.reducer,
    [workflowNodesApi.reducerPath]: workflowNodesApi.reducer,
    [workflowMenuItemsApi.reducerPath]: workflowMenuItemsApi.reducer,
    [workflowMenuQuestionsApi.reducerPath]: workflowMenuQuestionsApi.reducer,
    [calculatorsApi.reducerPath]: calculatorsApi.reducer,
    [calcEdgesApi.reducerPath]: calcEdgesApi.reducer,
    [calcNodesApi.reducerPath]: calcNodesApi.reducer,
    [calcOperationsApi.reducerPath]: calcOperationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return (
      getDefaultMiddleware().concat(
      calculatorsApi.middleware,
      calcEdgesApi.middleware,
      calcNodesApi.middleware,
      calcOperationsApi.middleware,
      workflowsApi.middleware,
      workflowEdgesApi.middleware,
      workflowNodesApi.middleware,
      workflowMenuQuestionsApi.middleware,
      workflowMenuItemsApi.middleware)
    )
  }

});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;