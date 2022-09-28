import { RootObject1 } from "../types/http";
interface Props {
  data: RootObject1;
}
function Statistik1({ data }: Props) {
  return (
    <>
      {data ? (
        <div className="flex flex-col mt-[2rem] mb-[5rem]">
          <div className="title">COMPOUND DAO</div>
          <div className="titleUnderline">Gesamte Statistik</div>
          <div className="row">
            <div className="info">All Propolsals</div>
            <div className="info">Token holders</div>
            <div className="info">Delegated Votes</div>
            <div className="info">Voting Adresses</div>
          </div>
          <div className="row">
            <div className="w-[20%]">{data.proposals_created}</div>
            <div className="w-[20%]">{data.token_holders}</div>
            <div className="w-[20%]">{data.votes_delegated}</div>
            <div className="w-[20%]">{data.voting_addresses}</div>
          </div>
        </div>
      ) : (
        <div>Keine Daten vorhanden!</div>
      )}
    </>
  );
}
export default Statistik1;
