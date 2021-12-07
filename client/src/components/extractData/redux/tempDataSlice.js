import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const tempDataSlice = createSlice({
  name: "tempData",
  initialState: {
    listData: [],
  },
  reducers: {
    addData: (state, action) => {
      const [row, filename] = action.payload;
      var data = {
        id: uuidv4(),
        ClientRef: row[0],
        LOCATION: row[1],
        DATE_CAST: row[2],
        SUPPLIER: row[4],
        AGE_AT_TEST: row[5],
        GRADE: row[6],
        SPECIFIED_STRENGTH: row[7],
        AVERAGE_STRESS: row[8],

        CUBE_DIMENSION: row[9],
        MAX_LOAD: row[10],
        STRESS_FALURE: row[11],
        MODE_OF_FAILURE: row[12],
        DATE_TESTED: row[13],
        S3FILE_ID: filename,
      };

      state.listData.push(data);

      console.log("state value:" + state.listData);
    },
  },
});

export const { addData } = tempDataSlice.actions;
export default tempDataSlice.reducer;
