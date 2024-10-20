import { createPublicClient, createWalletClient, custom, http } from "viem";
import { polygonAmoy, skaleNebulaTestnet } from "viem/chains";

export const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(),
});

// Check if window is available (client-side) before using window.ethereum
export const walletClient =
  typeof window !== "undefined" && window.ethereum
    ? createWalletClient({
        chain: polygonAmoy,
        transport: custom(window.ethereum),
      })
    : null;

export const skalePublicClient = createPublicClient({
  chain: skaleNebulaTestnet,
  transport: http(),
});

// Check if window is available (client-side) before using window.ethereum
export const skaleWalletClient =
  typeof window !== "undefined" && window.ethereum
    ? createWalletClient({
        chain: skaleNebulaTestnet,
        transport: custom(window.ethereum),
      })
    : null;

// JSON-RPC Account
// ts-expect-error await
export const account = walletClient
  ? await walletClient.getAddresses().then((addresses) => addresses[0])
  : null;
