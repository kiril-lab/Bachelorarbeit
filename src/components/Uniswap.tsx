import { useEffect, useState } from "react";
import { Month, Months, Year, Years } from "../types/data";
interface Props {
  data: any;
  quorum: string;
  threshold: string;
}
const Uniswap = ({ data, quorum, threshold }: Props) => {
  const [proposals, setProposals] = useState(0);
  const [proposalYear, setProposalYear] = useState<Years>({
    year_one: 0,
    year_two: 0,
    year_three: 0,
  });
  const [proposalMonth, setProposalMonth] = useState<Months>();
  const number_proposals = () => {
    const id = data.map((i: any) => {
      return i.id;
    });
    return id.length;
  };
  const proposal_date = (years?: Year, months?: Month) => {
    const timeStamp = data.map((t: any) => {
      return t.creationTime;
    });
    const date = timeStamp.map((i: any) => {
      const year = new Date(i * 1000).getFullYear();
      const month = new Date(i * 1000).getMonth() + 1;
      return { month: month, year: year };
    });
    const year = date.filter((e: any) => e.year == years).length;
    const month = date.filter(
      (e: any) => e.month == months && e.year == years
    ).length;
    return { year, month };
  };
  useEffect(() => {
    setProposals(number_proposals());
    setProposalYear({
      year_one: proposal_date(Year.one).year,

      year_two: proposal_date(Year.two).year,

      year_three: proposal_date(Year.three).year,
    });
    setProposalMonth({
      month_one_year_one: proposal_date(Year.one, Month.one).month,

      month_two_year_one: proposal_date(Year.one, Month.two).month,

      month_three_year_one: proposal_date(Year.one, Month.three).month,

      month_four_year_one: proposal_date(Year.one, Month.four).month,

      month_five_year_one: proposal_date(Year.one, Month.five).month,

      month_six_year_one: proposal_date(Year.one, Month.six).month,

      month_seven_year_one: proposal_date(Year.one, Month.seven).month,

      month_eight_year_one: proposal_date(Year.one, Month.eight).month,

      month_nine_year_one: proposal_date(Year.one, Month.nine).month,

      month_ten_year_one: proposal_date(Year.one, Month.ten).month,

      month_eleven_year_one: proposal_date(Year.one, Month.eleven).month,

      month_twelve_year_one: proposal_date(Year.one, Month.twelve).month,

      month_one_year_two: proposal_date(Year.two, Month.one).month,

      month_two_year_two: proposal_date(Year.two, Month.two).month,

      month_three_year_two: proposal_date(Year.two, Month.three).month,

      month_four_year_two: proposal_date(Year.two, Month.four).month,

      month_five_year_two: proposal_date(Year.two, Month.five).month,

      month_six_year_two: proposal_date(Year.two, Month.six).month,

      month_seven_year_two: proposal_date(Year.two, Month.seven).month,

      month_eight_year_two: proposal_date(Year.two, Month.eight).month,

      month_nine_year_two: proposal_date(Year.two, Month.nine).month,

      month_ten_year_two: proposal_date(Year.two, Month.ten).month,

      month_eleven_year_two: proposal_date(Year.two, Month.eleven).month,

      month_twelve_year_two: proposal_date(Year.two, Month.twelve).month,

      month_one_year_three: proposal_date(Year.three, Month.one).month,

      month_two_year_three: proposal_date(Year.three, Month.two).month,

      month_three_year_three: proposal_date(Year.three, Month.three).month,

      month_four_year_three: proposal_date(Year.three, Month.four).month,

      month_five_year_three: proposal_date(Year.three, Month.five).month,

      month_six_year_three: proposal_date(Year.three, Month.six).month,

      month_seven_year_three: proposal_date(Year.three, Month.seven).month,

      month_eight_year_three: proposal_date(Year.three, Month.eight).month,

      month_nine_year_three: proposal_date(Year.three, Month.nine).month,

      month_ten_year_three: proposal_date(Year.three, Month.ten).month,

      month_eleven_year_three: proposal_date(Year.three, Month.eleven).month,

      month_twelve_year_three: proposal_date(Year.three, Month.twelve).month,
    });
  }, []);
  console.log(proposal_date());
  return (
    <>
      {data ? (
        <>
          <div className="flex flex-col mt-[2rem]">
            <div className="title">Uniswap DAO</div>
            <div className="title1">Votes</div>
            <div className="row">
              <div className="info">Gesamte Stimmoptionen</div>
              <div className="info">Quorum</div>
              <div className="info">Threshold</div>
            </div>
            <div className="row mb-[5rem] ">
              <div className="w-[20%]"></div>
              <div className="w-[20%]">{quorum}</div>
              <div className="w-[20%]">{threshold}</div>
            </div>
            <div className="title1">Proposals</div>
            <div className="titleUnderline">Proposals State</div>
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
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
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
            <div className="titleUnderline">Propolsals per Month</div>
            <div className="row">
              <div className="info">Year</div>
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
              <div className="w-[20%] font-bold">2020</div>
              <div className="w-[20%]">{proposalMonth?.month_one_year_one}</div>
              <div className="w-[20%]">{proposalMonth?.month_two_year_one}</div>
              <div className="w-[20%]">
                {proposalMonth?.month_three_year_one}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_four_year_one}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_five_year_one}
              </div>
              <div className="w-[20%]">{proposalMonth?.month_six_year_one}</div>
              <div className="w-[20%]">
                {proposalMonth?.month_seven_year_one}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_eight_year_one}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_nine_year_one}
              </div>
              <div className="w-[20%]">{proposalMonth?.month_ten_year_one}</div>
              <div className="w-[20%]">
                {proposalMonth?.month_eleven_year_one}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_twelve_year_one}
              </div>
            </div>
            <div className="row mb-5">
              <div className="w-[20%] font-bold">2021</div>
              <div className="w-[20%]">{proposalMonth?.month_one_year_two}</div>
              <div className="w-[20%]">{proposalMonth?.month_two_year_two}</div>
              <div className="w-[20%]">
                {proposalMonth?.month_three_year_two}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_four_year_two}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_five_year_two}
              </div>
              <div className="w-[20%]">{proposalMonth?.month_six_year_two}</div>
              <div className="w-[20%]">
                {proposalMonth?.month_seven_year_two}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_eight_year_two}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_nine_year_two}
              </div>
              <div className="w-[20%]">{proposalMonth?.month_ten_year_two}</div>
              <div className="w-[20%]">
                {proposalMonth?.month_eleven_year_two}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_twelve_year_two}
              </div>
            </div>
            <div className="row mb-[5rem]">
              <div className="w-[20%] font-bold">2022</div>
              <div className="w-[20%]">
                {proposalMonth?.month_one_year_three}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_two_year_three}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_three_year_three}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_four_year_three}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_five_year_three}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_six_year_three}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_seven_year_three}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_eight_year_three}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_nine_year_three}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_ten_year_three}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_eleven_year_three}
              </div>
              <div className="w-[20%]">
                {proposalMonth?.month_twelve_year_three}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Keine Daten vorhanden!</div>
      )}
    </>
  );
};
export default Uniswap;
