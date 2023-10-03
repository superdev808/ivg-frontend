import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flow } from '@/types/flow';

const initialState: any = {
	selectedCalculator: null,
	calculatorNodeData: null,
	calculatorEdgeData: null,
	selectedStart: null,
	currentNode: null,
	currentEdges: null,
	currentPath: [],
};

export const calculatorSlice = createSlice({
	name: 'calculator',
	initialState,
	reducers: {
		resetCalc: () => initialState,
		setSelectedCalculator: (state, action) => {
			state.selectedCalculator = action.payload;
		},
		setCalculatorNodeData: (state, action) => {
			state.calculatorNodeData = action.payload;
		},
		setCalculatorEdgeData: (state, action) => {
			state.calculatorEdgeData = action.payload;
		},
		setCalculatorData: (state, action) => {
			state.calculatorNodeData = action.payload.nodeData;
			state.calculatorEdgeData = action.payload.edgeData;
		},
		setSelectedCalStart: (state, action) => {
			state.selectedStart = action.payload;
		},
		setCurrentNode: (state, action) => {
			state.currentNode = action.payload;
		},
		setCurrentEdges: (state, action) => {
			state.currentEdges = action.payload;
		},
		setCurrentPath: (state, action) => {
			state.currentPath = action.payload;
		},
	},
});

export const {
	resetCalc,
	setSelectedCalculator,
	setCalculatorNodeData,
	setCalculatorEdgeData,
	setCurrentNode,
	setSelectedCalStart,
	setCurrentEdges,
	setCurrentPath,
	setCalculatorData,
} = calculatorSlice.actions;
export default calculatorSlice.reducer;

export const selectCalculator = (state: any) => state.calculator;
