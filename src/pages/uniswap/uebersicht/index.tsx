import type { NextPage } from "next";
import UebersichtTabelle from "../../../components/Uniswap/UebersichtTabelle";

const uebersicht: NextPage = () => {
  return (
    <div className="flex flex-col mt-[2rem]">
      <div className="title">Proposal</div>
      <div className="row">
        <div className="infoUniswap">Voters</div>
        <div className="infoUniswap">Votes</div>
        <div className="infoUniswap">Stimme</div>
      </div>  
      <UebersichtTabelle />
    </div>
  );
};

export default uebersicht;
