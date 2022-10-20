import { useEffect, useMemo, useState } from "react";
import { Quote } from "../../lib/functions";
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
  const [number, setNumber] = useState(0);
  const [erfolgreicheP, setErfolgreicheP] = useState(0);
  const [stimmOption, setStimmoption] = useState("");

  const getNumber = () => {
    const number = data.proposals_created;
    return number;
  };
  const getStatusNumber = (data_1: RootObject2) => {
    const state_status = data_1.proposals.map((proposal) => {
      return proposal.states.filter(
        (state) => state.state === StateEnum.Succeeded
      );
    });
    const result = state_status.filter((e) => e.length > 0).length;
    return result;
  };
  const erfolgQuote = useMemo(() => {
    return Quote(number, erfolgreicheP! as number);
  }, [number, erfolgreicheP]);
  const getStimmOption = (data1: RootObject2) => {
    const proposal = data1.proposals.map((x) => {
      return Object.keys(x);
    });
    const esrteOption = proposal[0]?.[0];
    const zweiteOption = proposal[0]?.[2];
    return { esrteOption, zweiteOption };
  };
  useEffect(() => {
    setNumber(getNumber());
    setErfolgreicheP(
      getStatusNumber(data1) + getStatusNumber(data2) + getStatusNumber(data3)
    );
    setStimmoption(
      ((getStimmOption(data1).esrteOption! as string) +
        ", " +
        getStimmOption(data1).zweiteOption!) as string
    );
  }, [data, data1, data2, data3, voters]);
  console.log(getStimmOption(data1));
  return (
    <>
      {data && data1 && data2 && data3 ? (
        <HauptPropsComponent
          title={"Compound DAO"}
          stimmOption={stimmOption !== undefined ? stimmOption : ""}
          quorum={quorum}
          threschold={threshold}
          allProposals={number}
          erfolgreicheP={erfolgreicheP}
          erfolgQuote={erfolgQuote}
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
