import { Network } from "../types/network";

export function getRPC(network: Network) {
  switch (network) {
    case Network.ethereum:
      return "https://eth-rpc.gateway.pokt.network";
  }
}
export function Quote(i: number, j: number, k: number) {
  const result = (k / (i - j)) * 100;
  return result.toFixed(1);
}
export function Quote1(i: number, j: number) {
  const result = (j / i) * 100;
  return result.toFixed(1);
}
export const getElementsSum = (arr: number[]) => {
  const summe = arr.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  return summe;
};
