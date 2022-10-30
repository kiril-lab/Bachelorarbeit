import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Evmos from "../../components/Evmos/Evmos";
import httpContext from "../../http/HttpContext";
import { RootObject, RootObject2 } from "../../types/httpEvmos";

const EvmosSeite: NextPage = () => {
  const httpService = useContext(httpContext);
  const [data1, SetData1] = useState<RootObject[]>();
  const [data2, SetData2] = useState<RootObject2>();
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data1Fetch = await httpService.GetDataProposals();
      const data2Fetch = await httpService.GetDataQuorumAndThreshold();
      if (data1Fetch.successfull || data2Fetch.successfull) {
        const rez1 = data1Fetch.entity;
        const rez2 = data2Fetch.entity;
        SetData1(rez1 as RootObject[]);
        SetData2(rez2 as RootObject2);
      } else {
        setError(true);
        console.log(error);
      }
    };
    fetchData();
  }, [httpService]);
  return (
    <>
      <Evmos data1={data1} data2={data2} />
    </>
  );
};

export default EvmosSeite;
