import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import Statistik3 from "../../components/Statistik3";
import Statistik4 from "../../components/Statistik4";

const Uniswap: NextPage = ({ proposals }: any) => {
  return (
    <>
      <Statistik3 data={proposals} />
      <Statistik4 data={proposals} />
    </>
  );
};
export default Uniswap;

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
