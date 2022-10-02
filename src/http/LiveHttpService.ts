import { HttpService, RootObject1, Response, RootObject2 } from "../types/http";

export default class LiveHttpService implements HttpService {
  async GetStatistik1(): Promise<Response<RootObject1>> {
    const req = new Request(
      "https://api.compound.finance/api/v2/governance/history?network=mainnet",
      { method: "GET" }
    );
    const response = await fetch(req);
    if (response.status === 200) {
      const json = (await response.json()) as RootObject1;
      return { successfull: true, entity: json };
    } else {
      return { successfull: false };
    }
  }

  async GetStatistik2(i: string): Promise<Response<RootObject2>> {
    const req = new Request(
      `https://api.compound.finance/api/v2/governance/proposals?page_size=50&page_number=${i}&with_detail=false&network=mainnet`,
      { method: "GET" }
    );
    const response = await fetch(req);
    if (response.status === 200) {
      const json = (await response.json()) as RootObject2;
      return { successfull: true, entity: json };
    } else {
      return { successfull: false };
    }
  }
}
