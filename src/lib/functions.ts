import { Network } from "../types/network";

export function getRPC(network: Network) {
  switch (network) {
    case Network.ethereum:
      return "https://eth-rpc.gateway.pokt.network";
  }
}
export function Quote(i: number, j: number, k: number) {
  const result = (k / (i - j)) * 100;
  return result.toFixed();
}
