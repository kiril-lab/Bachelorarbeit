import Link from "next/link";
interface Props {
  title: string;
  stimmOption: number;
  quorum: string;
  threschold: string;
  allProposals: number;
  erfolgreicheP: number;
  erfolgQuote: number;
  typQuote: number;
  linkMonatlich: string;
  numbVoters: number;
  linkUebersicht: string;
}
function HauptComponent({
  title,
  stimmOption,
  quorum,
  threschold,
  allProposals,
  erfolgreicheP,
  erfolgQuote,
  typQuote,
  linkMonatlich,
  numbVoters,
  linkUebersicht,
}: Props) {
  return (
    <div className="flex flex-col mt-[2rem]">
      <div className="title">{title}</div>
        <div className="title1">Votes</div>
        <div className="row">
          <div className="info">Gesamte Stimmoptionen</div>
          <div className="info">Quorum</div>
          <div className="info">Threshold</div>
        </div>
        <div className="row mb-[5rem]">
          <div className="w-[20%]">{stimmOption}</div>
          <div className="w-[20%]">{quorum}</div>
          <div className="w-[20%]">{threschold}</div>
        </div>
        <div className="title1">Proposals</div>
        <div className="row">
          <div className="info">All Proposals until November 2022</div>
          <div className="info">Erfolgreiche Proposals</div>
          <div className="info">Erfolgsquote</div>
        </div>
        <div className="row  mb-[2rem]">
          <div className="w-[20%]">{allProposals}</div>
          <div className="w-[20%]">{erfolgreicheP}</div>
          <div className="w-[20%]">{erfolgQuote}</div>
        </div>
        <div className="row">
          <div className="info">Erfolgsquote nach Typ</div>
          <div className="info">Proposals monatlich</div>
        </div>
        <div className="row mb-[5rem]">
          <div className="w-[20%]">{typQuote}</div>
          <div className="w-[20%] underline">
            <Link href={linkMonatlich}>Übersicht</Link>
          </div>
        </div>
        <div className="title1">Voters</div>
        <div className="row">
          <div className="info">Number unterschiedlische Voters</div>
          <div className="info">Übersicht per Proposals</div>
        </div>
        <div className="row mb-[5rem]">
          <div className="w-[20%]">{numbVoters}</div>
          <div className="w-[20%] underline">
            <Link href={linkUebersicht}>Übersicht</Link>
          </div>
        </div>
    </div>
  );
}
export default HauptComponent;
