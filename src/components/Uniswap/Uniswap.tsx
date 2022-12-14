import { useEffect, useMemo, useState } from "react";
import {
  AllBlockNumbers_CreateProposalEvent,
  AllCanceledProposalEvent,
  AllExecutedProposalEvent,
  NumberDifferentProposers,
  NumberDifferentVoters,
  NumberVotersPerProposal,
  totalSupply,
} from "../../lib/constUniswap";
import { getElementsSum, Quote } from "../../lib/functions";
import HauptPropsComponent from "../HauptPropsComponent";
interface Props {
  quorum: number | string;
  threshold: number | string;
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
  const Berechnung = useMemo(() => {
    const quote = Quote(
      AllBlockNumbers_CreateProposalEvent.length,
      AllCanceledProposalEvent,
      AllExecutedProposalEvent
    );
    const quorumProzent = ((quorum as number) / totalSupply) * 100;
    const thresholdProzent = ((threshold as number) / totalSupply) * 100;
    const totalNumberVoters = getElementsSum(NumberVotersPerProposal);
    const averageNumberVoters = (
      totalNumberVoters / NumberVotersPerProposal.length
    ).toFixed(0);
    return { quote, quorumProzent, thresholdProzent, averageNumberVoters, totalNumberVoters };
  }, [quorum, threshold]);

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
      quorum={
        quorum
          ? quorum + " Votes" + " (" + Berechnung.quorumProzent + "%" + ")"
          : "Loading..."
      }
      threshold={
        threshold
          ? threshold +
            " delegated UNI" +
            " (" +
            Berechnung.thresholdProzent +
            "%" +
            ")"
          : "Loading..."
      }
      allProposals={number ? number : "Loading..."}
      erfolgreicheP={numberExecuted ? numberExecuted : "Loading..."}
      canceledP={numberCanceled}
      erfolgQuote={Berechnung.quote ? Berechnung.quote + "%" : "Loading..."}
      numbProposers={numberProposers}
      linkMonatlich={"/uniswap/monatlich"}
      numbVoters={numberVoters}
      linkUebersicht={"/uniswap/uebersicht"}
      classInfo={"infoUniswap"}
      veto_threshold={""}
      classNameVeto={""}
      veto_threshold_result={""}
      classNameVetoTitle={""}
      classNameStronierteTitle={"infoUniswap"}
      titleStornierte={"Stornierte Proposals"}
      classNameStronierte={"w-[20%]"}
      averageNumber={Berechnung.averageNumberVoters}
      votersInsgesamt={Berechnung.totalNumberVoters}
    />
  );
};
export default Uniswap;
