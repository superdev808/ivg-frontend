import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import workflowsReducer from './slices/workflows/workflowsSlice';
import workflowSelectionReducer from './slices/workflows/workflowSelectionSlice';
import flowReducer from './slices/workflows/flowSlice';


import editorReducer from './slices/workflows/editorSlice';
import authSliceReducer from './slices/auth/authSlice';

import { workflowsApi } from './slices/api/workflowsApi';
import { workflowEdgesApi } from './slices/api/workflowEdgesApi';
import { workflowNodesApi } from './slices/api/workflowNodesApi';

import { workflowMenuItemsApi } from './slices/api/workflowsMenuItemsApi';
import { workflowMenuQuestionsApi } from './slices/api/workflowsMenuQuestionsApi';
import { apiSlice } from './slices/api/apiSlice';
import route from './slices/routeSlice';
import ui from './slices/uiSlice';

export const store = configureStore({
	reducer: {
		ui,
		route,
		flow: flowReducer,
		editor: editorReducer,
		workflowSelection: workflowSelectionReducer,
		workflows: workflowsReducer,

		auth: authSliceReducer,
		[workflowsApi.reducerPath]: workflowsApi.reducer,
		[workflowEdgesApi.reducerPath]: workflowEdgesApi.reducer,
		[workflowNodesApi.reducerPath]: workflowNodesApi.reducer,
		[workflowMenuItemsApi.reducerPath]: workflowMenuItemsApi.reducer,
		[workflowMenuQuestionsApi.reducerPath]: workflowMenuQuestionsApi.reducer,

		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			apiSlice.middleware,
			workflowsApi.middleware,
			workflowEdgesApi.middleware,
			workflowNodesApi.middleware,
			workflowMenuQuestionsApi.middleware,
			workflowMenuItemsApi.middleware
			
		);
	},
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
