import { providers } from "ethers";
import type { NextPage } from "next";
import UebersichtMonatlich from "../../../components/Compound/UebersichtMonatlich";
import { AllBlockNumbers_CreateProposalEvent_Compound } from "../../../lib/const";
import { getRPC } from "../../../lib/functions";
import { Network } from "../../../types/network";

const monatlich: NextPage = () => {
  const getDatumBlocks = async () => {
    const blockNumberArr = AllBlockNumbers_CreateProposalEvent_Compound;
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
    console.log(timeStampArr);
  };
  /* das hier erzeugt dir Konstant timestampBlocks_CreateProposalEvent_Compound
   in ../src/lib/const.ts
  useEffect(()=>{
    getDatumBlocks()
  },[providers])*/
  return (
    <div className="flex align-center justify-center">
      <UebersichtMonatlich />
    </div>
  );
};

export default monatlich;
