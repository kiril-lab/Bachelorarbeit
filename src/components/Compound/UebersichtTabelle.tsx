import { useEffect } from "react";

interface Props {
  voters: string[];
  votes: string[];
  support: (boolean | number)[];
}
const UebersichtTabelle = ({ voters, votes, support }: Props) => {
  useEffect(() => {}, [voters, votes, support]);
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
  );
};
export default UebersichtTabelle;
