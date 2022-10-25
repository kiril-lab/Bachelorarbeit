import { providers } from "ethers";
import type { NextPage } from "next";
import { useCallback } from "react";
import UebersichtMonatlich from "../../../components/Compound/UebersichtMonatlich";
import { AllBlockNumbers_CreateProposalEvent } from "../../../lib/constCompound";
import { getRPC } from "../../../lib/functions";
import { Network } from "../../../types/network";

const monatlich: NextPage = () => {
  /*diese function erzeugt die Konstante timestampBlocks_CreateProposalEvent
   in ../src/lib/constCompound.ts*/
  const getDatumBlocks = useCallback(async () => {
    const blockNumberArr = AllBlockNumbers_CreateProposalEvent;
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
    return timeStampArr;
  }, []);
  //console.log(getDatumBlocks());
  return (
    <div className="flex align-center justify-center">
      <UebersichtMonatlich />
    </div>
  );
};

export default monatlich;
