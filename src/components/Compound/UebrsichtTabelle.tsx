import { ethers } from "ethers";
import { useEffect, useState } from "react";

interface Props {
  votesInAlpha: ethers.Event[] | undefined;
  votesInBravo: ethers.Event[] | undefined;
  i: number;
}
var event: {
  voters: string[] | undefined;
  votes: string[] | undefined;
  support: boolean[] | undefined;
};
const UebersichtTabelle = ({ votesInAlpha, votesInBravo, i }: Props) => {
  const [voteCast_i, setVoteCast_i] = useState(event);
  const getVoteCast_i = () => {
    const v = votesInAlpha! as ethers.Event[]
    const v1 = votesInBravo! as ethers.Event[];
    const voteCastArr = v?.concat(v1)
    const args = voteCastArr?.map((a) => {
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
    console.log(filteredVoteCast);
    const proposalId = filteredVoteCast?.map((x) => {
      return x.proposalId;
    });
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
      [proposalId?.[0]]: { voters, votes, support },
    };
    return result;
  };
  useEffect(() => {
    if (
      getVoteCast_i()?.[i]?.voters != undefined &&
      getVoteCast_i()?.[i]?.votes != undefined &&
      getVoteCast_i()?.[i]?.support != undefined
    ) {
      setVoteCast_i({
        voters: getVoteCast_i()?.[i].voters,
        votes: getVoteCast_i()?.[i].votes,
        support: getVoteCast_i()?.[i].support,
      });
    }
  }, [votesInAlpha, votesInBravo, i, voteCast_i]);
  console.log(getVoteCast_i());
  return (
    <div className="row">
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
