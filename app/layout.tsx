import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import BottomNav from "@/components/ButtomNav";
import { DynamicContextProvider, mergeNetworks } from "@dynamic-labs/sdk-react-core";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { FlowWalletConnectors } from "@dynamic-labs/flow";
import { AppContextProvider } from "./AppContextProvider";
export const metadata: Metadata = {
  title: "Ether Go",
  description: "Discover and collect animals in the wild!",
};

const inter = Inter({ subsets: ["latin"] });

// Setting up list of evmNetworks
const myEvmNetworks = [
  {
    blockExplorerUrls: ['https://polygonscan.com/'],
    chainId: 137,
    chainName: 'Matic Mainnet',
    iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
    name: 'Polygon',
    nativeCurrency: {
      decimals: 18,
      name: 'MATIC',
      symbol: 'MATIC',
      iconUrl: 'https://app.dynamic.xyz/assets/networks/polygon.svg',
    },
    networkId: 137,
    rpcUrls: ['https://polygon-rpc.com'],
    vanityName: 'Polygon',
  },
  {
    blockExplorerUrls: ['https://lanky-ill-funny-testnet.explorer.testnet.skalenodes.com/'],
    chainId: 37084624,
    chainName: 'SKALE Nebula Hub Testnet',
    iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
    name: 'SKALE Nebula Hub Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'sFUEL',
      symbol: 'sFUEL',
      iconUrl: 'https://app.dynamic.xyz/assets/networks/polygon.svg',
    },
    networkId: 37084624,
    rpcUrls: ['https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet'],
    vanityName: 'SKALE Nebula Hub Testnet',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-b from-purple-400 to-blue-500 min-h-screen`}
      >
        <main className="pb-16">
          <DynamicContextProvider
            settings={{
              // Find your environment id at https://app.dynamic.xyz/dashboard/developer
              environmentId: "8c70b21d-72a6-4cc5-88cf-e7e48f772dd9",
              walletConnectors: [
                EthereumWalletConnectors,
                FlowWalletConnectors,
              ],
              overrides: {
                evmNetworks: myEvmNetworks,
              }
            }}
          >
            <AppContextProvider>{children}</AppContextProvider>
          </DynamicContextProvider>
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
