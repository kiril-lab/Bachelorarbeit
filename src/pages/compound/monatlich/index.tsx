import { providers } from "ethers";
import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UebersichtMonatlich from "../../../components/Compound/UebersichtMonatlich";
import { getRPC } from "../../../lib/functions";
import { AppState } from "../../../state";
import { setProposalsTimeStamp } from "../../../state/ProposalsTimeStampCompound";
import { Network } from "../../../types/network";

const monatlich: NextPage = () => {
  const dispatch = useDispatch();
  const { requestsProposalsInAlphaCreated, requestsProposalsInBravoCreated } =
    useSelector((state: AppState) => state.ProposalsRequestCompound);
  const AllProposalsAlpha = requestsProposalsInAlphaCreated.flat();
  const AllProposalsBravo = requestsProposalsInBravoCreated.flat();
  const AllProposals = [...AllProposalsAlpha, ...AllProposalsBravo];
  const allBlockNumbersForCreatedProposals = AllProposals.map((x) => {
    return x.blockNumber;
  });
  const getDatumBlocks = useCallback(async () => {
    const blockNumberArr = allBlockNumbersForCreatedProposals;
    const provider = new providers.JsonRpcProvider(
      getRPC(Network.ethereum),
      Network.ethereum
    );
    const allTimestampBlocks = [];
    for (let i = 0; i < blockNumberArr.length; i++) {
      const blockData = await provider.getBlock(blockNumberArr[i]);
      allTimestampBlocks.push(blockData);
    }
    const timeStampArr = allTimestampBlocks.map((x) => {
      return x?.timestamp;
    });
    dispatch(setProposalsTimeStamp({ timeStamp: timeStampArr }));
  }, []);
  useEffect(() => {
    getDatumBlocks();
  }, [requestsProposalsInAlphaCreated, requestsProposalsInBravoCreated]);
  return (
    <div className="flex align-center justify-center">
      <UebersichtMonatlich />
    </div>
  );
};

export default monatlich;
