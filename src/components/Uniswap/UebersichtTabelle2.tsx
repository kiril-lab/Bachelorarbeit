import { useEffect } from "react";

interface Props {
  voters2: string[];
  votes2: number[];
  support2: boolean[];
  i2: number;
}
const UebersichtTabelle2 = ({ voters2, votes2, support2, i2 }: Props) => {
  useEffect(() => {}, [voters2, votes2, support2, i2]);
  /*votes2.sort((a, b) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });*/
  return (
    <>
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
      {i2 == 2 ? (
        <p className="title1">
          Diese Proposal wurde ab diesem Zeitpunkt gecancelt!!!
        </p>
      ) : i2 == 4 ? (
        <p className="title1">
          Diese Proposals ist nach der Upgrade von Alpha2 zu Bravo erstellt und
          ist nicht in Bravo übernommen!!!
        </p>
      ) : null}
    </>
  );
};
export default UebersichtTabelle2;
