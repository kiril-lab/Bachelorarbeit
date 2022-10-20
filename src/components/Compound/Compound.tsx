import Link from "next/link";
import { useEffect, useState } from "react";
import { Proposal } from "../../types/data";
import { RootObject1, RootObject2, StateEnum } from "../../types/httpCompound";
import HauptPropsComponent from "../HauptPropsComponent";

interface Props {
  data: RootObject1;
  data1: RootObject2;
  data2: RootObject2;
  data3: RootObject2;
  quorum: string;
  threshold: string;
  voters: string[];
}
function Compound({
  data,
  data1,
  data2,
  data3,
  quorum,
  threshold,
  voters,
}: Props) {
  const [proposal, setProposal] = useState<Proposal>({
    succeeded: 0,
  });
  const proposals_state = (stateStatus: StateEnum, data: RootObject2) => {
    const proposals = data.proposals;
    const state_status = proposals.map((proposal) => {
      return proposal.states.filter((state) => state.state === stateStatus);
    });
    return state_status.filter((e) => e.length > 0).length;
  };
  useEffect(() => {
    setProposal({
      succeeded:
        proposals_state(StateEnum.Succeeded, data1) +
        proposals_state(StateEnum.Succeeded, data2) +
        proposals_state(StateEnum.Succeeded, data3),
    });
  }, [data, voters]);
  return (
    <>
      {data && data1 && data2 && data3 ? (
        <HauptPropsComponent
          title={"Compound DAO"}
          stimmOption={0}
          quorum={quorum}
          threschold={threshold}
          allProposals={0}
          erfolgreicheP={0}
          erfolgQuote={0}
          typQuote={0}
          linkMonatlich={"/compound/monatlich"}
          numbVoters={voters.length}
          linkUebersicht={"/compound/uebersicht"}
        />
      ) : (
        <div>Keine Daten vorhanden!</div>
      )}
    </>
  );
}
export default Compound;
