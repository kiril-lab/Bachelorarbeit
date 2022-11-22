import { formatEther } from "ethers/lib/utils";
import type { NextPage } from "next";
import { useState } from "react";
import UebersichtTabelle1 from "../../../components/Uniswap/UebersichtTabelle1";
import UebersichtTabelle2 from "../../../components/Uniswap/UebersichtTabelle2";
import UebersichtTabelle3 from "../../../components/Uniswap/UebersichtTabelle3";
import { CONTRACT_ABI_Alpha } from "../../../contracts/uniswap/abi_alpha";
import { CONTRACT_ABI_Alpha2 } from "../../../contracts/uniswap/abi_alpha2";
import { CONTRACT_ABI_Bravo } from "../../../contracts/uniswap/abi_bravo";
import useViewVoteCastEvent from "../../../hooks/useViewVoteCastEvent";
import {
  HundleChangeArr_Bravo,
  Start_End_Block_Proposal_Parameters_Alpha,
  Start_End_Block_Proposal_Parameters_Alpha2,
  Start_End_Block_Proposal_Parameters_Bravo,
  Uniswap_Governor_Alpha2_Addr,
  Uniswap_Governor_Alpha_Addr,
  Uniswap_Governor_Bravo_Addr,
} from "../../../lib/constUniswap";

