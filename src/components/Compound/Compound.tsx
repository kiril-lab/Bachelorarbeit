import { useEffect, useMemo, useState } from "react";
import {
  AllBlockNumbers_CreateProposalEvent,
  AllCanceledProposalEvent,
  AllExecutedProposalEvent,
  NumberDifferentProposers,
  NumberVotersPerProposal,
  NumberDifferentVoters,
} from "../../lib/constCompound";
import { totalSupply } from "../../lib/constCompound";
import { getElementsSum, Quote } from "../../lib/functions";
import HauptPropsComponent from "../HauptPropsComponent";

interface Props {
  quorum: number | string;
  threshold: number | string;
}
function Compound({ quorum, threshold }: Props) {
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
    return { quote, quorumProzent, thresholdProzent, averageNumberVoters };
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
      title={"Compound DAO"}
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
      linkMonatlich={"/compound/monatlich"}
      numbVoters={numberVoters}
      linkUebersicht={"/compound/uebersicht"}
      classInfo={"infoCompound"}
      veto_threshold={""}
      classNameVeto={""}
      veto_threshold_result={""}
      classNameVetoTitle={""}
      proposals_Number_Title={"Alle Proposals bis November 2020"}
      classNameStronierteTitle={"infoCompound"}
      titleStornierte={"Stornierte Proposals"}
      classNameStronierte={"w-[20%]"}
      averageNumber={Berechnung.averageNumberVoters}
    />
  );
}
export default Compound;
