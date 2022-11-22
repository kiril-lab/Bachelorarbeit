import { formatEther } from "ethers/lib/utils";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import UebersichtTabelle from "../../../components/Compound/UebersichtTabelle";
import { CONTRACT_ABI_Alpha } from "../../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../../contracts/compound/abi_bravo";
import useViewVoteCastEvent from "../../../hooks/useViewVoteCastEvent";
import {
  Compound_Governor_Alpha_Addr,
  Compound_Governor_Bravo_Addr,
  HundleChangeArr,
  Start_End_Block_Proposal_Parameters,
} from "../../../lib/constCompound";
const uebersicht: NextPage = () => {
  const [id, setId] = useState(1);
  const handleChange = (event: any) => {
    const value = event.target.value;
    setId(value);
  };
  const VotesInAlpha = useViewVoteCastEvent(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    Start_End_Block_Proposal_Parameters[id - 1]?.startBlock,
    Start_End_Block_Proposal_Parameters[id - 1]?.endBlock
  );
  const VotesInBravo = useViewVoteCastEvent(
    Compound_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    Start_End_Block_Proposal_Parameters[id - 1]?.startBlock,
    Start_End_Block_Proposal_Parameters[id - 1]?.endBlock
  );
  const Votes = [...VotesInAlpha, ...VotesInBravo];
  const argsVotes = Votes?.map((a) => {
    return a?.args;
  });
  const voteCast = argsVotes?.map((x) => {
    const voters: string = x?.voter;
    const proposalId: number = x?.proposalId.toNumber();
    const votes: string = x?.votes.toString();
    const support: boolean | number = x?.support;
    return {
      proposalId: proposalId,
      voters: voters,
      votes: votes,
      support: support,
    };
  });
  const filteredVoteCast = voteCast?.filter((x) => x.proposalId == id);
  const votes = filteredVoteCast?.map((x) => {
    return parseFloat(formatEther(x?.votes));
  });
  const voters = filteredVoteCast?.map((x) => {
    return x?.voters;
  });
  const support = filteredVoteCast?.map((x) => {
    return x?.support;
  });
  useEffect(() => {
    handleChange;
  }, []);
  return (
    <div className="flex flex-col mt-[2rem]">
      <div className="title">
        <p className="mr-1">Proposal</p>
        <label className="flex">
          <select value={id} onChange={handleChange}>
            {HundleChangeArr.map((x, i) => {
              return (
                <option key={i} value={x}>
                  {x}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div className="row">
        <div className="infoCompound">Voters</div>
        <div className="infoCompound">Votes</div>
        <div className="infoCompound">Stimme</div>
      </div>
      {id == 48 ||
      id == 55 ||
      id == 88 ||
      id == 91 ||
      id == 94 ||
      id == 114 ||
      id == 120 ? (
        <p className="title1 mt-10">
          Es gibt keine Votes, weil diese Proposal, bevor jemand zu voten,
          gecancelt wurde!!!
        </p>
      ) : filteredVoteCast.length != 0 ? (
        <UebersichtTabelle
          voters={voters}
          votes={votes}
          support={support}
          i={id}
        />
      ) : (
        <div className="title1 mt-5">Loading...</div>
      )}
    </div>
  );
};

export default uebersicht;
