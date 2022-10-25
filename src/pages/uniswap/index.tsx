import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import Uniswap from "../../components/Uniswap/Uniswap";
import { CONTRACT_ABI_Alpha } from "../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Alpha2 } from "../../contracts/uniswap/abi_alpha2";
import { CONTRACT_ABI_Bravo } from "../../contracts/uniswap/abi_bravo";
import useProposalThreshold from "../../hooks/useProposalThreshold";
import useQuorumVotes from "../../hooks/useQuorumVotes";
import useViewProposalsEvent from "../../hooks/Compound/useViewProposals";
import useViewVoteCastEvent from "../../hooks/useViewVoteCastEvent";
import {
  Uniswap_Governor_Alpha2_Addr,
  Uniswap_Governor_Alpha_Addr,
  Uniswap_Governor_Bravo_Addr,
} from "../../lib/constUniswap";

const uniswap: NextPage = ({ proposals }: any) => {
  const Quorum = useQuorumVotes(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
  const Threshold = useProposalThreshold(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
  /*
  const VotesInAlpha = useViewVoteCastEvent(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    10861678,
    12654236
  );
  const VotesInAlpha2 = useViewVoteCastEvent(
    Uniswap_Governor_Alpha2_Addr,
    CONTRACT_ABI_Alpha2,
    12543659,
    14422934
  );
  const VotesInBravo = useViewVoteCastEvent(
    Uniswap_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    13059157,
    15735726
  );
  /*const ProposalsInAlpha = useViewProposalsEvent(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    10861678,
    12654236
  ).proposalsCreated;
  const ProposalsInAlpha2 = useViewProposalsEvent(
    Uniswap_Governor_Alpha2_Addr,
    CONTRACT_ABI_Alpha2,
    12543659,
    14422934
  ).proposalsCreated;
  const ProposalsInBravo = useViewProposalsEvent(
    Uniswap_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    13059157,
    15760070
  ).proposalsCreated;
  const ProposalsExecutedInAlpha = useViewProposalsEvent(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    10861678,
    12654236
  ).proposalsExecuted;
  const ProposalsExecutedInAlpha2 = useViewProposalsEvent(
    Uniswap_Governor_Alpha2_Addr,
    CONTRACT_ABI_Alpha2,
    12543659,
    14422934
  ).proposalsExecuted;
  const ProposalsExecutedInBravo = useViewProposalsEvent(
    Uniswap_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    13059157,
    15760070
  ).proposalsExecuted;
  /*const proposalsInAlpha2 = () => {
    if (ProposalsInAlpha2.length > 0) {
      const args = ProposalsInAlpha2.map((a) => {
        return a.args;
      });
      const proposals = args?.map((x) => {
        try {
          const proposalDescription: string = x?.description;
          return {
            proposalDescription: proposalDescription,
          };
        } catch (e) {
          return {
            proposalDescription:
              "# Upgrade Governance Contract to Compound's Governor Bravo ## Previous Discussion: [Temperature Check](https://gov.uniswap.org/t/temperature-check-upgrade-governance-contract-to-governor-bravo/13610) | [Snapshot](https://snapshot.org/#/uniswap/proposal/QmScNLeajiF2hQh1z9DYqTFKGgrRhHwrHisV4ynmDEQwxH) [Consensus Check](https://gov.uniswap.org/t/consensus-check-upgrade-governance-contract-to-governor-bravo/13707) | [Snapshot](https://snapshot.org/#/uniswap/proposal/QmWbgzHJ8nK2TDaj6LF6BxAMPahy97dMmbbU5kRBw1QkXt) ## TL;DR: Upgrade Uniswap's current governance contract from Governor Alpha to Governor Bravo to improve governance upgradability and protocol safety. [On-Chain Proposal]() ## Summary and Motivation: *Co-written with [Getty Hill](https://twitter.com/getty_hill) (@Getty), [Eddy Lee ](https://twitter.com/yesimeddy) (@elee), [Yuan Han Li ](https://twitter.com/yuan_han_li) (@yuan-han-li), [John Wang ](https://twitter.com/j0hnwang) (@johnwang), and [Ali Khambati ](https://twitter.com/alikhambati1) (@alikhambati)* Governor Alpha, the current governance contract used, was a great start, but in light of Compound's and other protocols upgrade to Governor Bravo, Uniswap should migrate given Bravo's additional safety benefits and upgradability. 1. **Native upgradeability:** Under Governor Alpha, changes to governance parameters require deploying a new contract and completely migrating to a new address. This is particularly damaging to governance participation as it introduces downtime and asynchronicity. Many governance tools and custodians use factory contracts which point to a specific contract address, meaning parties must manually upgrade their infrastructure every time governance parameters are changed under Governor Alpha. This includes tools for creating autonomous proposals like [fish.vote ](https://www.fish.vote/); front-ends such as [Tally ](https://www.withtally.com/), [Sybil](https://sybil.org/#/delegates/uniswap), and [Boardroom ](https://app.boardroom.info/) which aggregate and display governance results for various protocols; and professional custodians which are used by large token holders, delegates, and community members. Enabling a static contract address that has proxy upgradability patterns is paramount for maximizing participation, and maintaining an open and secure governance process. 2. **Voting reason string:** Governor Bravo gives voters the opportunity to add free-form comments (text strings) along with their on-chain votes. Not only does this increase the transparency around the rationale people have behind their votes, but it also facilitates more in-depth and nuanced discussion. 3. **New ���abstain' voting option:** Governor Bravo enables voters to formally abstain rather than forcing them to choose between voting yes/no or not voting at all. This will give voters more flexibility and also increase transparency into delegate behavior. 4. **Proposal numbers won't reset:** Under Governor Alpha, any upgrades to the contract resets the proposal number schema. Notice that [���Proposal 0.4'](https://app.uniswap.org/#/vote/0/4) (which resulted in deployment and migration to a new Governor Alpha contract due to modifying the proposal submission threshold parameter) caused the following on-chain proposal from @HarvardLawBFI to be numbered [���Proposal 1.1' ](https://app.uniswap.org/#/vote/1/1). Under Governor Bravo, this would not be an issue and proposal numbers would be continuous because the contract would be maintained at a single address. 5. **Proposal Cancellation:** Bravo allows user-directed cancellations enabling erroneous proposals to be canceled if need be (rather than forcing people to vote no/abstain). 6. **Review Period:** Governor Bravo allows governance to include a review/analysis period. Currently, Compound uses a 13140 block (~2-day) review period that allows holders to review the proposal. This means that users will have 2-days to prepare for voting (e.g., remove UNI from Aave), unlike Governor Alpha which instantly snapshots users' voting power. A review period substantially improves the accessibility and safety of the governance process. ## Implementation: After speaking with the OpenZeppelin team about their reimplementation of Governor Bravo, we think using Compound's Governor Bravo contract instead makes the most sense at this stage. Although Open Zeppelin's Governor contract takes a simpler approach that can include all Bravo functionality, it does not do so by default. The contract uses similar logic, but the code is new. It has gone through an internal audit and review process but still needs to go through an external audit. For the safety and simplicity of Uniswap, we think using Compound's Governor Bravo contract is the best decision for the time being. Compound's Governor contract has already undergone an [audit](https://blog.openzeppelin.com/compound-governor-bravo-audit/) by OpenZeppelin and has been widely used. We can always change/upgrade to Open Zeppelin Governor contract at a future date if their contract introduces new features/functionality the community is interested in. More details on OpenZeppelin's code can be found here: [Github](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance) [Docs](https://docs.openzeppelin.com/contracts/4.x/api/governance) [More info](https://openzeppelin.notion.site/Comparing-Compound-Governor-to-OpenZeppelin-Governor-2-10d0fdcf61ba476fae492b295822ee13) As mentioned in the previous Consensus Check, we have deployed the contract on the Ropsten test net for the community to review our code: [Governor Bravo Delegator](https://ropsten.etherscan.io/address/0x15df15caad12adaa03949014ba5cc49a84803d0f#code) [Governor Bravo Delegate](https://ropsten.etherscan.io/address/0xD8bf60dfC5115F6cB99bb50502346E7b863800f1#code) [Github for contracts](https://github.com/gettty/uniswap-gov) *NB: The `_initiate` function has been slightly modified to take an initial proposal number as an input rather than pulling it from Governor Alpha. This way Uniswap can resume proper proposal numbering.* ## Resource links: 1. [Governor Bravo Development - Protocol Development - Compound Community Forum ](https://www.comp.xyz/t/governor-bravo-development/942) 2. [Understanding Governor Bravo. A review of key changes versus��� | by monetsupply | Tally | Jul, 2021 | Medium ](https://medium.com/tally-blog/understanding-governor-bravo-69b06f1875da) 3. [Compound | Proposal Detail #42 ](https://compound.finance/governance/proposals/42) 4. [Compound | Proposal Detail #43](https://compound.finance/governance/proposals/43)",
          };
        }
      });
      return proposals;
    }
  };*/
  /*
  const AllProposals = [
    ...ProposalsInAlpha,
    ...ProposalsInAlpha2,
    ...ProposalsInBravo,
  ].flat();
  const AllExecutedProposals = [
    ...ProposalsExecutedInAlpha,
    ...ProposalsExecutedInAlpha2,
    ...ProposalsExecutedInBravo,
  ].flat();

  /*diese constant erzeugt die Konstante AllBlockNumbers_CreateProposalEvent
   in ../src/lib/constUniswap.ts*/
  /* const allBlockNumbersForCreatedProposals = AllProposals.map((x) => {
    return x.blockNumber;
  });
  //console.log(allBlockNumbersForCreatedProposals);

  /*diese constant erzeugt die Konstante allBlockNumbersExecutedProposalEvent
   in ../src/lib/constUniswap.ts*/
  /*const allBlockNumbersForExecutedProposals = AllExecutedProposals.map((x) => {
    return x.blockNumber;
  });
  //console.log(allBlockNumbersForExecutedProposals);*/
  return (
    <>
      <Uniswap
        quorum={Quorum}
        threshold={Threshold}
        /*votersNumber={votersNumber}*/
      />
    </>
  );
};
export default uniswap;
