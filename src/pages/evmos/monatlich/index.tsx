import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import UebersichtMonatlich from "../../../components/Evmos/UebersichtMonatlicht";
import httpContext from "../../../http/HttpContext";
import { RootObject } from "../../../types/httpEvmos";

const monatlich: NextPage = () => {
  const httpService = useContext(httpContext);
  const [data, SetData] = useState<RootObject[]>();
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const dataFetch = await httpService.GetDataProposals();
      if (dataFetch.successfull) {
        const rez = dataFetch.entity;
        SetData(rez as RootObject[]);
      } else {
        setError(true);
        console.log(error);
      }
    };
    fetchData();
  }, [httpService]);
  return (
    <div className="flex align-center justify-center">
      <UebersichtMonatlich data={data} />
    </div>
  );
};

export default monatlich;