const uebersicht: NextPage = () => {
  const [governance, setGovernance] = useState("Alpha");
  const [id1, setId1] = useState(1);
  const [id2, setId2] = useState(1);
  const [id3, setId3] = useState(9);
  const handleChange = (event: any) => {
    const value = event.target.value;
    setGovernance(value);
  };
  const handleChange1 = (event: any) => {
    const value = event.target.value;
    setId1(value);
  };
  const handleChange2 = (event: any) => {
    const value = event.target.value;
    setId2(value);
  };
  const handleChange3 = (event: any) => {
    const value = event.target.value;
    setId3(value);
  };
  const VotesInAlpha = useViewVoteCastEvent(
    Uniswap_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    Start_End_Block_Proposal_Parameters_Alpha[id1 - 1]?.startBlock,
    Start_End_Block_Proposal_Parameters_Alpha[id1 - 1]?.endBlock
  );
  const VotesInAlpha2 = useViewVoteCastEvent(
    Uniswap_Governor_Alpha2_Addr,
    CONTRACT_ABI_Alpha2,
    Start_End_Block_Proposal_Parameters_Alpha2[id2 - 1]?.startBlock,
    Start_End_Block_Proposal_Parameters_Alpha2[id2 - 1]?.endBlock
  );
  const VotesInBravo = useViewVoteCastEvent(
    Uniswap_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    Start_End_Block_Proposal_Parameters_Bravo[id3 - 1]?.startBlock,
    Start_End_Block_Proposal_Parameters_Bravo[id3 - 1]?.endBlock
  );
  console.log(VotesInBravo)
  const argsAlpha = VotesInAlpha?.map((a) => {
    return a?.args;
  });
  const voteCast1 = argsAlpha?.map((x) => {
    const voters: string = x?.voter;
    const proposalId: number = x?.proposalId.toNumber();
    const votes: string = x?.votes.toString();
    const support: boolean = x?.support;
    return {
      proposalId: proposalId,
      voters: voters,
      votes: votes,
      support: support,
    };
  });
  const filteredVoteCast1 = voteCast1?.filter((x) => x.proposalId == id1);

  const votes1 = filteredVoteCast1?.map((x) => {
    return parseFloat(formatEther(x?.votes));
  });
  const voters1 = filteredVoteCast1?.map((x) => {
    return x.voters;
  });
  const support1 = filteredVoteCast1?.map((x) => {
    return x.support;
  });
  const argsAlpha2 = VotesInAlpha2?.map((a) => {
    return a?.args;
  });
  const voteCast2 = argsAlpha2?.map((x) => {
    const voters: string = x?.voter;
    const proposalId: number = x?.proposalId.toNumber();
    const votes: string = x?.votes.toString();
    const support: boolean = x?.support;
    return {
      proposalId: proposalId,
      voters: voters,
      votes: votes,
      support: support,
    };
  });
  const filteredVoteCast2 = voteCast2?.filter((x) => x.proposalId == id2);

  const votes2 = filteredVoteCast2?.map((x) => {
    return parseFloat(formatEther(x?.votes));
  });
  const voters2 = filteredVoteCast2?.map((x) => {
    return x.voters;
  });
  const support2 = filteredVoteCast2?.map((x) => {
    return x.support;
  });
  const argsBravo = VotesInBravo?.map((a) => {
    return a?.args;
  });
  const voteCast3 = argsBravo?.map((x) => {
    const voters: string = x?.voter;
    const proposalId: number = x?.proposalId.toNumber();
    const votes: string = x?.votes.toString();
    const support: number = x?.support;
    return {
      proposalId: proposalId,
      voters: voters,
      votes: votes,
      support: support,
    };
  });
  const filteredVoteCast3 = voteCast3?.filter((x) => x.proposalId == id3);

  const votes3 = filteredVoteCast3?.map((x) => {
    return parseFloat(formatEther(x?.votes));
  });
  const voters3 = filteredVoteCast3?.map((x) => {
    return x.voters;
  });
  const support3 = filteredVoteCast3?.map((x) => {
    return x.support;
  });
  return (
    <div className="flex flex-col mt-[2rem]">
      <div className="title">
        <p className="mr-1">Governance</p>
        <label className="flex">
          <select value={governance} onChange={handleChange}>
            <option value={"Alpha"}>Alpha</option>
            <option value={"Alpha2"}>Alpha2</option>
            <option value={"Bravo"}>Bravo</option>
          </select>
        </label>
      </div>
      <div>
        {governance === "Alpha" ? (
          <>
            <div className="title">
              <p className="mr-1">Proposal</p>
              <label className="flex">
                <select value={id1} onChange={handleChange1}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>
            </div>
            <div className="row">
              <div className="infoUniswap">Voters</div>
              <div className="infoUniswap">Votes</div>
              <div className="infoUniswap">Stimme</div>
            </div>
            {filteredVoteCast1.length != 0 ? (
              <UebersichtTabelle1
                voters1={voters1}
                votes1={votes1}
                support1={support1}
                i1={id1}
              />
            ) : (
              <div className="title1 mt-5">Loading...</div>
            )}
          </>
        ) : governance === "Alpha2" ? (
          <>
            <div className="title">
              <p className="mr-1">Proposal</p>
              <label className="flex">
                <select value={id2} onChange={handleChange2}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </label>
            </div>
            <div className="row">
              <div className="infoUniswap">Voters</div>
              <div className="infoUniswap">Votes</div>
              <div className="infoUniswap">Stimme</div>
            </div>
            {filteredVoteCast2.length != 0 ? (
              <UebersichtTabelle2
                voters2={voters2}
                votes2={votes2}
                support2={support2}
                i2={id2}
              />
            ) : (
              <div className="title1 mt-5">Loading...</div>
            )}
          </>
        ) : governance === "Bravo" ? (
          <>
            <div className="title">
              <p className="mr-1">Proposal</p>
              <label className="flex">
                <select value={id3} onChange={handleChange3}>
                  {HundleChangeArr_Bravo.map((x, i) => {
                    return (
                      <option key={i} value={x}>
                        {x}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div className="row">
              <div className="infoUniswap">Voters</div>
              <div className="infoUniswap">Votes</div>
              <div className="infoUniswap">Stimme</div>
            </div>
            {id3 < 9 ? (
              <p className="title1 mt-10">
                Alle Proposals von 1 bis 8 sind von vorherige Governance
                Versionen übernommen!!!
              </p>
            ) : id3 == 12 || id3 == 15 || id3 == 21 ? (
              <p className="title1 mt-10">
                Es gibt keine Votes, weil diese Proposal, bevor jemand zu voten,
                gecancelt wurde!!!
              </p>
            ) : filteredVoteCast3.length != 0 ? (
              <UebersichtTabelle3
                voters3={voters3}
                votes3={votes3}
                support3={support3}
                i3={id3}
              />
            ) : (
              <div className="title1 mt-5">Loading...</div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default uebersicht;
