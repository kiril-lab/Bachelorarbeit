export interface HttpService {
  GetDataProposals(): Promise<Response<RootObject>>;
  GetDataQuorumAndThreshold(): Promise<Response<RootObject2>>;
}

export interface Response<T> {
  successfull: boolean;
  entity?: T | T[];
  error?: string;
}

export interface RootObject {
  abstain: string;
  id: string;
  no: string;
  no_with_veto: string;
  proposal_status: ProposalStatus;
  proposer: string;
  submit_time: Date;
  yes: string;
}

export enum ProposalStatus {
  ProposalStatusDepositPeriod = "PROPOSAL_STATUS_DEPOSIT_PERIOD",
  ProposalStatusFailed = "PROPOSAL_STATUS_FAILED",
  ProposalStatusPassed = "PROPOSAL_STATUS_PASSED",
  ProposalStatusRejected = "PROPOSAL_STATUS_REJECTED",
  ProposalStatusVotingPeriod = "PROPOSAL_STATUS_VOTING_PERIOD",
}

export interface RootObject2 {
  Params: Params;
}

export interface Params {
  gov_tallying: Gov;
}

export interface Gov {
  tally_params: TallyParams;
}

export interface TallyParams {
  quorum: string;
  threshold: string;
  veto_threshold: string;
}
