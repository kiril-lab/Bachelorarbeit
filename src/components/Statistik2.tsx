import { useEffect, useState } from "react";
import { Proposal, Datum, Years, Year } from "../types/compound";
import { RootObject2, StateEnum } from "../types/http";

interface Props {
  data1: RootObject2;
  data2: RootObject2;
  data3: RootObject2;
}

function Statistik1({ data1, data2, data3 }: Props) {
  const [proposal, setProposal] = useState<Proposal>({
    active: 0,
    canceled: 0,
    defeated: 0,
    executed: 0,
    pending: 0,
    queued: 0,
    succeeded: 0,
  });
  const [proposalDatum, setProposalDatum] = useState<Datum[]>([
    { month: 0, year: 0 },
  ]);
  const [proposalYear, setProposalYear] = useState<Years>({
    year_one: 0,
    year_two: 0,
    year_three: 0,
  });
  const proposals_state = (stateStatus: StateEnum, data: RootObject2) => {
    const proposals = data.proposals;
    const state_status = proposals.map((proposal) => {
      return proposal.states.filter((state) => state.state === stateStatus);
    });
    return state_status.filter((e) => e.length > 0).length;
  };
  const proposals_date = (data: RootObject2, years?: Year) => {
    const proposals = data.proposals;
    const state_pending = proposals.map((proposal) => {
      return proposal.states.map((state) => {
        return state.start_time;
      });
    });
    const timeStamp = state_pending.map((e) => {
      return e[1];
    });
    const date = timeStamp.map((i) => {
      const year = new Date(i * 1000).getFullYear();
      const month = new Date(i * 1000).getMonth() + 1;
      return { month: month, year: year };
    });
    const year = date.filter((year) => year.year == years);
    return { date, year };
  };
  useEffect(() => {
    setProposal({
      active:
        proposals_state(StateEnum.Active, data1) +
        proposals_state(StateEnum.Active, data2) +
        proposals_state(StateEnum.Active, data3),
      canceled:
        proposals_state(StateEnum.Canceled, data1) +
        proposals_state(StateEnum.Canceled, data2) +
        proposals_state(StateEnum.Canceled, data3),
      defeated:
        proposals_state(StateEnum.Defeated, data1) +
        proposals_state(StateEnum.Defeated, data2) +
        proposals_state(StateEnum.Defeated, data3),
      executed:
        proposals_state(StateEnum.Executed, data1) +
        proposals_state(StateEnum.Executed, data2) +
        proposals_state(StateEnum.Executed, data3),
      pending:
        proposals_state(StateEnum.Pending, data1) +
        proposals_state(StateEnum.Pending, data2) +
        proposals_state(StateEnum.Pending, data3),
      queued:
        proposals_state(StateEnum.Queued, data1) +
        proposals_state(StateEnum.Queued, data2) +
        proposals_state(StateEnum.Queued, data3),
      succeeded:
        proposals_state(StateEnum.Succeeded, data1) +
        proposals_state(StateEnum.Succeeded, data2) +
        proposals_state(StateEnum.Succeeded, data3),
    });
    setProposalDatum(
      proposals_date(data1)
        .date.concat(proposals_date(data2).date)
        .concat(proposals_date(data3).date)
    );
    setProposalYear({
      year_one:
        proposals_date(data1, Year.one).year.length +
        proposals_date(data2, Year.one).year.length +
        proposals_date(data3, Year.one).year.length,
      year_two:
        proposals_date(data1, Year.two).year.length +
        proposals_date(data2, Year.two).year.length +
        proposals_date(data3, Year.two).year.length,
      year_three:
        proposals_date(data1, Year.three).year.length +
        proposals_date(data2, Year.three).year.length +
        proposals_date(data3, Year.three).year.length,
    });
  }, [data1]);
  console.log(proposalDatum);
  console.log(proposalYear);
  return (
    <>
      {data1 && data2 && data3 ? (
        <>
          <div className="titleUnderline">Propolsals</div>
          <div className="row">
            <div className="info">Succeeded</div>
            <div className="info">Defeated</div>
            <div className="info">Canceled</div>
            {/*<div className="info">Aktive</div>
            <div className="info">Executed</div>
            <div className="info">Pending</div>
            <div className="info">Queued</div>*/}
          </div>
          <div className="row">
            <div className="w-[20%]">{proposal.succeeded}</div>
            <div className="w-[20%]">{proposal.defeated}</div>
            <div className="w-[20%]">{proposal.canceled}</div>
            {/*<div className="w-[20%]">{proposal.active}</div>
            <div className="w-[20%]">{proposal.executed}</div>
            <div className="w-[20%]">{proposal.pending}</div>
            <div className="w-[20%]">{proposal.queued}</div>*/}
          </div>
          <div className="titleUnderline">Propolsals in one Year</div>
          <div className="row">
            <div className="info">2020</div>
            <div className="info">2021</div>
            <div className="info">2022</div>
            {/*<div className="info">Aktive</div>
            <div className="info">Executed</div>
            <div className="info">Pending</div>
            <div className="info">Queued</div>*/}
          </div>
          <div className="row">
            <div className="w-[20%]">{proposalYear.year_one}</div>
            <div className="w-[20%]">{proposalYear.year_two}</div>
            <div className="w-[20%]">{proposalYear.year_three}</div>
            {/*<div className="w-[20%]">{proposal.active}</div>
            <div className="w-[20%]">{proposal.executed}</div>
            <div className="w-[20%]">{proposal.pending}</div>
            <div className="w-[20%]">{proposal.queued}</div>*/}
          </div>
        </>
      ) : (
        <div>Keine Daten vorhanden!</div>
      )}
    </>
  );
}
export default Statistik1;
