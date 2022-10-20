import { Network } from "../types/network";

export function getRPC(network: Network) {
  switch (network) {
    case Network.ethereum:
      return "https://eth-rpc.gateway.pokt.network";
  }
}
export function Quote(i: number, j: number) {
  return j / i;
}
