import { createSlice } from '@reduxjs/toolkit'

export const shownPanelExtractSlice = createSlice({
  name: 'shownExtractPanel',
  initialState: {
    value: 0
  },
  reducers: {
    changeStatus: (state, action) => {
      state.value = action.payload
    }

    //value 0 nothing
    // 1: Open panel
    // 2: Processing Finish
    // 3: Applied Finish
  }
})

export const { changeStatus } = shownPanelExtractSlice.actions
export default shownPanelExtractSlice.reducer
