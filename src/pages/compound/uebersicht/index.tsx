import { ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import UebersichtTabelle from "../../../components/Compound/UebersichtTabelle";
import { CONTRACT_ABI_Alpha } from "../../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../../contracts/compound/abi_bravo";
import useViewEvent from "../../../hooks/useViewEvent";
import {
  Compound_Governor_Alpha_Addr,
  Compound_Governor_Bravo_Addr,
  hundleChangeArr,
  Start_End_Block_ProposalCompound,
} from "../../../lib/const";
const uebersicht: NextPage = () => {
  const [id, setId] = useState(100);
  const handleChange = (event: any) => {
    const value = event.target.value;
    setId(value);
  };
    const VotesInAlpha = useViewEvent(
      Compound_Governor_Alpha_Addr,
      CONTRACT_ABI_Alpha,
      Start_End_Block_ProposalCompound[id - 1]?.startBlock,
      Start_End_Block_ProposalCompound[id - 1]?.endBlock
    ).votes;
    const VotesInBravo = useViewEvent(
      Compound_Governor_Bravo_Addr,
      CONTRACT_ABI_Bravo,
      Start_End_Block_ProposalCompound[id - 1]?.startBlock,
      Start_End_Block_ProposalCompound[id - 1]?.endBlock
    ).votes;
    const Votes = [...VotesInAlpha, ...VotesInBravo];
    console.log(Votes)
    const args = Votes?.map((a) => {
      return a?.args;
    });
    const voteCast = args?.map((x) => {
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
  /*dies Kode liefert die Konstant-StartEndBloeckeProposal
  in Datei \src\lib\const.ts */
  /*
  const AllProposals = [...ProposalsInAlpha, ...ProposalsInBravo];
  const args = ProposalsInBravo.map((x) => {
    return x?.args;
  });
  const ProposalCreated = args?.map((x) => {
    const proposalId = x?.[0].toNumber();
    const startBlock = x?.[6].toNumber();
    const endBlock = x?.[7].toNumber();
    return { [proposalId]: { startBlock, endBlock } };
  });
  if (ProposalCreated.length > 0) {
    console.log(ProposalCreated);
  }*/
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
        <div className="infoCompound">Voters</div>
        <div className="infoCompound">Votes</div>
        <div className="infoCompound">Stimme</div>
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
