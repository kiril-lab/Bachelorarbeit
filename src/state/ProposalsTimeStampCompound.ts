import { createSlice } from "@reduxjs/toolkit";

export interface ProposalsTimeStamp {
  timeStamp: number[];
}

const initialState: ProposalsTimeStamp = {
  timeStamp: []
};

export const ProposalsTimeStampSlice = createSlice({
  name: "ProposalsTimeStamp",
  initialState,
  reducers: {
    setProposalsTimeStamp: (
      state,
      action: {
        payload: {
          timeStamp: number[];
        };
      }
    ) => {
      state.timeStamp = action.payload.timeStamp;
    },
  },
});

export const { setProposalsTimeStamp } = ProposalsTimeStampSlice.actions;

export default ProposalsTimeStampSlice.reducer;
