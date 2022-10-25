import { useEffect, useMemo, useState } from "react";
import { AllBlockNumbers_CreateProposalEvent } from "../../lib/constUniswap";
import { allBlockNumbers_ExecutedProposalEvent } from "../../lib/constUniswap";
import { Quote } from "../../lib/functions";
import { n } from "../../types/data";
import HauptPropsComponent from "../HauptPropsComponent";
interface Props {
  quorum: string;
  threshold: string;
  votersNumber: number;
}
const Uniswap = ({ quorum, threshold, votersNumber }: Props) => {
  const [number, setNumber] = useState(n);
  const [numberExecuted, setNumberExecuted] = useState(0);
  const [numberVoters, setNumberVoters] = useState(0);

  const getNumber = () => {
    const number = AllBlockNumbers_CreateProposalEvent.length;
    return number;
  };
  const getNumberExecuted = () => {
    const number = allBlockNumbers_ExecutedProposalEvent.length;
    return number;
  };
  const erfolgQuote = useMemo(() => {
    if (number && numberExecuted) {
      return Quote(number, numberExecuted);
    }
  }, [number, numberExecuted]);

  useEffect(() => {
    setNumber(getNumber());
    setNumberExecuted(getNumberExecuted());
    setNumberVoters(votersNumber);
  }, [votersNumber]);

  return (
    <HauptPropsComponent
      title={"Uniswap DAO"}
      stimmOption={"2 (Ja, Nein)"}
      quorum={quorum ? quorum : "Loading..."}
      threschold={threshold ? threshold : "Loading..."}
      allProposals={number ? number : "Loading..."}
      erfolgreicheP={numberExecuted ? numberExecuted : "Loading..."}
      erfolgQuote={erfolgQuote ? erfolgQuote : "Loading..."}
      linkErfolgsNachTyp={"/uniswap/erfolgsNachTyp"}
      linkMonatlich={"/uniswap/monatlich"}
      numbVoters={numberVoters}
      linkUebersicht={"/uniswap/uebersicht"}
      classInfo={"infoUniswap"}
    />
  );
};
export default Uniswap;
