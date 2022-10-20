import type { NextPage } from "next";
import UebersichtTabelle from "../../../components/Evmos/UebersichtTabelle";

const uebersicht: NextPage = () => {
  return (
    <div className="flex flex-col mt-[2rem]">
      <div className="title">Proposal</div>
      <div className="row">
        <div className="info">Voters</div>
        <div className="info">Votes</div>
        <div className="info">Stimme</div>
      </div>
      <UebersichtTabelle />
    </div>
  );
};

export default uebersicht;
