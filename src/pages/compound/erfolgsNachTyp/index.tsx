import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import ErfolgsNachTyp from "../../../components/Compound/ErfolgsNachTyp";
import httpContext from "../../../http/HttpContext";
import { RootObject2} from "../../../types/httpCompound";

const data: RootObject2 = {
  proposals: [],
};
const erfolgsNachTyp: NextPage = () => {
    const httpService = useContext(httpContext);
    const [data1, SetData1] = useState<RootObject2>(data);
    const [data2, SetData2] = useState<RootObject2>(data);
    const [data3, SetData3] = useState<RootObject2>(data);
    const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data1Fetch = await httpService.GetCompound2("1");
      const data2Fetch = await httpService.GetCompound2("2");
      const data3Fetch = await httpService.GetCompound2("3");
      if (
        data1Fetch.successfull ||
        data1Fetch.successfull ||
        data2Fetch.successfull ||
        data3Fetch.successfull
      ) {
        const rez1 = data1Fetch.entity;
        const rez2 = data2Fetch.entity;
        const rez3 = data3Fetch.entity;
        SetData1(rez1! as RootObject2);
        SetData2(rez2! as RootObject2);
        SetData3(rez3! as RootObject2);
      } else {
        setError(true);
        console.log(error);
      }
    };
    fetchData();
  }, [httpService]);
  return (
    <div className="flex flex-col mt-[2rem]">
      <div className="title1 mt-[2rem]">Proposals Information</div>
      <div className="row">
        <div className="w-[80%] infoCompound">Title</div>
        <div className="w-[10%] infoCompound">Status</div>
      </div>
      <ErfolgsNachTyp data1={data1} data2={data2} data3={data3} />
    </div>
  );
};

export default erfolgsNachTyp;
