import {
  HttpService,
  Response,
  RootObject,
  RootObject2,
  RootObject3,
  RootObject4,
} from "../types/httpEvmos";

export default class LiveHttpService implements HttpService {
  async GetDataProposals(): Promise<Response<RootObject>> {
    const req = new Request(`https://api.mintscan.io/v1/evmos/proposals`, {
      method: "GET",
    });
    const response = await fetch(req);
    if (response.status === 200) {
      const json = (await response.json()) as RootObject;
      return { successfull: true, entity: json };
    } else {
      return { successfull: false };
    }
  }
  async GetDataQuorumAndThreshold(): Promise<Response<RootObject2>> {
    const req = new Request(
      "https://api-utility.cosmostation.io/v1/params/evmos_9001-2",
      {
        method: "GET",
      }
    );
    const response = await fetch(req);
    if (response.status === 200) {
      const json = (await response.json()) as RootObject2;
      return { successfull: true, entity: json };
    } else {
      return { successfull: false };
    }
  }
  async GetAllVotesNumberPerProposals(
    i: number
  ): Promise<Response<RootObject3>> {
    const req = new Request(`https://api.mintscan.io/v1/evmos/proposals/${i}`, {
      method: "GET",
    });
    const response = await fetch(req);
    if (response.status === 200) {
      const json = (await response.json()) as RootObject3;
      return { successfull: true, entity: json };
    } else {
      return { successfull: false };
    }
  }
  async GetAllVotesPerProposals(
    i: number,
    j: number
  ): Promise<Response<RootObject4>> {
    const req = new Request(
      `https://api.mintscan.io/v1/evmos/proposals/${i}/votes?limit=60&offset=${j}`,
      {
        method: "GET",
      }
    );
    const response = await fetch(req);
    if (response.status === 200) {
      const json = (await response.json()) as RootObject4;
      return { successfull: true, entity: json };
    } else {
      return { successfull: false };
    }
  }
}
