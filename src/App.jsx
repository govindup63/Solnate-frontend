import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import LandingPage from './components/LandingPage';
import DonationPage from './components/DonationPage';
import '@solana/wallet-adapter-react-ui/styles.css';

const App = () => {
  const network = 'devnet'; // Use 'mainnet-beta' for mainnet
  const endpoint = clusterApiUrl(network);
  const wallets = [new PhantomWalletAdapter()];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/donate/:publicKey"
          element={
            <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                  <DonationPage />
                </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
