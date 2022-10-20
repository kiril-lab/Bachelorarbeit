import { useEffect, useState } from "react";
import { Month, Months, Year } from "../../types/data";
import { RootObject2 } from "../../types/httpCompound";
import PropsMonatlich from "../PropsMonatlich";

interface Props {
  data1: RootObject2;
  data2: RootObject2;
  data3: RootObject2;
}
const UebersichtMonatlich = ({ data1, data2, data3 }: Props) => {
  const [proposalMonth, setProposalMonth] = useState<Months>();
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
        <PropsMonatlich
          januar20={proposalMonth?.month_one_year_one}
          februar20={proposalMonth?.month_two_year_one}
          märz20={proposalMonth?.month_three_year_one}
          april20={proposalMonth?.month_four_year_one}
          mai20={proposalMonth?.month_five_year_one}
          juni20={proposalMonth?.month_six_year_one}
          juli20={proposalMonth?.month_seven_year_one}
          august20={proposalMonth?.month_eight_year_one}
          september20={proposalMonth?.month_nine_year_one}
          oktober20={proposalMonth?.month_ten_year_one}
          november20={proposalMonth?.month_eleven_year_one}
          dezember20={proposalMonth?.month_twelve_year_one}
          januar21={proposalMonth?.month_one_year_two}
          februar21={proposalMonth?.month_two_year_two}
          märz21={proposalMonth?.month_three_year_two}
          april21={proposalMonth?.month_four_year_two}
          mai21={proposalMonth?.month_five_year_two}
          juni21={proposalMonth?.month_six_year_two}
          juli21={proposalMonth?.month_seven_year_two}
          august21={proposalMonth?.month_eight_year_two}
          september21={proposalMonth?.month_nine_year_two}
          oktober21={proposalMonth?.month_ten_year_two}
          november21={proposalMonth?.month_eleven_year_two}
          dezember21={proposalMonth?.month_twelve_year_two}
          januar22={proposalMonth?.month_one_year_three}
          februar22={proposalMonth?.month_two_year_three}
          märz22={proposalMonth?.month_three_year_three}
          april22={proposalMonth?.month_four_year_three}
          mai22={proposalMonth?.month_five_year_three}
          juni22={proposalMonth?.month_six_year_three}
          juli22={proposalMonth?.month_seven_year_three}
          august22={proposalMonth?.month_eight_year_three}
          september22={proposalMonth?.month_nine_year_three}
          oktober22={proposalMonth?.month_ten_year_three}
          november22={proposalMonth?.month_eleven_year_three}
          dezember22={proposalMonth?.month_twelve_year_three}
        />
      ) : (
        <div>Keine Daten vorhanden!</div>
      )}
    </>
  );
};
export default UebersichtMonatlich;
