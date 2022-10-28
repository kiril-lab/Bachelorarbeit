import { useEffect, useMemo, useState } from "react";
import {
  AllBlockNumbers_CreateProposalEvent,
  AllCanceledProposalEvent,
  AllExecutedProposalEvent,
  NumberDifferentProposers,
  NumberDifferentVoters,
} from "../../lib/constUniswap";
import { Quote } from "../../lib/functions";
import HauptPropsComponent from "../HauptPropsComponent";
interface Props {
  quorum: string;
  threshold: string;
}
const Uniswap = ({ quorum, threshold }: Props) => {
  const [number, setNumber] = useState(0);
  const [numberExecuted, setNumberExecuted] = useState(0);
  const [numberVoters, setNumberVoters] = useState(0);
  const [numberProposers, setNumberProposers] = useState(0);
  const [numberCanceled, setNumberCanceled] = useState(0);

  const getNumber = () => {
    const number = AllBlockNumbers_CreateProposalEvent.length;
    return number;
  };
  const erfolgQuote = useMemo(() => {
    return Quote(
      AllBlockNumbers_CreateProposalEvent.length,
      AllCanceledProposalEvent,
      AllExecutedProposalEvent
    );
  }, []);
  useEffect(() => {
    setNumber(getNumber());
    setNumberExecuted(AllExecutedProposalEvent);
    setNumberVoters(NumberDifferentVoters);
    setNumberProposers(NumberDifferentProposers);
    setNumberCanceled(AllCanceledProposalEvent);
  }, []);

  return (
    <HauptPropsComponent
      title={"Uniswap DAO"}
      stimmOption={"3 (Ja, Nein, Enthalten)"}
      quorum={quorum ? quorum : "Loading..."}
      threschold={threshold ? threshold : "Loading..."}
      allProposals={number ? number : "Loading..."}
      erfolgreicheP={numberExecuted ? numberExecuted : "Loading..."}
      canceledP={numberCanceled}
      erfolgQuote={erfolgQuote ? erfolgQuote + "%" : "Loading..."}
      numbProposers={numberProposers}
      linkMonatlich={"/uniswap/monatlich"}
      numbVoters={numberVoters}
      linkUebersicht={"/uniswap/uebersicht"}
      classInfo={"infoUniswap"}
    />
  );
};
export default Uniswap;
