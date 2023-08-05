import { createSlice } from '@reduxjs/toolkit'

export const flowSlice = createSlice({
  name: 'flow',
  initialState: [],
  reducers: {
    setData: (state, action) => {
      state = action.payload
    }
  }
})

export const { setData } = flowSlice.actions
export default flowSlice.reducer