import { ethers } from "ethers";
import { useEffect, useState } from "react";

interface Props {
  voters: string[];
  votes: string[];
  support: boolean[];
  i: number;
}
const UebersichtTabelle = ({ voters, votes, support, i }: Props) => {
  useEffect(() => {}, [voters, votes, support, i]);
  return (
    <div className="row mb-[3rem]">
      <div className="w-[20%]">
        {voters?.map((x, i) => {
          return <div key={i}>{x}</div>;
        })}
      </div>
      <div className="w-[20%]">
        {votes?.map((x, i) => {
          return <div key={i}>{x}</div>;
        })}
      </div>
      <div className="w-[20%]">
        {support?.map((x, i) => {
          return <div key={i}>{`${x}`}</div>;
        })}
      </div>
    </div>
  );
};
export default UebersichtTabelle;
