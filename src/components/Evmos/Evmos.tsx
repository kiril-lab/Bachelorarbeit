import { useEffect, useState } from "react";
import { RootObject } from "../../types/httpEvmos";
import HauptComponent from "../HauptPropsComponent";

interface Props {
  data1: RootObject;
  data2: RootObject;
}

const Evmos = ({ data1, data2 }: Props) => {
  const [proposals, setProposals] = useState(0);
  const number_proposals = (data: RootObject) => {
    const prop = data.proposals;
    const prop_num = prop.map((i) => {
      return i.proposal_id;
    });
    const numberProp = prop_num.map((i) => {
      return i.length;
    });
    return numberProp.length;
  };
  useEffect(() => {
    setProposals(number_proposals(data1) + number_proposals(data2));
  }, []);
  return (
    <>
      {data1 && data2 ? (
        <HauptComponent
          title={""}
          stimmOption={""}
          quorum={""}
          threschold={""}
          allProposals={proposals}
          erfolgreicheP={0}
          canceledP={0}
          erfolgQuote={0}
          numbProposers={0}
          linkMonatlich={""}
          numbVoters={0}
          linkUebersicht={""}
          classInfo="infoEvmos"
        />
      ) : (
        <div>Keine Daten vorhanden!</div>
      )}
    </>
  );
};
export default Evmos;
