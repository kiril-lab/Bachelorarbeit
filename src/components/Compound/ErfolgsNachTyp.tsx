import { useEffect, useState } from "react";
import { RootObject2, StateEnum } from "../../types/httpCompound";

interface Props {
  data1: RootObject2;
  data2: RootObject2;
  data3: RootObject2;
}
const Data: { status: StateEnum[]; title: string }[] = [];
const ErfolgsNachTyp = ({ data1, data2, data3 }: Props) => {
  const [proposalInfo, setProposalInfo] = useState(Data);

  const getProposalTitelandStatus = (data: RootObject2) => {
    const title = data.proposals.map((proposal) => {
      const title = proposal.title;
      const status = proposal.states.map((state) => {
        return state.state;
      });
      const statusFilter = status.filter(
        (f) =>
          f == StateEnum.Defeated ||
          f == StateEnum.Executed ||
          f == StateEnum.Canceled
      );
      return { status: statusFilter, title };
    });
    return title;
  };
  useEffect(() => {
    setProposalInfo([
      ...getProposalTitelandStatus(data1),
      ...getProposalTitelandStatus(data2),
      ...getProposalTitelandStatus(data3),
    ]);
  }, [data1, data2, data3]);
  console.log(proposalInfo);
  return (
    <div className="row mb-[3rem]">
      <div className="w-[90%]">
        {proposalInfo?.map((x, i) => {
          return (
            <div className="w-[90%]" key={i}>
              {x.title}
            </div>
          );
        })}
      </div>
      <div className="w-[10%]">
        {proposalInfo?.map((x, i) => {
          return (
            <div className="w-[10%]" key={i}>
              {x.status[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ErfolgsNachTyp;
