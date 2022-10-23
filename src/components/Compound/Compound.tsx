import { useEffect, useMemo, useState } from "react";
import {
  allBlockNumbersExecutedProposalEvent_Compound,
  AllBlockNumbers_CreateProposalEvent_Compound,
} from "../../lib/const";
import { Quote } from "../../lib/functions";
import { RootObject2, StateEnum } from "../../types/httpCompound";
import HauptPropsComponent from "../HauptPropsComponent";

interface Props {
  data1: RootObject2;
  data2: RootObject2;
  data3: RootObject2;
  quorum: string;
  threshold: string;
  votersNumber: number;
}

function Compound({
  data1,
  data2,
  data3,
  quorum,
  threshold,
  votersNumber,
}: Props) {
  const [number, setNumber] = useState(0);
  const [numberExecuted, setNumberExecuted] = useState(0);
  const [stimmOption, setStimmoption] = useState({
    ersteOption: "",
    zweiteOption: "",
  });
  const getNumber = () => {
    const number = AllBlockNumbers_CreateProposalEvent_Compound.length;
    return number;
  };
  const getNumberExecuted = () => {
    const number = allBlockNumbersExecutedProposalEvent_Compound.length;
    return number;
  };
  const getProposalTitelandStatus = (data: RootObject2) => {
    const title = data.proposals.map((proposal) => {
      const title = proposal.title;
      const status = proposal.states.map((state) => {
        return state.state;
      });
      const statusFilter = status.filter(
        (f) =>
          f == StateEnum.Defeated ||
          f == StateEnum.Executed ||
          f == StateEnum.Canceled
      );
      return { status: statusFilter, title };
    });
    return title;
  };
  const erfolgQuote = useMemo(() => {
    if (number && numberExecuted) {
      return Quote(number, numberExecuted);
    }
  }, [number, numberExecuted]);
  const getStimmOption = (data1: RootObject2) => {
    const proposal = data1.proposals.map((x) => {
      return Object.keys(x);
    });
    const ersteOption = proposal[0]?.[2];
    const zweiteOption = proposal[0]?.[0];
    return { ersteOption, zweiteOption };
  };
  useEffect(() => {
    setNumber(getNumber());
    setNumberExecuted(getNumberExecuted());
    if (getStimmOption(data1) !== undefined) {
      setStimmoption(getStimmOption(data1));
    }
  }, [data1, data2, data3, votersNumber]);
  console.log([
    ...getProposalTitelandStatus(data1),
    ...getProposalTitelandStatus(data2),
    ...getProposalTitelandStatus(data3),
  ]);
  return (
    <>
      {data1 && data2 && data3 ? (
        <HauptPropsComponent
          title={"Compound DAO"}
          stimmOption={
            stimmOption.ersteOption && stimmOption.zweiteOption
              ? stimmOption.ersteOption + ", " + stimmOption.zweiteOption
              : "Loading..."
          }
          quorum={quorum ? quorum : "Loading..."}
          threschold={threshold ? threshold : "Loading..."}
          allProposals={number ? number : "Loading..."}
          erfolgreicheP={numberExecuted ? numberExecuted : "Loading..."}
          erfolgQuote={erfolgQuote ? erfolgQuote : "Loading..."}
          typQuote={0}
          linkMonatlich={"/compound/monatlich"}
          numbVoters={votersNumber}
          linkUebersicht={"/compound/uebersicht"}
          classInfo={"infoCompound"}
        />
      ) : (
        <div>Keine Daten vorhanden!</div>
      )}
    </>
  );
}
export default Compound;
