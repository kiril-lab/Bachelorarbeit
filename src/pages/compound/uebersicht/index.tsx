import { ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import UebersichtTabelle from "../../../components/Compound/UebrsichtTabelle";
import { CONTRACT_ABI_Alpha } from "../../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../../contracts/compound/abi_bravo";
import useVotesCast from "../../../hooks/useVotesCast";
import {
  Compound_Governor_Alpha_Addr,
  Compound_Governor_Bravo_Addr,
  Start_End_Block_ProposalCompound,
} from "../../../lib/const";
var event: ethers.Event[];
const uebersicht: NextPage = () => {
  const [id, setId] = useState(11);
  const [votes, setVotes] = useState(event);
  const VotesInAlpha = useVotesCast(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    Start_End_Block_ProposalCompound[id - 1]?.startBlock,
    Start_End_Block_ProposalCompound[id - 1]?.endBlock
  ).votes;
  const VotesInBravo = useVotesCast(
    Compound_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    Start_End_Block_ProposalCompound[id - 1]?.startBlock,
    Start_End_Block_ProposalCompound[id - 1]?.endBlock
  ).votes;
  console.log(VotesInAlpha);
  const Votes = () => {
    if (id <= 42) {
      setVotes(VotesInAlpha);
    } else {
      setVotes(VotesInBravo);
    }
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
  useEffect(() => {
    Votes();
  }, [VotesInAlpha, VotesInBravo, id]);
  console.log(votes);
  return (
    <div className="flex flex-col mt-[2rem]">
      <div className="title">Proposal</div>
      <div className="row">
        <div className="info">Voters</div>
        <div className="info">Votes</div>
        <div className="info">Stimme</div>
      </div>
      <UebersichtTabelle Votes={votes} i={id} />
    </div>
  );
};

export default uebersicht;
