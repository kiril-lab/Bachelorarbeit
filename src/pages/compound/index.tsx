import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Compound1 from "../../components/Compound1";
import Compound2 from "../../components/Compound2";
import { CONTRACT_ABI } from "../../contracts/compound/abi";
import useProposalThreshold from "../../hooks/useproposalThreshold";
import useQuorumVotes from "../../hooks/usequorumVotes";
import httpContext from "../../http/HttpContext";
import { Compound_Addr } from "../../lib/const";
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
  const Quorum = useQuorumVotes(Compound_Addr, CONTRACT_ABI);
  const Threshold = useProposalThreshold(Compound_Addr, CONTRACT_ABI);
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
      <Compound1 data={data1} quorum={Quorum} threshold={Threshold} />
      <Compound2 data1={data2_1} data2={data2_2} data3={data2_3} />
    </>
  );
};

export default compound;
