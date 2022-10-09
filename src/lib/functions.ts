import { Network } from "../types/network";

export function getRPC(network: Network) {
  switch (network) {
    case Network.polygon:
      return "https://polygon-rpc.com/";
    case Network.ethereum:
      return "https://eth-rpc.gateway.pokt.network";
  }
}
