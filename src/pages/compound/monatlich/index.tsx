import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import UebersichtMonatlich from "../../../components/Compound/UebersichtMonatlich";
import httpContext from "../../../http/HttpContext";
import { RootObject2 } from "../../../types/httpCompound";

const data: RootObject2 = {
  proposals: [],
};
const monatlich: NextPage = () => {
  /*diese func erzeugt die const timestampBlocks
   in datei \src\lib\const.ts*/
  /* 
  const getDatumBlocks = async () => {
    const allStartBlocksCreateProposalEvent =
      Start_EndBlock_CreateProposal_EventCompound.filter(
        (x, i) => Start_EndBlock_CreateProposal_EventCompound.indexOf(x) === i
      );
    const blockNumberArr = allStartBlocksCreateProposalEvent;
    const provider = new providers.JsonRpcProvider(
      getRPC(Network.ethereum),
      Network.ethereum
    );
    const blocksBatches = [];
    for (let i = 0; i < blockNumberArr.length; i++) {
      const blockData = await provider.getBlock(blockNumberArr[i]);
      blocksBatches.push(blockData);
    }
    const alltimestampBlocks = blocksBatches.flat();
    const timeStampArr = alltimestampBlocks.map((x) => {
      return x?.timestamp;
    });
    console.log(timeStampArr);
  };*/
  return (
    <div className="flex align-center justify-center">
      <UebersichtMonatlich />
    </div>
  );
};

export default monatlich;
