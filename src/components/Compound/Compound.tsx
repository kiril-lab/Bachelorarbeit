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
  const [stimmOption, setStimmoption] = useState({
    ersteOption: "",
    zweiteOption: "",
  });
  const [numberVoters, setNumberVoters] = useState(0);

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
    if (number && erfolgreicheP != 0) {
      return Quote(number, erfolgreicheP! as number);
    }
  }, [number, erfolgreicheP]);
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
    setErfolgreicheP(
      getStatusNumber(data1) + getStatusNumber(data2) + getStatusNumber(data3)
    );
    if (getStimmOption(data1) !== undefined) {
      setStimmoption(getStimmOption(data1));
    }
    setNumberVoters(voters.length);
  }, [data, data1, data2, data3, voters]);
  return (
    <>
      {data && data1 && data2 && data3 ? (
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
          erfolgreicheP={erfolgreicheP != 0 ? erfolgreicheP : "Loading..."}
          erfolgQuote={erfolgQuote != undefined ? erfolgQuote : "Loading..."}
          typQuote={0}
          linkMonatlich={"/compound/monatlich"}
          numbVoters={numberVoters >= 2800 ? numberVoters : "Loading..."}
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
