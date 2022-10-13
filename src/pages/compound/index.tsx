import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Compound from "../../components/Compound";
import { CONTRACT_ABI_Alpha } from "../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../contracts/compound/abi_bravo";
import useProposalThreshold from "../../hooks/useProposalThreshold";
import useQuorumVotes from "../../hooks/useQuorumVotes";
import useVotesCast from "../../hooks/useVotesCast";
import httpContext from "../../http/HttpContext";
import {
  Compound_Governor_Alpha_Addr,
  Compound_Governor_Bravo_Addr,
} from "../../lib/const";
import { RootObject1, RootObject2 } from "../../types/httpCompound";

const data_1: RootObject1 = {
  proposals_created: 0,
  token_holders: 0,
  total_comp_allocated: "",
  votes_delegated: "",
  voting_addresses: 0,
};
const data_2: RootObject2 = {
  proposals: [],
};

const compound: NextPage = () => {
  const httpService = useContext(httpContext);
  const [data1, SetData1] = useState<RootObject1>(data_1);
  const [data2_1, SetData2_1] = useState<RootObject2>(data_2);
  const [data2_2, SetData2_2] = useState<RootObject2>(data_2);
  const [data2_3, SetData2_3] = useState<RootObject2>(data_2);
  const [error, setError] = useState(false);
  const Quorum = useQuorumVotes(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
  const Threshold = useProposalThreshold(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha
  );
  const VotesInAlpha = useVotesCast(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    9601459,
    12140390
  ).votes;
  const VotesInBravo = useVotesCast(
    Compound_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    12006099,
    15735133
  ).votes;
  useEffect(() => {
    const fetchData = async () => {
      const data1Fetch = await httpService.GetCompound1();
      const data2_1Fetch = await httpService.GetCompound2("1");
      const data2_2Fetch = await httpService.GetCompound2("2");
      const data2_3Fetch = await httpService.GetCompound2("3");
      if (
        data1Fetch.successfull ||
        data2_1Fetch.successfull ||
        data2_2Fetch.successfull ||
        data2_3Fetch.successfull
      ) {
        const rez1 = data1Fetch.entity;
        const rez2 = data2_1Fetch.entity;
        const rez3 = data2_2Fetch.entity;
        const rez4 = data2_3Fetch.entity;
        SetData1(rez1! as RootObject1);
        SetData2_1(rez2! as RootObject2);
        SetData2_2(rez3! as RootObject2);
        SetData2_3(rez4! as RootObject2);
      } else {
        setError(true);
        console.log(error);
      }
    };
    fetchData();
  }, [httpService]);
  return (
    <>
      <Compound
        data1={data2_1}
        data2={data2_2}
        data3={data2_3}
        data={data1}
        quorum={Quorum}
        threshold={Threshold}
        votesInAlpha={VotesInAlpha}
        votesInBravo={VotesInBravo}
      />
    </>
  );
};

export default compound;
