import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import Uniswap from "../../components/Uniswap";

const uniswap: NextPage = ({ proposals }: any) => {
  return (
    <>
      <Uniswap data={proposals} />
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
