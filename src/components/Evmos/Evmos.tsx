import { formatEther } from "ethers/lib/utils";
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
  const [quorum, setQuorum] = useState<string>();
  const [threshold, setThreshold] = useState<string>();
  const [veto_threshold, setVeto_threshold] = useState<string>();
  const [numberPassed, setNumberPassed] = useState<number>();
  const [numberDifferentP, setNumberDifferentP] = useState<number>();
  const number_proposals = () => {
    return data1?.length;
  };
  const numberProposalsPassed = () => {
    const status = data1?.map((x) => {
      return x.proposal_status;
    });
    const status_passed = status?.filter(
      (x) => x === ProposalStatus.ProposalStatusPassed
    );
    return status_passed?.length;
  };
  const GetQuorumAndThreshold = () => {
    const quorum = data2?.Params.gov_tallying.tally_params.quorum;
    const threschold = data2?.Params.gov_tallying.tally_params.threshold;
    const veto_threshold =
      data2?.Params.gov_tallying.tally_params.veto_threshold;
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
    console.log(uniquieProposers);
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
  console.log(differnetProposers());
  return (
    <HauptComponent
      title={"Evmos DAO"}
      stimmOption={"4 (Ja, Nein, Enthalten, Nein mit veto)"}
      quorum={quorum ? quorum : "Loading..."}
      threshold={threshold ? threshold : "Loading..."}
      allProposals={number ? number : "Loading..."}
      erfolgreicheP={numberPassed ? numberPassed : "Loading..."}
      canceledP={""}
      erfolgQuote={erfolgQuote ? erfolgQuote + "%" : "Loading..."}
      numbProposers={numberDifferentP ? numberDifferentP : "Loading..."}
      linkMonatlich={"/evmos/monatlich"}
      numbVoters={0}
      linkUebersicht={""}
      classInfo="infoEvmos"
      veto_threshold={"Veto Threshold"}
      classNameVeto={"w-[20%]"}
      veto_threshold_result={veto_threshold ? veto_threshold : "Loading..."}
      classNameVetoTitle={"infoEvmos"}
      proposals_Number_Title={"Alle Proposals"}
      classNameStronierteTitle={""}
      titleStornierte={""}
      classNameStronierte={""}
    />
  );
};
export default Evmos;
