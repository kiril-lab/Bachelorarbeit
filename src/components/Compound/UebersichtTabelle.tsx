import { useEffect } from "react";

interface Props {
  voters: string[];
  votes: number[];
  support: (boolean | number)[];
  i: number;
}
const UebersichtTabelle = ({ voters, votes, support, i }: Props) => {
  useEffect(() => {}, [voters, votes, support, i]);
  /*votes.sort((a, b) => {
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
            return (
              <div key={i}>
                {x == true || x == 1
                  ? "ja"
                  : x == false || x == 0
                  ? "nein"
                  : "enthalten"}
              </div>
            );
          })}
        </div>
      </div>
      {i == 13 ||
      i == 28 ||
      i == 63 ||
      i == 79 ||
      i == 93 ||
      i == 95 ||
      i == 99 ||
      i == 106 ||
      i == 118 ||
      i == 121 ? (
        <p className="title1">
          Diese Proposal wurde ab diesem Zeitpunkt gecancelt!!!
        </p>
      ) : null}
    </>
  );
};
export default UebersichtTabelle;
