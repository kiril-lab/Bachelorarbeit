import { useEffect, useState } from "react";
import { TimestampBlocks_CreateProposalEvent } from "../../lib/constUniswap";
import { Month, Months, Year } from "../../types/data";
import PropsMonatlich from "../PropsMonatlich";

const UebersichtMonatlich = () => {
  const [proposalMonth, setProposalMonth] = useState<Months>();
  const numberProposalsPerMonth = (years: Year, months: Month) => {
    const date = TimestampBlocks_CreateProposalEvent.map((x) => {
      const year = new Date(x * 1000).getFullYear();
      const month = new Date(x * 1000).getMonth() + 1;
      return { month: month, year: year };
    });
    const month = date.filter(
      (e) => e.month == months && e.year == years
    ).length;
    return month;
  };
  useEffect(() => {
    setProposalMonth({
      month_one_year_one: numberProposalsPerMonth(Year.one, Month.one),
      month_two_year_one: numberProposalsPerMonth(Year.one, Month.two),
      month_three_year_one: numberProposalsPerMonth(Year.one, Month.three),
      month_four_year_one: numberProposalsPerMonth(Year.one, Month.four),
      month_five_year_one: numberProposalsPerMonth(Year.one, Month.five),
      month_six_year_one: numberProposalsPerMonth(Year.one, Month.six),
      month_seven_year_one: numberProposalsPerMonth(Year.one, Month.seven),
      month_eight_year_one: numberProposalsPerMonth(Year.one, Month.eight),
      month_nine_year_one: numberProposalsPerMonth(Year.one, Month.nine),
      month_ten_year_one: numberProposalsPerMonth(Year.one, Month.ten),
      month_eleven_year_one: numberProposalsPerMonth(Year.one, Month.eleven),
      month_twelve_year_one: numberProposalsPerMonth(Year.one, Month.twelve),
      month_one_year_two: numberProposalsPerMonth(Year.two, Month.one),
      month_two_year_two: numberProposalsPerMonth(Year.two, Month.two),
      month_three_year_two: numberProposalsPerMonth(Year.two, Month.three),
      month_four_year_two: numberProposalsPerMonth(Year.two, Month.four),
      month_five_year_two: numberProposalsPerMonth(Year.two, Month.five),
      month_six_year_two: numberProposalsPerMonth(Year.two, Month.six),
      month_seven_year_two: numberProposalsPerMonth(Year.two, Month.seven),
      month_eight_year_two: numberProposalsPerMonth(Year.two, Month.eight),
      month_nine_year_two: numberProposalsPerMonth(Year.two, Month.nine),
      month_ten_year_two: numberProposalsPerMonth(Year.two, Month.ten),
      month_eleven_year_two: numberProposalsPerMonth(Year.two, Month.eleven),
      month_twelve_year_two: numberProposalsPerMonth(Year.two, Month.twelve),
      month_one_year_three: numberProposalsPerMonth(Year.three, Month.one),
      month_two_year_three: numberProposalsPerMonth(Year.three, Month.two),
      month_three_year_three: numberProposalsPerMonth(Year.three, Month.three),
      month_four_year_three: numberProposalsPerMonth(Year.three, Month.four),
      month_five_year_three: numberProposalsPerMonth(Year.three, Month.five),
      month_six_year_three: numberProposalsPerMonth(Year.three, Month.six),
      month_seven_year_three: numberProposalsPerMonth(Year.three, Month.seven),
      month_eight_year_three: numberProposalsPerMonth(Year.three, Month.eight),
      month_nine_year_three: numberProposalsPerMonth(Year.three, Month.nine),
      month_ten_year_three: numberProposalsPerMonth(Year.three, Month.ten),
      month_eleven_year_three: numberProposalsPerMonth(
        Year.three,
        Month.eleven
      ),
      month_twelve_year_three: numberProposalsPerMonth(
        Year.three,
        Month.twelve
      ),
    });
  }, []);
  return (
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
      classInfo={"infoUniswap"}
    />
  );
};
export default UebersichtMonatlich;
