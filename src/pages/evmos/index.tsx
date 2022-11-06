import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Evmos from "../../components/Evmos/Evmos";
import httpContext from "../../http/HttpContext";
import { EvmosNumberVotesPerProposals } from "../../lib/constEvmos";
import { RootObject, RootObject2, RootObject3 } from "../../types/httpEvmos";

const EvmosSeite: NextPage = () => {
  const httpService = useContext(httpContext);
  const [data1, SetData1] = useState<RootObject[]>();
  const [data2, SetData2] = useState<RootObject2>();
  //const [data3, SetData3] = useState<RootObject3[]>();
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data1Fetch = await httpService.GetDataProposals();
      const data2Fetch = await httpService.GetDataQuorumAndThreshold();
      /* const arr = [];
      for (let i = 2; i <= 77; i++) {
        const data3Fetch = await httpService.GetAllVotesNumberPerProposals(i);
        arr.push(data3Fetch);
      }
      const data3FetchArr = arr.flat();
      const fetchData3 = data3FetchArr.map((x) => {
        const successfull = x.successfull;
        const entity = x.entity;
        return { entity: entity, successfull: successfull };
      });
      const entityData3 = fetchData3.map((x) => {
        return x.entity;
      });*/
      if (data1Fetch.successfull || data2Fetch.successfull) {
        const rez1 = data1Fetch.entity;
        const rez2 = data2Fetch.entity;
        //const rez3 = entityData3;
        SetData1(rez1 as RootObject[]);
        SetData2(rez2 as RootObject2);
        //SetData3(rez3 as RootObject3[]);
      } else {
        setError(true);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  /* diese funktion erzeugt die Konstante EvmosNumberVotesPerProposals
     in file ..src/lib/constEvmos.ts
  const AllVoteMeta = data3?.map((x) => {
    const voteMeta = x?.voteMeta;
    const id = x?.id;
    return { id: id, voteMeta: voteMeta };
  });
  const filterAllVoteMeta = AllVoteMeta?.filter((x) => x.id !== undefined);
  const votesNumberPerProposal = filterAllVoteMeta?.map((x) => {
    const id = x.id;
    const numberNoVotes = parseInt(x.voteMeta.no);
    const numberYesVotes = parseInt(x.voteMeta.yes);
    const numberVotesNoWithVeto = parseInt(x.voteMeta.no_with_veto);
    const numberVotesAbstain = parseInt(x.voteMeta.abstain);
    const numbeAllVotes =
      numberNoVotes +
      numberYesVotes +
      numberVotesNoWithVeto +
      numberVotesAbstain;
    return { id, numbeAllVotes };
  });
  console.log(votesNumberPerProposal)*/
  return (
    <>
      <Evmos data1={data1} data2={data2} />
    </>
  );
};

export default EvmosSeite;
