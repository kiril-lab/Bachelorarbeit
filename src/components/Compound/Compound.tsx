import { useEffect, useMemo, useState } from "react";
import {
  AllBlockNumbers_CreateProposalEvent,
  allExecutedProposalEvent,
  NumberUnterschidlischeVotes,
} from "../../lib/constCompound";
import { Quote } from "../../lib/functions";
import HauptPropsComponent from "../HauptPropsComponent";

interface Props {
  quorum: string;
  threshold: string;
}
function Compound({ quorum, threshold }: Props) {
  const [number, setNumber] = useState(0);
  const [numberExecuted, setNumberExecuted] = useState(0);
  const [numberVoters, setNumberVoters] = useState(0);

  const getNumber = () => {
    const number = AllBlockNumbers_CreateProposalEvent.length;
    return number;
  };
  const erfolgQuote = useMemo(() => {
    if (number && numberExecuted) {
      return Quote(number, numberExecuted);
    }
  }, [number, numberExecuted]);

  useEffect(() => {
    setNumber(getNumber());
    setNumberExecuted(allExecutedProposalEvent);
    setNumberVoters(NumberUnterschidlischeVotes)
  }, []);
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
      numbVoters={numberVoters}
      linkUebersicht={"/compound/uebersicht"}
      classInfo={"infoCompound"}
    />
  );
}
export default Compound;
