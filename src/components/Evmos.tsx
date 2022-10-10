import { useEffect, useState } from "react";
import { RootObject } from "../types/httpEvmos";

interface Props {
  data1: RootObject;
  data2: RootObject;
}

const Evmos = ({ data1, data2 }: Props) => {
  const [proposals, setProposals] = useState(0);
  const number_proposals = (data: RootObject) => {
    const prop = data.proposals;
    const prop_num = prop.map((i) => {
      return i.proposal_id;
    });
    const numberProp = prop_num.map((i) => {
      return i.length;
    });
    return numberProp.length;
  };
  useEffect(() => {
    setProposals(number_proposals(data1) + number_proposals(data2));
  }, []);
  return (
    <>
      {data1 && data2 ? (
        <>
          <div className="flex flex-col mt-[2rem]">
            <div className="title">Uniswap DAO</div>
            <div className="title1">Votes</div>
            <div className="row mb-[5rem]">
              <div className="info">Gesamte Stimmoptionen</div>
              <div className="info">Quorum</div>
              <div className="info">Threshold</div>
            </div>
            <div className="row">
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
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
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
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
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
            </div>
            <div className="row mb-5">
              <div className="w-[20%] font-bold">2021</div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
            </div>
            <div className="row mb-[5rem]">
              <div className="w-[20%] font-bold">2022</div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
              <div className="w-[20%]"></div>
            </div>
          </div>
        </>
      ) : (
        <div>Keine Daten vorhanden!</div>
      )}
    </>
  );
};
export default Evmos;
