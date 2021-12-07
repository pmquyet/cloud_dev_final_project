import { combineReducers } from '@reduxjs/toolkit'
import shownPanelExtractReducer from './components/extractData/redux/extractDataSlice'
import tempDataSliceReducer from './components/extractData/redux/tempDataSlice'

export default combineReducers({
  shownExtractPanel: shownPanelExtractReducer,
  tempData: tempDataSliceReducer
})
