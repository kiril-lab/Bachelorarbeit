import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UebersichtTabelle from "../../../components/Compound/UebersichtTabelle";
import { CONTRACT_ABI_Alpha } from "../../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../../contracts/compound/abi_bravo";
import useViewVoteCastEvent from "../../../hooks/useViewVoteCastEvent";
import {
  Compound_Governor_Alpha_Addr,
  Compound_Governor_Bravo_Addr,
  hundleChangeArr,
} from "../../../lib/constCompound";
import { AppState } from "../../../state";
const uebersicht: NextPage = () => {
  const { requestsProposalsInAlphaCreated, requestsProposalsInBravoCreated } =
    useSelector((state: AppState) => state.ProposalsRequestCompound);
  const AllProposalsAlpha = requestsProposalsInAlphaCreated.flat();
  const AllProposalsBravo = requestsProposalsInBravoCreated.flat();
  const AllProposals = [...AllProposalsAlpha, ...AllProposalsBravo];
  const args = AllProposals?.map((x) => x?.args);
  const ProposalStartEndBlock = args?.map((x) => {
    const startBlock = x?.[6].hex;
    const endBlock = x?.[7].hex;
    return { startBlock, endBlock };
  });
  const [id, setId] = useState(100);
  const handleChange = (event: any) => {
    const value = event.target.value;
    setId(value);
  };
  const VotesInAlpha = useViewVoteCastEvent(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    ProposalStartEndBlock[id - 1]?.startBlock,
    ProposalStartEndBlock[id - 1]?.endBlock
  );
  const VotesInBravo = useViewVoteCastEvent(
    Compound_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    ProposalStartEndBlock[id - 1]?.startBlock,
    ProposalStartEndBlock[id - 1]?.endBlock
  );
  const Votes = [...VotesInAlpha, ...VotesInBravo];
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
  useEffect(() => {}, [
    requestsProposalsInAlphaCreated,
    requestsProposalsInBravoCreated,
  ]);
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
