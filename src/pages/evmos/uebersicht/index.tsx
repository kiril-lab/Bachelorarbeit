import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import UebersichtTabelle from "../../../components/Evmos/UebersichtTabelle";
import httpContext from "../../../http/HttpContext";
import {
  EvmosNumberVotesPerProposals,
  HundleChangeArr,
} from "../../../lib/constEvmos";
import { allVotesEvmos } from "../../../lib/votesEvmos";

const uebersicht: NextPage = () => {
  const httpService = useContext(httpContext);
  const All_ids = EvmosNumberVotesPerProposals.map((x) => {
    return x.id;
  });
  const AllVotesNumber = EvmosNumberVotesPerProposals.map((x) => {
    return x.numberAllVotes;
  });

  /* Diese Funktion erzeugt die Konstante allVotesEvmos
     in file ..src/lib/votesEvmos.ts

  const fetchData = async () => {
    const arr = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 2; j++) {
        if (i == parseInt(All_ids[j])) {
          for (let z = 0; z < AllVotesNumber[j]; z += 60) {
            const dataFetch = await httpService.GetAllVotesPerProposals(i, z);
            arr.push({ proposalId: i, dataFetch: dataFetch });
            console.log(arr);
          }
        }
      }
    }
  };
  console.log(fetchData());*/

  const [id, setId] = useState(2);
  const handleChange = (event: any) => {
    const value = event.target.value;
    setId(value);
  };
  const filter = allVotesEvmos.filter((x) => x.proposalId == id);
  const data = filter.map((x) => {
    return x.dataFetch.entity;
  });
  const result = data.flat();
  const voters = result.map((x) => {
    return x.voter;
  });
  const answers = result.map((x) => {
    return x.answer;
  });
  useEffect(() => {
    handleChange;
  }, [httpService]);
  return (
    <div className="flex flex-col mt-[2rem]">
      <div className="title">
        <p className="mr-1">Proposal</p>
        <label className="flex">
          <select value={id} onChange={handleChange}>
            {HundleChangeArr.map((x, i) => {
              return (
                <option key={i} value={x}>
                  {x}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div className="row">
        <div className="infoEvmos">Voters</div>
        <div className="infoEvmos">Votes</div>
        <div className="infoEvmos">Stimme</div>
      </div>
      {id <= 3 ? (
        <UebersichtTabelle voters={voters} answers={answers} />
      ) : (
        <div className="title1 mt-5">
          Da es viele Voters per Proposals gibt, werden nur die Voters von
          Proposal 2 und 3 geszeigt.
        </div>
      )}
    </div>
  );
};

export default uebersicht;
