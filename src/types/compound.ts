export interface Years {
  year_one: number;
  year_two: number;
  year_tree: number;
}
export enum Year {
  one = 2020,
  two = 2021,
  tree = 2022,
}
export interface Datum {
  month: number;
  year: number;
}
export interface Proposal {
  active: number;
  canceled: number;
  defeated: number;
  executed: number;
  pending: number;
  queued: number;
  succeeded: number;
}
