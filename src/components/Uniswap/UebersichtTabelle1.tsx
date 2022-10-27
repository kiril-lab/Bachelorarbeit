import { useEffect } from "react";

interface Props {
  voters1: string[];
  votes1: string[];
  support1: boolean[];
  i1: number;
}
const UebersichtTabelle1 = ({ voters1, votes1, support1, i1 }: Props) => {
  useEffect(() => {}, [voters1, votes1, support1, i1]);
  return (
    <div className="row mb-[3rem]">
      <div className="w-[20%]">
        {voters1?.map((x, i) => {
          return <div key={i}>{x}</div>;
        })}
      </div>
      <div className="w-[20%]">
        {votes1?.map((x, i) => {
          return <div key={i}>{x}</div>;
        })}
      </div>
      <div className="w-[20%]">
        {support1?.map((x, i) => {
          return <div key={i}>{x==true?"ja":"nein"}</div>;
        })}
      </div>
    </div>
  );
};
export default UebersichtTabelle1;
