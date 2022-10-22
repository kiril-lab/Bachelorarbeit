import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Compound from "../../components/Compound/Compound";
import { CONTRACT_ABI_Alpha } from "../../contracts/compound/abi_alpha";
import { CONTRACT_ABI_Bravo } from "../../contracts/compound/abi_bravo";
import useProposalThreshold from "../../hooks/useProposalThreshold";
import useQuorumVotes from "../../hooks/useQuorumVotes";
import useViewEvent from "../../hooks/useViewEvent";
import httpContext from "../../http/HttpContext";
import {
  Compound_Governor_Alpha_Addr,
  Compound_Governor_Bravo_Addr,
  Start_End_Block_Proposal_ParametersCompound,
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
  const getAllProposalVoters = (i: number) => {
    const VotesInAlpha = useViewEvent(
      Compound_Governor_Alpha_Addr,
      CONTRACT_ABI_Alpha,
      Start_End_Block_Proposal_ParametersCompound[i - 1]?.startBlock,
      Start_End_Block_Proposal_ParametersCompound[i - 1]?.endBlock
    ).votes;
    const VotesInBravo = useViewEvent(
      Compound_Governor_Bravo_Addr,
      CONTRACT_ABI_Bravo,
      Start_End_Block_Proposal_ParametersCompound[i - 1]?.startBlock,
      Start_End_Block_Proposal_ParametersCompound[i - 1]?.endBlock
    ).votes;
    const Votes = [...VotesInAlpha, ...VotesInBravo];
    const args = Votes?.map((x) => x?.args);
    const Voters = args?.map((x) => {
      const proposalId: number = x?.proposalId.toNumber();
      const voters: string = x?.voter;
      return { proposalId, voters };
    });
    const filteredVoteCast = Voters?.filter((x) => x.proposalId == i);
    const voters = filteredVoteCast?.map((x) => {
      return x.voters;
    });
    return voters;
  };
  const getAllVoters = () => {
    const voterBatches = [];
    for (
      let i = 1;
      i <= Start_End_Block_Proposal_ParametersCompound.length;
      i++
    ) {
      voterBatches.push(getAllProposalVoters(i));
    }
    const allAdressVolters = voterBatches.flat();
    const uniquie = allAdressVolters.filter(
      (x, i) => allAdressVolters.indexOf(x) === i
    );
    return uniquie.length;
  };
  const votersNumber = getAllVoters();
  /*dies Kode gibt die Nummer von Start und and block bei 
  Konstanetn Start_End_Block_Proposal_ParametersCompound
  und Konstant Start_EndBlock_CreateProposal_Event
  in Datei \src\lib\const.ts */
  /*
  const ProposalsInAlpha = useViewEvent(
    Compound_Governor_Alpha_Addr,
    CONTRACT_ABI_Alpha,
    9601459,
    12140390
  ).proposals;
  const ProposalsInBravo = useViewEvent(
    Compound_Governor_Bravo_Addr,
    CONTRACT_ABI_Bravo,
    12006099,
    15799268
  ).proposals;
  const AllProposals = [...ProposalsInAlpha, ...ProposalsInBravo];
  const allBlockNumbers = AllProposals.map((x)=>{
    return x.blockNumber
  })
  const EventsBatches =[]
  EventsBatches.push(allBlockNumbers)
  const allNumbers = EventsBatches.flat()
  const result = allNumbers.filter(
    (x, i) => allNumbers.indexOf(x) === i
  );
  console.log(result)
  const argsProposolals = AllProposals.map((x) => {
    return x?.args;
  });
  const ProposalCreated = argsProposolals?.map((x) => {
    const proposalId = x?.[0].toNumber();
    const startBlock = x?.[6].toNumber();
    const endBlock = x?.[7].toNumber();
    return { [proposalId]: { startBlock, endBlock } };
  });
  /*if (ProposalCreated.length > 0) {
    console.log(ProposalCreated);
  }*/
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
    <Compound
      data1={data2_1}
      data2={data2_2}
      data3={data2_3}
      data={data1}
      quorum={Quorum}
      threshold={Threshold}
      votersNumber={votersNumber}
    />
  );
};

export default compound;
