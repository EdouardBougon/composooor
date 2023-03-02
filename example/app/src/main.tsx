import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskProvider } from './snap/context';

const root: HTMLElement | undefined =
  document.getElementById("root") ?? undefined;

if (root === undefined) {
  throw new Error("Undefined html root element");
}

let network_config: Chain = {
  id: 31337,
  name: "local",
  network: "localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://localhost:8545"] },
    public: { http: ["http://localhost:8545"] },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [mainnet, network_config],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Composooor",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <MetaMaskProvider>
          <App />
        </MetaMaskProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
