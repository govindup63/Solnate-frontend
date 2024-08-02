// WalletProvider.js
import { useState, useEffect } from 'react';
import { WalletAdapterNetwork, ConnectionProvider, WalletProvider, Wallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolletWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

const WalletProviderComponent = ({ children }) => {
  const [network, setNetwork] = useState(WalletAdapterNetwork.Mainnet);

  useEffect(() => {
    // You can set the network based on your environment or configuration
    // For example: setNetwork(WalletAdapterNetwork.Devnet);
  }, []);

  const wallets = [
    new PhantomWalletAdapter(),
    new SolletWalletAdapter(),
    new SolflareWalletAdapter()
  ];

  return (
    <ConnectionProvider endpoint={`https://api.${network}.solana.com`}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletProviderComponent;
