import { useEffect, useState } from "react";
import { Proposal, Years, Year, Month, Months } from "../types/data";
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
  const [proposalYear, setProposalYear] = useState<Years>({
    year_one: 0,
    year_two: 0,
    year_three: 0,
  });
  const [proposalMonth, setProposalMonth] = useState<Months>();
  const proposals_state = (stateStatus: StateEnum, data: RootObject2) => {
    const proposals = data.proposals;
    const state_status = proposals.map((proposal) => {
      return proposal.states.filter((state) => state.state === stateStatus);
    });
    return state_status.filter((e) => e.length > 0).length;
  };
  const proposals_date = (data: RootObject2, years?: Year, months?: Month) => {
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
    const year = date.filter((e) => e.year == years).length;
    const month = date.filter(
      (e) => e.month == months && e.year == years
    ).length;
    return { date, year, month };
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
    setProposalYear({
      year_one:
        proposals_date(data1, Year.one).year +
        proposals_date(data2, Year.one).year +
        proposals_date(data3, Year.one).year,
      year_two:
        proposals_date(data1, Year.two).year +
        proposals_date(data2, Year.two).year +
        proposals_date(data3, Year.two).year,
      year_three:
        proposals_date(data1, Year.three).year +
        proposals_date(data2, Year.three).year +
        proposals_date(data3, Year.three).year,
    });
    setProposalMonth({
      month_one_year_one:
        proposals_date(data1, Year.one, Month.one).month +
        proposals_date(data2, Year.one, Month.one).month +
        proposals_date(data3, Year.one, Month.one).month,
      month_two_year_one:
        proposals_date(data1, Year.one, Month.two).month +
        proposals_date(data2, Year.one, Month.two).month +
        proposals_date(data3, Year.one, Month.two).month,
      month_three_year_one:
        proposals_date(data1, Year.one, Month.three).month +
        proposals_date(data2, Year.one, Month.three).month +
        proposals_date(data3, Year.one, Month.three).month,
      month_four_year_one:
        proposals_date(data1, Year.one, Month.four).month +
        proposals_date(data2, Year.one, Month.four).month +
        proposals_date(data3, Year.one, Month.four).month,
      month_five_year_one:
        proposals_date(data1, Year.one, Month.five).month +
        proposals_date(data2, Year.one, Month.five).month +
        proposals_date(data3, Year.one, Month.five).month,
      month_six_year_one:
        proposals_date(data1, Year.one, Month.six).month +
        proposals_date(data2, Year.one, Month.six).month +
        proposals_date(data3, Year.one, Month.six).month,
      month_seven_year_one:
        proposals_date(data1, Year.one, Month.seven).month +
        proposals_date(data2, Year.one, Month.seven).month +
        proposals_date(data3, Year.one, Month.seven).month,
      month_eight_year_one:
        proposals_date(data1, Year.one, Month.eight).month +
        proposals_date(data2, Year.one, Month.eight).month +
        proposals_date(data3, Year.one, Month.eight).month,
      month_nine_year_one:
        proposals_date(data1, Year.one, Month.nine).month +
        proposals_date(data2, Year.one, Month.nine).month +
        proposals_date(data3, Year.one, Month.nine).month,
      month_ten_year_one:
        proposals_date(data1, Year.one, Month.ten).month +
        proposals_date(data2, Year.one, Month.ten).month +
        proposals_date(data3, Year.one, Month.ten).month,
      month_eleven_year_one:
        proposals_date(data1, Year.one, Month.eleven).month +
        proposals_date(data2, Year.one, Month.eleven).month +
        proposals_date(data3, Year.one, Month.eleven).month,
      month_twelve_year_one:
        proposals_date(data1, Year.one, Month.twelve).month +
        proposals_date(data2, Year.one, Month.twelve).month +
        proposals_date(data3, Year.one, Month.twelve).month,
      month_one_year_two:
        proposals_date(data1, Year.two, Month.one).month +
        proposals_date(data2, Year.two, Month.one).month +
        proposals_date(data3, Year.two, Month.one).month,
      month_two_year_two:
        proposals_date(data1, Year.two, Month.two).month +
        proposals_date(data2, Year.two, Month.two).month +
        proposals_date(data3, Year.two, Month.two).month,
      month_three_year_two:
        proposals_date(data1, Year.two, Month.three).month +
        proposals_date(data2, Year.two, Month.three).month +
        proposals_date(data3, Year.two, Month.three).month,
      month_four_year_two:
        proposals_date(data1, Year.two, Month.four).month +
        proposals_date(data2, Year.two, Month.four).month +
        proposals_date(data3, Year.two, Month.four).month,
      month_five_year_two:
        proposals_date(data1, Year.two, Month.five).month +
        proposals_date(data2, Year.two, Month.five).month +
        proposals_date(data3, Year.two, Month.five).month,
      month_six_year_two:
        proposals_date(data1, Year.two, Month.six).month +
        proposals_date(data2, Year.two, Month.six).month +
        proposals_date(data3, Year.two, Month.six).month,
      month_seven_year_two:
        proposals_date(data1, Year.two, Month.seven).month +
        proposals_date(data2, Year.two, Month.seven).month +
        proposals_date(data3, Year.two, Month.seven).month,
      month_eight_year_two:
        proposals_date(data1, Year.two, Month.eight).month +
        proposals_date(data2, Year.two, Month.eight).month +
        proposals_date(data3, Year.two, Month.eight).month,
      month_nine_year_two:
        proposals_date(data1, Year.two, Month.nine).month +
        proposals_date(data2, Year.two, Month.nine).month +
        proposals_date(data3, Year.two, Month.nine).month,
      month_ten_year_two:
        proposals_date(data1, Year.two, Month.ten).month +
        proposals_date(data2, Year.two, Month.ten).month +
        proposals_date(data3, Year.two, Month.ten).month,
      month_eleven_year_two:
        proposals_date(data1, Year.two, Month.eleven).month +
        proposals_date(data2, Year.two, Month.eleven).month +
        proposals_date(data3, Year.two, Month.eleven).month,
      month_twelve_year_two:
        proposals_date(data1, Year.two, Month.twelve).month +
        proposals_date(data2, Year.two, Month.twelve).month +
        proposals_date(data3, Year.two, Month.twelve).month,
      month_one_year_three:
        proposals_date(data1, Year.three, Month.one).month +
        proposals_date(data2, Year.three, Month.one).month +
        proposals_date(data3, Year.three, Month.one).month,
      month_two_year_three:
        proposals_date(data1, Year.three, Month.two).month +
        proposals_date(data2, Year.three, Month.two).month +
        proposals_date(data3, Year.three, Month.two).month,
      month_three_year_three:
        proposals_date(data1, Year.three, Month.three).month +
        proposals_date(data2, Year.three, Month.three).month +
        proposals_date(data3, Year.three, Month.three).month,
      month_four_year_three:
        proposals_date(data1, Year.three, Month.four).month +
        proposals_date(data2, Year.three, Month.four).month +
        proposals_date(data3, Year.three, Month.four).month,
      month_five_year_three:
        proposals_date(data1, Year.three, Month.five).month +
        proposals_date(data2, Year.three, Month.five).month +
        proposals_date(data3, Year.three, Month.five).month,
      month_six_year_three:
        proposals_date(data1, Year.three, Month.six).month +
        proposals_date(data2, Year.three, Month.six).month +
        proposals_date(data3, Year.three, Month.six).month,
      month_seven_year_three:
        proposals_date(data1, Year.three, Month.seven).month +
        proposals_date(data2, Year.three, Month.seven).month +
        proposals_date(data3, Year.three, Month.seven).month,
      month_eight_year_three:
        proposals_date(data1, Year.three, Month.eight).month +
        proposals_date(data2, Year.three, Month.eight).month +
        proposals_date(data3, Year.three, Month.eight).month,
      month_nine_year_three:
        proposals_date(data1, Year.three, Month.nine).month +
        proposals_date(data2, Year.three, Month.nine).month +
        proposals_date(data3, Year.three, Month.nine).month,
      month_ten_year_three:
        proposals_date(data1, Year.three, Month.ten).month +
        proposals_date(data2, Year.three, Month.ten).month +
        proposals_date(data3, Year.three, Month.ten).month,
      month_eleven_year_three:
        proposals_date(data1, Year.three, Month.eleven).month +
        proposals_date(data2, Year.three, Month.eleven).month +
        proposals_date(data3, Year.three, Month.eleven).month,
      month_twelve_year_three:
        proposals_date(data1, Year.three, Month.twelve).month +
        proposals_date(data2, Year.three, Month.twelve).month +
        proposals_date(data3, Year.three, Month.twelve).month,
    });
  }, [data1, data2, data3]);
  return (
    <>
      {data1 && data2 && data3 ? (
        <>
          <div className="titleUnderline">Propolsals State</div>
          <div className="row">
            <div className="info">Succeeded</div>
            <div className="info">Defeated</div>
            <div className="info">Canceled</div>
            {/*<div className="info">Aktive</div>
            <div className="info">Executed</div>
            <div className="info">Pending</div>
            <div className="info">Queued</div>*/}
          </div>
          <div className="row mb-5">
            <div className="w-[20%]">{proposal.succeeded}</div>
            <div className="w-[20%]">{proposal.defeated}</div>
            <div className="w-[20%]">{proposal.canceled}</div>
            {/*<div className="w-[20%]">{proposal.active}</div>
            <div className="w-[20%]">{proposal.executed}</div>
            <div className="w-[20%]">{proposal.pending}</div>
            <div className="w-[20%]">{proposal.queued}</div>*/}
          </div>
          <div className="titleUnderline">Propolsals per Year</div>
          <div className="row">
            <div className="info">2020</div>
            <div className="info">2021</div>
            <div className="info">2022</div>
          </div>
          <div className="row mb-5">
            <div className="w-[20%]">{proposalYear.year_one}</div>
            <div className="w-[20%]">{proposalYear.year_two}</div>
            <div className="w-[20%]">{proposalYear.year_three}</div>
          </div>
          <div className="titleUnderline">Propolsals per Month (2020)</div>
          <div className="row">
            <div className="info">January</div>
            <div className="info">February</div>
            <div className="info">March</div>
            <div className="info">April</div>
            <div className="info">May</div>
            <div className="info">June</div>
            <div className="info">July</div>
            <div className="info">August</div>
            <div className="info">September</div>
            <div className="info">October</div>
            <div className="info">November</div>
            <div className="info">December</div>
          </div>
          <div className="row mb-5">
            <div className="w-[20%]">{proposalMonth?.month_one_year_one}</div>
            <div className="w-[20%]">{proposalMonth?.month_two_year_one}</div>
            <div className="w-[20%]">{proposalMonth?.month_three_year_one}</div>
            <div className="w-[20%]">{proposalMonth?.month_four_year_one}</div>
            <div className="w-[20%]">{proposalMonth?.month_five_year_one}</div>
            <div className="w-[20%]">{proposalMonth?.month_six_year_one}</div>
            <div className="w-[20%]">{proposalMonth?.month_seven_year_one}</div>
            <div className="w-[20%]">{proposalMonth?.month_eight_year_one}</div>
            <div className="w-[20%]">{proposalMonth?.month_nine_year_one}</div>
            <div className="w-[20%]">{proposalMonth?.month_ten_year_one}</div>
            <div className="w-[20%]">
              {proposalMonth?.month_eleven_year_one}
            </div>
            <div className="w-[20%]">
              {proposalMonth?.month_twelve_year_one}
            </div>
          </div>
          <div className="titleUnderline">Propolsals per Month (2021)</div>
          <div className="row">
            <div className="info">January</div>
            <div className="info">February</div>
            <div className="info">March</div>
            <div className="info">April</div>
            <div className="info">May</div>
            <div className="info">June</div>
            <div className="info">July</div>
            <div className="info">August</div>
            <div className="info">September</div>
            <div className="info">October</div>
            <div className="info">November</div>
            <div className="info">December</div>
          </div>
          <div className="row mb-5">
            <div className="w-[20%]">{proposalMonth?.month_one_year_two}</div>
            <div className="w-[20%]">{proposalMonth?.month_two_year_two}</div>
            <div className="w-[20%]">{proposalMonth?.month_three_year_two}</div>
            <div className="w-[20%]">{proposalMonth?.month_four_year_two}</div>
            <div className="w-[20%]">{proposalMonth?.month_five_year_two}</div>
            <div className="w-[20%]">{proposalMonth?.month_six_year_two}</div>
            <div className="w-[20%]">{proposalMonth?.month_seven_year_two}</div>
            <div className="w-[20%]">{proposalMonth?.month_eight_year_two}</div>
            <div className="w-[20%]">{proposalMonth?.month_nine_year_two}</div>
            <div className="w-[20%]">{proposalMonth?.month_ten_year_two}</div>
            <div className="w-[20%]">
              {proposalMonth?.month_eleven_year_two}
            </div>
            <div className="w-[20%]">
              {proposalMonth?.month_twelve_year_two}
            </div>
          </div>
          <div className="titleUnderline">Propolsals per Month (2022)</div>
          <div className="row">
            <div className="info">January</div>
            <div className="info">February</div>
            <div className="info">March</div>
            <div className="info">April</div>
            <div className="info">May</div>
            <div className="info">June</div>
            <div className="info">July</div>
            <div className="info">August</div>
            <div className="info">September</div>
            <div className="info">October</div>
            <div className="info">November</div>
            <div className="info">December</div>
          </div>
          <div className="row mb-5">
            <div className="w-[20%]">{proposalMonth?.month_one_year_three}</div>
            <div className="w-[20%]">{proposalMonth?.month_two_year_three}</div>
            <div className="w-[20%]">
              {proposalMonth?.month_three_year_three}
            </div>
            <div className="w-[20%]">
              {proposalMonth?.month_four_year_three}
            </div>
            <div className="w-[20%]">
              {proposalMonth?.month_five_year_three}
            </div>
            <div className="w-[20%]">{proposalMonth?.month_six_year_three}</div>
            <div className="w-[20%]">
              {proposalMonth?.month_seven_year_three}
            </div>
            <div className="w-[20%]">
              {proposalMonth?.month_eight_year_three}
            </div>
            <div className="w-[20%]">
              {proposalMonth?.month_nine_year_three}
            </div>
            <div className="w-[20%]">{proposalMonth?.month_ten_year_three}</div>
            <div className="w-[20%]">
              {proposalMonth?.month_eleven_year_three}
            </div>
            <div className="w-[20%]">
              {proposalMonth?.month_twelve_year_three}
            </div>
          </div>
        </>
      ) : (
        <div>Keine Daten vorhanden!</div>
      )}
    </>
  );
}
export default Statistik1;
