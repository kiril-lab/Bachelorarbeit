import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CONTRACT_ABI_Alpha } from "../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../contracts/compound/abi_bravo";
import useViewVoteCastEvent from "../../hooks/useViewVoteCastEvent";
import {
  Compound_Governor_Alpha_Addr,
  Compound_Governor_Bravo_Addr,
} from "../../lib/constCompound";
import { Quote } from "../../lib/functions";
import { AppState } from "../../state";
import HauptPropsComponent from "../HauptPropsComponent";

interface Props {
  quorum: string;
  threshold: string;
}
var n: number | undefined;
function Compound({ quorum, threshold }: Props) {
  const [number, setNumber] = useState(n);
  const [numberExecuted, setNumberExecuted] = useState(0);
  const [numberVoters, setNumberVoters] = useState(0);
  const {
    requestsProposalsInAlphaCreated,
    requestsProposalsInAlphaExecuted,
    requestsProposalsInBravoCreated,
    requestsProposalsInBravoExecuted,
  } = useSelector((state: AppState) => state.ProposalsRequestCompound);
  const AllProposalsAlpha = requestsProposalsInAlphaCreated.flat();
  const AllProposalsBravo = requestsProposalsInBravoCreated.flat();
  const AllExecutedProposalsAlpha = requestsProposalsInAlphaExecuted.flat();
  const AllExecutedProposalsBravo = requestsProposalsInBravoExecuted.flat();
  const AllProposals = [...AllProposalsAlpha, ...AllProposalsBravo];
  const AllExecutedProposals = [
    ...AllExecutedProposalsAlpha,
    ...AllExecutedProposalsBravo,
  ];
  const args = AllProposals?.map((x) => x?.args);
  const ProposalStartEndBlock = args?.map((x) => {
    const startBlock = x?.[6].hex;
    const endBlock = x?.[7].hex;
    return { startBlock, endBlock };
  });
  const getNumber = () => {
    const number = AllProposals.length;
    return number;
  };
  const getNumberExecuted = () => {
    const number = AllExecutedProposals.length;
    return number;
  };
  const erfolgQuote = useMemo(() => {
    if (number && numberExecuted) {
      return Quote(number, numberExecuted);
    }
  }, [number, numberExecuted]);
  const getAllProposalVoters = (i: number) => {
    const VotesInAlpha = useViewVoteCastEvent(
      Compound_Governor_Alpha_Addr,
      CONTRACT_ABI_Alpha,
      ProposalStartEndBlock[i - 1]?.startBlock,
      ProposalStartEndBlock[i - 1]?.endBlock
    );
    const VotesInBravo = useViewVoteCastEvent(
      Compound_Governor_Bravo_Addr,
      CONTRACT_ABI_Bravo,
      ProposalStartEndBlock[i - 1]?.startBlock,
      ProposalStartEndBlock[i - 1]?.endBlock
    );
    const Votes = [...VotesInAlpha, ...VotesInBravo];
    const args = Votes?.map((x) => x?.args);
    const Voters = args?.map((x) => {
      const proposalId: number = x?.proposalId.toNumber();
      const voters: string = x?.voter;
      return { proposalId, voters };
    });
    const filteredVoteCast = Voters?.filter((x) => x.proposalId == i);
    const voters = filteredVoteCast?.map((x) => {
      return x.voters;
    });
    return voters;
  };
  const getAllVoters = () => {
    const voterBatches = [];
    for (let i = 1; i <= ProposalStartEndBlock.length; i++) {
      voterBatches.push(getAllProposalVoters(i));
    }
    const allAdressVolters = voterBatches.flat();
    const uniquie = allAdressVolters.filter(
      (x, i) => allAdressVolters.indexOf(x) === i
    );
    return uniquie.length;
  };
  const allvoters = getAllVoters();
  useEffect(() => {
    setNumber(getNumber());
    setNumberExecuted(getNumberExecuted());
  }, [
    requestsProposalsInAlphaCreated,
    requestsProposalsInAlphaExecuted,
    requestsProposalsInBravoCreated,
    requestsProposalsInBravoExecuted,
  ]);
  return (
    <HauptPropsComponent
      title={"Compound DAO"}
      stimmOption={"2 (Ja, Nein)"}
      quorum={quorum ? quorum : "Loading..."}
      threschold={threshold ? threshold : "Loading..."}
      allProposals={number ? number : "Loading..."}
      erfolgreicheP={numberExecuted ? numberExecuted : "Loading..."}
      erfolgQuote={erfolgQuote ? erfolgQuote : "Loading..."}
      linkErfolgsNachTyp={"/compound/erfolgsNachTyp"}
      linkMonatlich={"/compound/monatlich"}
      numbVoters={allvoters}
      linkUebersicht={"/compound/uebersicht"}
      classInfo={"infoCompound"}
    />
  );
}
export default Compound;
