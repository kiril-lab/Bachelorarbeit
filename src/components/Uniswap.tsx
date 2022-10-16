import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Month, Months, Year, Years } from "../types/data";
interface Props {
  data: any;
  quorum: string;
  threshold: string;
  votesInAlpha: ethers.Event[];
  votesInAlpha2: ethers.Event[];
  votesInBravo: ethers.Event[];
  proposalsInAlpha: ethers.Event[];
  proposalsInAlpha2: ethers.Event[];
  proposalsInBravo: ethers.Event[];
}
const Uniswap = ({
  data,
  quorum,
  threshold,
  votesInAlpha,
  votesInAlpha2,
  votesInBravo,
  proposalsInAlpha,
  proposalsInAlpha2,
  proposalsInBravo,
}: Props) => {
  if (proposalsInAlpha.length > 0) {
    const args = proposalsInAlpha.map((a) => {
      return a.args;
    });
    const proposals = args?.map((x) => {
      const proposalId = x?.id.toString();
      const proposalDescription = x?.description;
      return {
        proposalId: proposalId,
        proposalDescription: proposalDescription,
      };
    });
    //console.log(proposals);
  }
  if (proposalsInAlpha2.length > 0) {
    const args = proposalsInAlpha2.map((a) => {
      return a.args;
    });
    const proposals = args?.map((x) => {
      const proposalId = x?.id.toString();
      try {
        const proposalDescription: string = x?.description;
        return {
          proposalId: proposalId,
          proposalDescription: proposalDescription,
        };
      } catch (e) {
        return {
          proposalId: proposalId,
          proposalDescription:
            "# Upgrade Governance Contract to Compound's Governor Bravo ## Previous Discussion: [Temperature Check](https://gov.uniswap.org/t/temperature-check-upgrade-governance-contract-to-governor-bravo/13610) | [Snapshot](https://snapshot.org/#/uniswap/proposal/QmScNLeajiF2hQh1z9DYqTFKGgrRhHwrHisV4ynmDEQwxH) [Consensus Check](https://gov.uniswap.org/t/consensus-check-upgrade-governance-contract-to-governor-bravo/13707) | [Snapshot](https://snapshot.org/#/uniswap/proposal/QmWbgzHJ8nK2TDaj6LF6BxAMPahy97dMmbbU5kRBw1QkXt) ## TL;DR: Upgrade Uniswap's current governance contract from Governor Alpha to Governor Bravo to improve governance upgradability and protocol safety. [On-Chain Proposal]() ## Summary and Motivation: *Co-written with [Getty Hill](https://twitter.com/getty_hill) (@Getty), [Eddy Lee ](https://twitter.com/yesimeddy) (@elee), [Yuan Han Li ](https://twitter.com/yuan_han_li) (@yuan-han-li), [John Wang ](https://twitter.com/j0hnwang) (@johnwang), and [Ali Khambati ](https://twitter.com/alikhambati1) (@alikhambati)* Governor Alpha, the current governance contract used, was a great start, but in light of Compound's and other protocols upgrade to Governor Bravo, Uniswap should migrate given Bravo's additional safety benefits and upgradability. 1. **Native upgradeability:** Under Governor Alpha, changes to governance parameters require deploying a new contract and completely migrating to a new address. This is particularly damaging to governance participation as it introduces downtime and asynchronicity. Many governance tools and custodians use factory contracts which point to a specific contract address, meaning parties must manually upgrade their infrastructure every time governance parameters are changed under Governor Alpha. This includes tools for creating autonomous proposals like [fish.vote ](https://www.fish.vote/); front-ends such as [Tally ](https://www.withtally.com/), [Sybil](https://sybil.org/#/delegates/uniswap), and [Boardroom ](https://app.boardroom.info/) which aggregate and display governance results for various protocols; and professional custodians which are used by large token holders, delegates, and community members. Enabling a static contract address that has proxy upgradability patterns is paramount for maximizing participation, and maintaining an open and secure governance process. 2. **Voting reason string:** Governor Bravo gives voters the opportunity to add free-form comments (text strings) along with their on-chain votes. Not only does this increase the transparency around the rationale people have behind their votes, but it also facilitates more in-depth and nuanced discussion. 3. **New ���abstain' voting option:** Governor Bravo enables voters to formally abstain rather than forcing them to choose between voting yes/no or not voting at all. This will give voters more flexibility and also increase transparency into delegate behavior. 4. **Proposal numbers won't reset:** Under Governor Alpha, any upgrades to the contract resets the proposal number schema. Notice that [���Proposal 0.4'](https://app.uniswap.org/#/vote/0/4) (which resulted in deployment and migration to a new Governor Alpha contract due to modifying the proposal submission threshold parameter) caused the following on-chain proposal from @HarvardLawBFI to be numbered [���Proposal 1.1' ](https://app.uniswap.org/#/vote/1/1). Under Governor Bravo, this would not be an issue and proposal numbers would be continuous because the contract would be maintained at a single address. 5. **Proposal Cancellation:** Bravo allows user-directed cancellations enabling erroneous proposals to be canceled if need be (rather than forcing people to vote no/abstain). 6. **Review Period:** Governor Bravo allows governance to include a review/analysis period. Currently, Compound uses a 13140 block (~2-day) review period that allows holders to review the proposal. This means that users will have 2-days to prepare for voting (e.g., remove UNI from Aave), unlike Governor Alpha which instantly snapshots users' voting power. A review period substantially improves the accessibility and safety of the governance process. ## Implementation: After speaking with the OpenZeppelin team about their reimplementation of Governor Bravo, we think using Compound's Governor Bravo contract instead makes the most sense at this stage. Although Open Zeppelin's Governor contract takes a simpler approach that can include all Bravo functionality, it does not do so by default. The contract uses similar logic, but the code is new. It has gone through an internal audit and review process but still needs to go through an external audit. For the safety and simplicity of Uniswap, we think using Compound's Governor Bravo contract is the best decision for the time being. Compound's Governor contract has already undergone an [audit](https://blog.openzeppelin.com/compound-governor-bravo-audit/) by OpenZeppelin and has been widely used. We can always change/upgrade to Open Zeppelin Governor contract at a future date if their contract introduces new features/functionality the community is interested in. More details on OpenZeppelin's code can be found here: [Github](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance) [Docs](https://docs.openzeppelin.com/contracts/4.x/api/governance) [More info](https://openzeppelin.notion.site/Comparing-Compound-Governor-to-OpenZeppelin-Governor-2-10d0fdcf61ba476fae492b295822ee13) As mentioned in the previous Consensus Check, we have deployed the contract on the Ropsten test net for the community to review our code: [Governor Bravo Delegator](https://ropsten.etherscan.io/address/0x15df15caad12adaa03949014ba5cc49a84803d0f#code) [Governor Bravo Delegate](https://ropsten.etherscan.io/address/0xD8bf60dfC5115F6cB99bb50502346E7b863800f1#code) [Github for contracts](https://github.com/gettty/uniswap-gov) *NB: The `_initiate` function has been slightly modified to take an initial proposal number as an input rather than pulling it from Governor Alpha. This way Uniswap can resume proper proposal numbering.* ## Resource links: 1. [Governor Bravo Development - Protocol Development - Compound Community Forum ](https://www.comp.xyz/t/governor-bravo-development/942) 2. [Understanding Governor Bravo. A review of key changes versus��� | by monetsupply | Tally | Jul, 2021 | Medium ](https://medium.com/tally-blog/understanding-governor-bravo-69b06f1875da) 3. [Compound | Proposal Detail #42 ](https://compound.finance/governance/proposals/42) 4. [Compound | Proposal Detail #43](https://compound.finance/governance/proposals/43)",
        };
      }
    });
    console.log(proposals);
  }
  if (proposalsInBravo.length > 0) {
    const args = proposalsInBravo.map((a) => {
      return a.args;
    });
    const proposals = args?.map((x) => {
      const proposalId = x?.id.toString();
      const proposalDescription = x?.description;
      return {
        proposalId: proposalId,
        proposalDescription: proposalDescription,
      };
    });
    //console.log(proposals);
  }
  if (votesInAlpha.length > 0) {
    const args = votesInAlpha.map((a) => {
      return a.args;
    });
    const VotersAndProposalIds = args?.map((x) => {
      const voters = x?.voter;
      const proposalId = x?.proposalId.toString();
      return { voters: voters, proposalId: proposalId };
    });
    //console.log(VotersAndProposalIds);
  }
  if (votesInAlpha2.length > 0) {
    const args = votesInAlpha2.map((a) => {
      return a.args;
    });
    const VotersAndProposalIds = args?.map((x) => {
      const voters = x?.voter;
      const proposalId = x?.proposalId.toString();
      return { voters: voters, proposalId: proposalId };
    });
    //console.log(VotersAndProposalIds);
  }
  if (votesInBravo.length > 0) {
    const args = votesInBravo.map((a) => {
      return a.args;
    });
    const VotersAndProposalIds = args?.map((x) => {
      const voters = x?.voter;
      const proposalId = x?.proposalId.toString();
      return { voters: voters, proposalId: proposalId };
    });
    //console.log(VotersAndProposalIds);
  }
  const [prop, setProp] = useState(0);
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
    setProp(number_proposals());
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
