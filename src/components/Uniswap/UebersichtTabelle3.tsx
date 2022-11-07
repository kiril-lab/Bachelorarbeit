import { useEffect } from "react";

interface Props {
  voters3: string[];
  votes3: string[];
  support3: number[];
  i3: number;
}
const UebersichtTabelle3 = ({ voters3, votes3, support3, i3 }: Props) => {
  useEffect(() => {}, [voters3, votes3, support3, i3]);
  return (
    <>
      <div className="row mb-[3rem]">
        <div className="w-[20%]">
          {voters3?.map((x, i) => {
            return <div key={i}>{x}</div>;
          })}
        </div>
        <div className="w-[20%]">
          {votes3?.map((x, i) => {
            return <div key={i}>{x}</div>;
          })}
        </div>
        <div className="w-[20%]">
          {support3?.map((x, i) => {
            return (
              <div key={i}>{x == 1 ? "ja" : x == 0 ? "nein" : "enthalten"}</div>
            );
          })}
        </div>
      </div>
      {i3 == 17 || i3 == 18 ? (
        <p className="title1">
          Diese Proposal wurde ab diesem Zeitpunkt gecancelt!!!
        </p>
      ) : null}
    </>
  );
};
export default UebersichtTabelle3;
