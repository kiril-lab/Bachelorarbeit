import { useEffect, useMemo, useState } from "react";
import { Quote1 } from "../../lib/functions";
import { ProposalStatus, RootObject, RootObject2 } from "../../types/httpEvmos";
import HauptComponent from "../HauptPropsComponent";

interface Props {
  data1: RootObject[] | undefined;
  data2: RootObject2 | undefined;
}

const Evmos = ({ data1, data2 }: Props) => {
  const [number, setNumber] = useState<number>();
  const [quorum, setQuorum] = useState<number>();
  const [threshold, setThreshold] = useState<number>();
  const [veto_threshold, setVeto_threshold] = useState<number>();
  const [numberPassed, setNumberPassed] = useState<number>();
  const [numberDifferentP, setNumberDifferentP] = useState<number>();
  const number_proposals = () => {
    return data1?.length;
  };
  const numberProposalsPassed = () => {
    const status = data1?.map((x) => {
      return { id: x.id, status: x.proposal_status };
    });
    const status_passed = status?.filter(
      (x) => x.status === ProposalStatus.ProposalStatusPassed
    );
    return status_passed?.length;
  };
  const GetQuorumAndThreshold = () => {
    const quorum =
      parseFloat(data2?.Params.gov_tallying.tally_params.quorum as string) *
      100;
    const threschold =
      parseFloat(data2?.Params.gov_tallying.tally_params.threshold as string) *
      100;
    const veto_threshold =
      parseFloat(
        data2?.Params.gov_tallying.tally_params.veto_threshold as string
      ) * 100;
    return { quorum, threschold, veto_threshold };
  };
  const erfolgQuote = useMemo(() => {
    if (number && numberPassed) {
      return Quote1(number, numberPassed);
    }
  }, [number, numberPassed]);
  const differnetProposers = () => {
    const allProposers = data1?.map((x) => {
      return x.proposer;
    });
    const uniquieProposers = allProposers?.filter(
      (x, i) => allProposers.indexOf(x) === i
    );
    const result = uniquieProposers?.length;
    return result;
  };
  useEffect(() => {
    setNumber(number_proposals());
    setQuorum(GetQuorumAndThreshold().quorum);
    setThreshold(GetQuorumAndThreshold().threschold);
    setVeto_threshold(GetQuorumAndThreshold().veto_threshold);
    setNumberPassed(numberProposalsPassed());
    setNumberDifferentP(differnetProposers());
  }, [data1, data2]);
  return (
    <HauptComponent
      title={"Evmos DAO"}
      stimmOption={"4 (Ja, Nein, Enthalten, Nein mit veto)"}
      quorum={quorum ? quorum + "%" : "Loading..."}
      threshold={threshold ? threshold + "%" : "Loading..."}
      allProposals={number ? number : "Loading..."}
      erfolgreicheP={numberPassed ? numberPassed : "Loading..."}
      canceledP={""}
      erfolgQuote={erfolgQuote ? erfolgQuote + "%" : "Loading..."}
      numbProposers={numberDifferentP ? numberDifferentP : "Loading..."}
      linkMonatlich={"/evmos/monatlich"}
      numbVoters={0}
      linkUebersicht={"/evmos/uebersicht"}
      classInfo="infoEvmos"
      veto_threshold={"Veto Threshold"}
      classNameVeto={"w-[20%]"}
      veto_threshold_result={
        veto_threshold ? veto_threshold + "%" : "Loading..."
      }
      classNameVetoTitle={"infoEvmos"}
      proposals_Number_Title={"Alle Proposals"}
      classNameStronierteTitle={""}
      titleStornierte={""}
      classNameStronierte={""}
      averageNumber={""}
    />
  );
};
export default Evmos;
