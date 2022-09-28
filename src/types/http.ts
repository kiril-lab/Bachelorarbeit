export interface HttpService {
  GetStatistik1(): Promise<Response<RootObject1>>;
  GetStatistik2(i:string): Promise<Response<RootObject2>>;
}

export interface Response<T> {
  successfull: boolean;
  entity?: T | T[];
  error?: string;
  errordesc?: string;
}

export interface RootObject1 {
  error: null;
  proposals_created: number;
  token_holders: number;
  total_comp_allocated: string;
  votes_delegated: string;
  voting_addresses: number;
}
export interface RootObject2 {
  error: null;
  pagination_summary: PaginationSummary;
  proposals: Proposal[];
  request: Request;
}

export interface PaginationSummary {
  page_number: number;
  page_size: number;
  total_entries: number;
  total_pages: number;
}

export interface Proposal {
  against_votes: string;
  description: string;
  for_votes: string;
  id: number;
  states: StateElement[];
  title: string;
}

export interface StateElement {
  end_time: number | null;
  start_time: number;
  state: StateEnum;
  trx_hash: null | string;
}

export enum StateEnum {
  Active = "active",
  Canceled = "canceled",
  Defeated = "defeated",
  Executed = "executed",
  Pending = "pending",
  Queued = "queued",
  Succeeded = "succeeded",
}

export interface Request {
  network: string;
  page_number: number;
  page_size: number;
  proposal_ids: any[];
  state: string;
  with_detail: boolean;
}
