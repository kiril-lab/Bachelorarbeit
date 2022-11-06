import { useEffect } from "react";
interface Props {
  voters: string[];
  answers: string[];
}
const UebersichtTabelle = ({ voters, answers }: Props) => {
  useEffect(() => {}, [voters, answers]);
  return (
    <div className="row mb-[3rem]">
      <div className="w-[20%]">
        {voters?.map((x, i) => {
          return <div key={i}>{x}</div>;
        })}
      </div>
      <div className="w-[20%]">unbekannt</div>
      <div className="w-[20%]">
        {answers?.map((x, i) => {
          return (
            <div key={i}>
              {x === "yes" ? "ja" : x === "no" ? "nein" : "enthalten"}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UebersichtTabelle;
