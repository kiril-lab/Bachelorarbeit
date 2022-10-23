import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import Uniswap from "../../components/Uniswap/Uniswap";
import { CONTRACT_ABI_Alpha } from "../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Alpha2 } from "../../contracts/uniswap/abi_alpha2";
import { CONTRACT_ABI_Bravo } from "../../contracts/uniswap/abi_bravo";
import useProposalThreshold from "../../hooks/useProposalThreshold";
import useQuorumVotes from "../../hooks/useQuorumVotes";
import useViewProposalsEvent from "../../hooks/useViewProposalsEvent";
import useViewVoteCastEvent from "../../hooks/useViewVoteCastEvent";
import {
  Uniswap_Governor_Alpha2_Addr,
  Uniswap_Governor_Alpha_Addr,
  Uniswap_Governor_Bravo_Addr,
} from "../../lib/const";

const uniswap: NextPage = ({ proposals }: any) => {
  const Quorum = useQuorumVotes(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
  const Threshold = useProposalThreshold(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
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
  const ProposalsInAlpha = useViewProposalsEvent(
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
    15735726
  ).proposalsCreated;
  const proposalsInAlpha = ProposalsInAlpha.flat();
  const proposalsInAlpha2 = ProposalsInAlpha2.flat();
  const proposalsInBravo = ProposalsInBravo.flat();
  return (
    <>
      <Uniswap
        data={proposals}
        quorum={Quorum}
        threshold={Threshold}
        votesInAlpha={VotesInAlpha}
        votesInAlpha2={VotesInAlpha2}
        votesInBravo={VotesInBravo}
        proposalsInAlpha={proposalsInAlpha}
        proposalsInAlpha2={proposalsInAlpha2}
        proposalsInBravo={proposalsInBravo}
      />
    </>
  );
};
export default uniswap;

export async function getStaticProps() {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://api.thegraph.com/subgraphs/name/arr00/uniswap-governance-v2",
    }),
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        proposals(orderBy: id) {
          id
          creationTime
        }
      }
    `,
  });
  return {
    props: {
      proposals: data.proposals,
    },
  };
}
