import { useEffect, useState } from "react";

function Statistik3({ data }: any) {
  const [proposals, setProposals] = useState(0);
  const number_proposals = () => {
    const id = data.map((i: any) => {
      return i.id;
    });
    return id.length;
  };
  useEffect(() => {
    setProposals(number_proposals());
  }, []);
  console.log(number_proposals());
  return (
    <>
      {data ? (
        <div className="flex flex-col mt-[2rem] mb-[5rem]">
          <div className="title">Uniswap DAO</div>
          <div className="titleUnderline">Gesamte Statistik</div>
          <div className="row">
            <div className="info">All Propolsals</div>
            <div className="info">Token holders</div>
            <div className="info">Delegated Votes</div>
            <div className="info">Voting Adresses</div>
          </div>
          <div className="row">
            <div className="w-[20%]">{proposals}</div>
            <div className="w-[20%]"></div>
            <div className="w-[20%]"></div>
            <div className="w-[20%]"></div>
          </div>
        </div>
      ) : (
        <div>Keine Daten vorhanden!</div>
      )}
    </>
  );
}
export default Statistik3;
