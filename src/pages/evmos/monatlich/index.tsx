import type { NextPage } from "next";
import UebersichtMonatlich from "../../../components/Evmos/UebersichtMonatlicht";

const monatlich: NextPage = () => {
  return (
    <div className="flex align-center justify-center">
      <UebersichtMonatlich />
    </div>
  );
};

export default monatlich;
