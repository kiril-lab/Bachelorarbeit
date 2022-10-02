import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Statistik1 from "../../components/Statistik1";
import Statistik2 from "../../components/Statistik2";
import httpContext from "../../http/HttpContext";
import {
  PaginationSummary,
  RootObject1,
  RootObject2,
  Request,
} from "../../types/http";

const data_1: RootObject1 = {
  error: null,
  proposals_created: 0,
  token_holders: 0,
  total_comp_allocated: "",
  votes_delegated: "",
  voting_addresses: 0,
};
const pagin: PaginationSummary = {
  page_number: 0,
  page_size: 0,
  total_entries: 0,
  total_pages: 0,
};
const req: Request = {
  network: "",
  page_number: 0,
  page_size: 0,
  proposal_ids: [],
  state: "",
  with_detail: false,
};
const data_2: RootObject2 = {
  error: null,
  pagination_summary: pagin,
  proposals: [],
  request: req,
};

const Compound: NextPage = () => {
  const httpService = useContext(httpContext);
  const [data1, SetData1] = useState<RootObject1>(data_1);
  const [data2_1, SetData2_1] = useState<RootObject2>(data_2);
  const [data2_2, SetData2_2] = useState<RootObject2>(data_2);
  const [data2_3, SetData2_3] = useState<RootObject2>(data_2);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data1Fetch = await httpService.GetStatistik1();
      const data2_1Fetch = await httpService.GetStatistik2("1");
      const data2_2Fetch = await httpService.GetStatistik2("2");
      const data2_3Fetch = await httpService.GetStatistik2("3");
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
      <Statistik1 data={data1} />
      <Statistik2 data1={data2_1} data2={data2_2} data3={data2_3} />
    </>
  );
};

export default Compound;
