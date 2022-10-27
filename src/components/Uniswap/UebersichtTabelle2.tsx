import { useEffect } from "react";

interface Props {
  voters2: string[];
  votes2: string[];
  support2: boolean[];
  i2: number;
}
const UebersichtTabelle2 = ({ voters2, votes2, support2, i2 }: Props) => {
  useEffect(() => {}, [voters2, votes2, support2, i2]);
  return (
    <div className="row mb-[3rem]">
      <div className="w-[20%]">
        {voters2?.map((x, i) => {
          return <div key={i}>{x}</div>;
        })}
      </div>
      <div className="w-[20%]">
        {votes2?.map((x, i) => {
          return <div key={i}>{x}</div>;
        })}
      </div>
      <div className="w-[20%]">
        {support2?.map((x, i) => {
          return <div key={i}>{x == true ? "ja" : "nein"}</div>;
        })}
      </div>
    </div>
  );
};
export default UebersichtTabelle2;
