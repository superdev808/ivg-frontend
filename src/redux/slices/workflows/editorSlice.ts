import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
  selectedNode: null,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    reset: () =>initialState,
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
  },
}
});

export const { reset, setSelectedNode } = editorSlice.actions;
export default editorSlice.reducer;

export const editorState = (state: any) => state.editor;
