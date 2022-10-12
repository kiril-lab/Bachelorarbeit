import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import Uniswap from "../../components/Uniswap";
import { CONTRACT_ABI } from "../../contracts/uniswap/abi";
import useProposalThreshold from "../../hooks/useProposalThreshold";
import useQuorumVotes from "../../hooks/useQuorumVotes";
import useVotesCast from "../../hooks/useVotesCast";
import { Uniswap_Addr } from "../../lib/const";

const uniswap: NextPage = ({ proposals }: any) => {
  const Quorum = useQuorumVotes(Uniswap_Addr, CONTRACT_ABI);
  const Threshold = useProposalThreshold(Uniswap_Addr, CONTRACT_ABI);
  const Votes = useVotesCast(
    Uniswap_Addr,
    CONTRACT_ABI,
    12543659,
    14422934
  ).votes;
  const Proposals = useVotesCast(
    Uniswap_Addr,
    CONTRACT_ABI,
    12543659,
    14422934
  ).proposals;
  return (
    <>
      <Uniswap
        data={proposals}
        quorum={Quorum}
        threshold={Threshold}
        votes={Votes}
        proposals={Proposals}
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
