import type { NextPage } from "next";
import { useState } from "react";
import UebersichtTabelle from "../../../components/Uniswap/UebersichtTabelle";
import { CONTRACT_ABI_Alpha } from "../../../contracts/uniswap/abi_alpha";
import { CONTRACT_ABI_Alpha2 } from "../../../contracts/uniswap/abi_alpha2";
import { CONTRACT_ABI_Bravo } from "../../../contracts/uniswap/abi_bravo";
import useViewVoteCastEvent from "../../../hooks/useViewVoteCastEvent";
import {
  hundleChangeArr,
  Start_End_Block_Proposal_Parameters,
  Uniswap_Governor_Alpha2_Addr,
  Uniswap_Governor_Alpha_Addr,
  Uniswap_Governor_Bravo_Addr,
} from "../../../lib/constUniswap";

const uebersicht: NextPage = () => {
  const [id, setId] = useState(1);
  const handleChange = (event: any) => {
    const value = event.target.value;
    setId(value);
  };
  const VotesInAlpha = useViewVoteCastEvent(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    Start_End_Block_Proposal_Parameters[id - 1]?.startBlock,
    Start_End_Block_Proposal_Parameters[id - 1]?.endBlock
  );
  const VotesInAlpha2 = useViewVoteCastEvent(
    Uniswap_Governor_Alpha2_Addr,
    CONTRACT_ABI_Alpha2,
    Start_End_Block_Proposal_Parameters[id - 1]?.startBlock,
    Start_End_Block_Proposal_Parameters[id - 1]?.endBlock
  );
  const VotesInBravo = useViewVoteCastEvent(
    Uniswap_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    Start_End_Block_Proposal_Parameters[id - 1]?.startBlock,
    Start_End_Block_Proposal_Parameters[id - 1]?.endBlock
  );
  const Votes = [...VotesInAlpha, ...VotesInAlpha2, ...VotesInBravo];
  const argsVotes = Votes?.map((a) => {
    return a?.args;
  });
  const voteCast = argsVotes?.map((x) => {
    const voters: string = x?.voter;
    const proposalId: number = x?.proposalId.toNumber();
    const votes: string = x?.votes.toString();
    const support: boolean = x?.support;
    return {
      proposalId: proposalId,
      voters: voters,
      votes: votes,
      support: support,
    };
  });
  const filteredVoteCast = voteCast?.filter((x) => x.proposalId == id);

  const votes = filteredVoteCast?.map((x) => {
    return x.votes;
  });
  const voters = filteredVoteCast?.map((x) => {
    return x.voters;
  });
  const support = filteredVoteCast?.map((x) => {
    return x.support;
  });
  const result = {
    voters: voters,
    votes: votes,
    support: support,
  };
  return (
    <div className="flex flex-col mt-[2rem]">
      <div className="title">
        Proposal
        <label className="flex">
          <select value={id} onChange={handleChange}>
            {hundleChangeArr.map((x, i) => {
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
        <div className="infoUniswap">Voters</div>
        <div className="infoUniswap">Votes</div>
        <div className="infoUniswap">Stimme</div>
      </div>
      <UebersichtTabelle
        voters={result.voters}
        votes={result.votes}
        support={result.support}
        i={id}
      />
    </div>
  );
};

export default uebersicht;
