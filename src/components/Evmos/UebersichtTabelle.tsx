import { useEffect } from "react";
interface Props {
  i: number;
  voters: string[];
  answers: string[];
}
const UebersichtTabelle = ({ i, voters, answers }: Props) => {
  useEffect(() => {}, [voters, answers, i]);
  return (
    <>
      {voters && answers !== undefined ? (
        <div className="row mb-[3rem]">
          <div className="w-[20%]">
            {voters?.map((x, i) => {
              return <div key={i}>{x}</div>;
            })}
          </div>
          <div className="w-[20%]">unbekannt</div>
          <div className="w-[20%]">
            {answers?.map((x, i) => {
              return <div key={i}>{x}</div>;
            })}
          </div>
        </div>
      ) : (
        <div className="row mb-[3rem]">Loading...</div>
      )}
    </>
  );
};
export default UebersichtTabelle;
