import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import workflowsReducer from './features/workflowsSlice';
import workflowSelectionReducer from './features/workflowSelectionSlice';
import flowReducer from './features/flowSlice';

import calculatorReducer from './features/calculatorSlice';
import editorReducer from './features/editorSlice';
import authSliceReducer from './features/authSlice';

import { workflowsApi } from './services/workflowsApi';
import { workflowEdgesApi } from './services/workflowEdgesApi';
import { workflowNodesApi } from './services/workflowNodesApi';
import { calculatorsApi } from './services/calculatorsApi';
import { workflowMenuItemsApi } from './services/workflowsMenuItemsApi';
import { workflowMenuQuestionsApi } from './services/workflowsMenuQuestionsApi';

import route from './slices/shared/routeSlice';
import ui from './slices/shared/uiSlice';

export const store = configureStore({
	reducer: {
		ui,
		route,
		flow: flowReducer,
		editor: editorReducer,
		workflowSelection: workflowSelectionReducer,
		workflows: workflowsReducer,
		calculator: calculatorReducer,
		auth: authSliceReducer,
		[workflowsApi.reducerPath]: workflowsApi.reducer,
		[workflowEdgesApi.reducerPath]: workflowEdgesApi.reducer,
		[workflowNodesApi.reducerPath]: workflowNodesApi.reducer,
		[workflowMenuItemsApi.reducerPath]: workflowMenuItemsApi.reducer,
		[workflowMenuQuestionsApi.reducerPath]: workflowMenuQuestionsApi.reducer,
		[calculatorsApi.reducerPath]: calculatorsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			calculatorsApi.middleware,
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
