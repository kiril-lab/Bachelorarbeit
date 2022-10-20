import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import type { NextPage } from "next";
import UebersichtMonatlich from "../../../components/Uniswap/UebersichtMonatlich";

const monatlich: NextPage = ({ proposals }: any) => {
  return (
    <div className="flex align-center justify-center">
      <UebersichtMonatlich data={proposals} />
    </div>
  );
};

export default monatlich;
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
