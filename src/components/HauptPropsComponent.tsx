import Link from "next/link";
interface Props {
  title: string;
  stimmOption: string;
  quorum: string;
  threschold: string;
  allProposals: number | string;
  erfolgreicheP: number | string;
  canceledP: number | string;
  erfolgQuote: number | string | undefined;
  numbProposers: number;
  linkMonatlich: string;
  numbVoters: number;
  linkUebersicht: string;
  classInfo: string;
}
const HauptComponent = ({
  title,
  stimmOption,
  quorum,
  threschold,
  allProposals,
  erfolgreicheP,
  canceledP,
  erfolgQuote,
  numbProposers,
  linkMonatlich,
  numbVoters,
  linkUebersicht,
  classInfo,
}: Props) => {
  return (
    <div className="flex felx-col justify-center align-center">
      <div className="flex flex-col justify-center align-center w-[75%] mt-[2rem]">
        <div className="title mb-[2rem]">{title}</div>
        <div className="border-[5px]">
          <div className="title1 mt-[2rem]">Votes</div>
          <div className="row">
            <div className={classInfo}>Gesamte Stimmoptionen</div>
            <div className={classInfo}>Quorum</div>
            <div className={classInfo}>Threshold</div>
          </div>
          <div className="row mb-[2rem]">
            <div className="w-[20%]">{stimmOption}</div>
            <div className="w-[20%]">{quorum}</div>
            <div className="w-[20%]">{threschold}</div>
          </div>
          <div className="w-[100%] flex justify-center">
            <hr className="w-[40%] border-[2px]" />
          </div>
          <div className="title1 mt-[2rem]">Proposals</div>
          <div className="row">
            <div className={classInfo}>Alle Proposals bis November 2022</div>
            <div className={classInfo}>Erfolgreiche Proposals</div>
            <div className={classInfo}>Stornierte Proposals</div>
          </div>
          <div className="row  mb-[2rem]">
            <div className="w-[20%]">{allProposals}</div>
            <div className="w-[20%]">{erfolgreicheP}</div>
            <div className="w-[20%]">{canceledP}</div>
          </div>
          <div className="row">
            <div className={classInfo}>Erfolgsquote</div>
            <div className={classInfo}>Number unterschiedlische Proposers</div>
            <div className={classInfo}>Proposals monatlich</div>
          </div>
          <div className="row mb-[2rem]">
            <div className="w-[20%]">{erfolgQuote}</div>
            <div className="w-[20%]">{numbProposers}</div>
            <div className="w-[20%] underline">
              <Link href={linkMonatlich}>Übersicht</Link>
            </div>
          </div>
          <div className="w-[100%] flex justify-center">
            <hr className="w-[40%] border-[2px]" />
          </div>
          <div className="title1 mt-[2rem]">Voters</div>
          <div className="row">
            <div className={classInfo}>Number unterschiedlische Voters</div>
            <div className={classInfo}>Übersicht per Proposals</div>
          </div>
          <div className="row mb-[2rem]">
            <div className="w-[20%]">{numbVoters}</div>
            <div className="w-[20%] underline">
              <Link href={linkUebersicht}>Übersicht</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HauptComponent;
