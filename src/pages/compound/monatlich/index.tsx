import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import UebersichtMonatlich from "../../../components/Compound/UebersichtMonatlich";
import httpContext from "../../../http/HttpContext";
import { RootObject2 } from "../../../types/httpCompound";

const data: RootObject2 = {
  proposals: [],
};
const monatlich: NextPage = () => {
  const httpService = useContext(httpContext);
  const [data1, SetData2_1] = useState<RootObject2>(data);
  const [data2, SetData2_2] = useState<RootObject2>(data);
  const [data3, SetData2_3] = useState<RootObject2>(data);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data1Fetch = await httpService.GetCompound2("1");
      const data2Fetch = await httpService.GetCompound2("2");
      const data3Fetch = await httpService.GetCompound2("3");
      if (
        data1Fetch.successfull ||
        data2Fetch.successfull ||
        data3Fetch.successfull
      ) {
        const rez2 = data1Fetch.entity;
        const rez3 = data2Fetch.entity;
        const rez4 = data3Fetch.entity;
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
    <div className="flex align-center justify-center">
      <UebersichtMonatlich data1={data1} data2={data2} data3={data3} />
    </div>
  );
};

export default monatlich;
