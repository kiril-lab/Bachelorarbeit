import { useEffect, useMemo, useState } from "react";
import { EvmosNumberVotesPerProposals } from "../../lib/constEvmos";
import { getElementsSum, Quote1 } from "../../lib/functions";
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
  const [averageNumber, setAverageNumber] = useState("");

  const AllProposals = data1?.map((x) => {
    const date = x.submit_time;
    const id = x.id;
    const status = x.proposal_status;
    const proposer = x.proposer;
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    return { id, status, proposer, year, month };
  });
  //alle Proposals bis November 2022
  const AllProposalsUnitlNovember = AllProposals?.filter((x) => x.month < 11);
  const number_proposals = () => {
    return AllProposalsUnitlNovember?.length;
  };
  const numberProposalsPassed = () => {
    const status = AllProposalsUnitlNovember?.map((x) => {
      return { id: x?.id, status: x?.status };
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
    const allProposers = AllProposalsUnitlNovember?.map((x) => {
      return x.proposer;
    });
    const uniquieProposers = allProposers?.filter(
      (x, i) => allProposers.indexOf(x) === i
    );
    const result = uniquieProposers?.length;
    return result;
  };
  const getAverageNumberVoters = () => {
    const numberVotersArr = EvmosNumberVotesPerProposals.map((x) => {
      return x.numberAllVotes;
    });
    const totalNumberVoters = getElementsSum(numberVotersArr as number[]);
    const averageNumberVoters = (
      totalNumberVoters / numberVotersArr.length
    ).toFixed(0);
    return averageNumberVoters;
  };
  useEffect(() => {
    setNumber(number_proposals());
    setQuorum(GetQuorumAndThreshold().quorum);
    setThreshold(GetQuorumAndThreshold().threschold);
    setVeto_threshold(GetQuorumAndThreshold().veto_threshold);
    setNumberPassed(numberProposalsPassed());
    setNumberDifferentP(differnetProposers());
    setAverageNumber(getAverageNumberVoters());
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
      numbVoters={"unbekannt"}
      linkUebersicht={"/evmos/uebersicht"}
      classInfo="infoEvmos"
      veto_threshold={"Veto Threshold"}
      classNameVeto={"w-[20%]"}
      veto_threshold_result={
        veto_threshold ? veto_threshold + "%" : "Loading..."
      }
      classNameVetoTitle={"infoEvmos"}
      classNameStronierteTitle={""}
      titleStornierte={""}
      classNameStronierte={""}
      averageNumber={averageNumber}
    />
  );
};
export default Evmos;
