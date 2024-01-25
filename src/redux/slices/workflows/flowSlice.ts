import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
  selectedFlow: null,
  selectedFlowData: null,
  selectedProcess: null,
  selectedStart: null,
  currentOptions : null,
  history: [],

};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    reset: () =>initialState,
    restart: (state) => {
      state.currentOptions = null;
      state.history = [state.selectedStart];
      const _currentOptions = (state.selectedFlowData).filter((el: { source: string }) => el.source == state.selectedStart.id);
    
			state.currentOptions = _currentOptions;
      state.selectedProcess = state.selectedStart;

    },
    setSelectedFlow: (state, action) => {
      state.selectedFlow = action.payload;
    },
    setSelectedFlowData: (state, action) => {
      state.selectedFlowData = action.payload;
    },
    setSelectedProcess: (state, action) => {
      state.selectedProcess = action.payload;
    },
    setSelectedStart: (state, action) => {
      state.selectedStart = action.payload;
    },
    setCurrentOptions: (state, action) => {
      state.currentOptions = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { reset, setSelectedFlow,setSelectedFlowData, setSelectedProcess,setSelectedStart, setCurrentOptions, setHistory, restart } = flowSlice.actions;
export default flowSlice.reducer;

export const selectFlow = (state: any) => state.flow;
