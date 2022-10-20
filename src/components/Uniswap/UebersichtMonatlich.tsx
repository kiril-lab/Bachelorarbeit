import { useEffect, useState } from "react";
import { Month, Months, Year } from "../../types/data";
import PropsMonatlich from "../PropsMonatlich";
interface Props{
    data :any
}
const UebersichtMonatlich = ({data}:Props) => {
    const [proposalMonth, setProposalMonth] = useState<Months>();
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
  return (
    <>
      {data? (
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