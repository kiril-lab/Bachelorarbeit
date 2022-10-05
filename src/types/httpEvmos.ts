export interface HttpService {
  GetEvmos(i: string): Promise<Response<RootObject>>;
}

export interface Response<T> {
  successfull: boolean;
  entity?: T | T[];
  error?: string;
  errordesc?: string;
}

export interface RootObject {
  proposals: Proposal[];
}

export interface Proposal {
  content: Content;
  deposit_end_time: Date;
  final_tally_result: FinalTallyResult;
  proposal_id: string;
  status: Status;
  submit_time: Date;
  total_deposit: TotalDeposit[];
  voting_end_time: Date;
  voting_start_time: Date;
}

export interface Content {
  amount?: TotalDeposit[];
  changes?: Change[];
  description: string;
  metadata?: Metadata;
  plan?: Plan;
  recipient?: string;
  subject_client_id?: string;
  substitute_client_id?: string;
  title: string;
}

export interface TotalDeposit {
  amount: string;
  denom: Denom;
}

export enum Denom {
  Aevmos = "aevmos",
}

export interface Change {
  key: string;
  subspace: string;
  value: string;
}

export interface Metadata {
  base: string;
  denom_units: DenomUnit[];
  description: string;
  display: string;
  name: string;
  symbol: string;
}

export interface DenomUnit {
  aliases: string[];
  denom: string;
  exponent: number;
}

export interface Plan {
  height: string;
  info: string;
  name: string;
  time: Date;
  upgraded_client_state: null;
}

export interface FinalTallyResult {
  abstain: string;
  no: string;
  no_with_veto: string;
  yes: string;
}

export enum Status {
  ProposalStatusDepositPeriod = "PROPOSAL_STATUS_DEPOSIT_PERIOD",
  ProposalStatusPassed = "PROPOSAL_STATUS_PASSED",
  ProposalStatusRejected = "PROPOSAL_STATUS_REJECTED",
  ProposalStatusVotingPeriod = "PROPOSAL_STATUS_VOTING_PERIOD",
}
