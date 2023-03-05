import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskProvider } from './snap/context';
import { hardhat, polygon, baseGoerli } from 'wagmi/chains';

const root: HTMLElement | undefined =
  document.getElementById("root") ?? undefined;

if (root === undefined) {
  throw new Error("Undefined html root element");
}

const { chains, provider } = configureChains(
  window.location.host.match('localhost') !== null
    ? [hardhat, baseGoerli, polygon]
    : [baseGoerli, polygon],
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
