import { useEffect, useMemo, useState } from "react";
import {
  AllBlockNumbers_CreateProposalEvent,
  AllCanceledProposalEvent,
  AllExecutedProposalEvent,
  NumberDifferentProposers,
  NumberDifferentVoters,
} from "../../lib/constCompound";
import { Quote } from "../../lib/functions";
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
      title={"Compound DAO"}
      stimmOption={"3 (Ja, Nein, Enthalten)"}
      quorum={quorum ? quorum + " Votes" : "Loading..."}
      threshold={threshold ? threshold + " delegated COMP" : "Loading..."}
      allProposals={number ? number : "Loading..."}
      erfolgreicheP={numberExecuted ? numberExecuted : "Loading..."}
      canceledP={numberCanceled}
      erfolgQuote={erfolgQuote ? erfolgQuote + "%" : "Loading..."}
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
    />
  );
}
export default Compound;
