import { createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";

export interface ProposalsRequestCompound {
  requestsProposalsInAlphaCreated: ethers.Event[][];
  requestsProposalsInAlphaExecuted: ethers.Event[][];
  requestsProposalsInBravoCreated: ethers.Event[][];
  requestsProposalsInBravoExecuted: ethers.Event[][];
}

const initialState: ProposalsRequestCompound = {
  requestsProposalsInAlphaCreated: [],
  requestsProposalsInAlphaExecuted: [],
  requestsProposalsInBravoCreated: [],
  requestsProposalsInBravoExecuted: [],
};

export const ProposalsRequestCompoundSlice = createSlice({
  name: "ProposalsRequestCompound",
  initialState,
  reducers: {
    setProposals: (
      state,
      action: {
        payload: {
          proposalsInAlphaCreated: ethers.Event[][];
          proposalsInAlphaExecuted: ethers.Event[][];
          proposalsInBravoCreated: ethers.Event[][];
          proposalsInBravoExecuted: ethers.Event[][];
        };
      }
    ) => {
      state.requestsProposalsInAlphaCreated =
        action.payload.proposalsInAlphaCreated;
      state.requestsProposalsInAlphaExecuted =
        action.payload.proposalsInAlphaExecuted;
      state.requestsProposalsInBravoCreated =
        action.payload.proposalsInBravoCreated;
      state.requestsProposalsInBravoExecuted =
        action.payload.proposalsInBravoExecuted;
    },
  },
});

export const { setProposals } = ProposalsRequestCompoundSlice.actions;

export default ProposalsRequestCompoundSlice.reducer;
