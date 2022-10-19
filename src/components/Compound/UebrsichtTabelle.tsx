import { ethers } from "ethers";
import { useEffect, useState } from "react";

interface Props {
  Votes: ethers.Event[] | undefined;
  i: number;
}
var event: {
  voters: string[] | undefined;
  votes: string[] | undefined;
  support: boolean[] | undefined;
};
const UebersichtTabelle = ({ Votes, i }: Props) => {
  const [voteCast_i, setVoteCast_i] = useState(event);
  const getVoteCast_i = () => {
    const v = Votes! as ethers.Event[];
    const args = v?.map((a) => {
      return a?.args;
    });
    const voteCast = args?.map((x) => {
      const voters: string = x?.voter;
      const proposalId: number = x?.proposalId.toNumber();
      const votes: string = x?.votes.toString();
      const support: boolean = x?.support;
      return {
        proposalId: proposalId,
        voters: voters,
        votes: votes,
        support: support,
      };
    });
    const filteredVoteCast = voteCast?.filter((x) => x.proposalId == i);

    const votes = filteredVoteCast?.map((x) => {
      return x.votes;
    });
    const voters = filteredVoteCast?.map((x) => {
      return x.voters;
    });
    const support = filteredVoteCast?.map((x) => {
      return x.support;
    });
    const result = {
      voters: voters,
      votes: votes,
      support: support,
    };
    return result;
  };
  useEffect(() => {
    if (
      getVoteCast_i()?.voters != undefined &&
      getVoteCast_i()?.votes != undefined &&
      getVoteCast_i()?.support != undefined
    ) {
      setVoteCast_i({
        voters: getVoteCast_i()?.voters,
        votes: getVoteCast_i()?.votes,
        support: getVoteCast_i()?.support,
      });
    }
  }, [Votes, i]);
  return (
    <div className="row mb-[3rem]">
      <div className="w-[20%]">
        {voteCast_i?.voters?.map((x, i) => {
          return <div key={i}>{x}</div>;
        })}
      </div>
      <div className="w-[20%]">
        {voteCast_i?.votes?.map((x, i) => {
          return <div key={i}>{x}</div>;
        })}
      </div>
      <div className="w-[20%]">
        {voteCast_i?.support?.map((x, i) => {
          return <div key={i}>{`${x}`}</div>;
        })}
      </div>
    </div>
  );
};
export default UebersichtTabelle;
