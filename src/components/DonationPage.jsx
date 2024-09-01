import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import "./DonationPage.css";

const DonationPage = () => {
  const { publicKey } = useParams();
  const [organizationData, setOrganizationData] = useState(null);
  const [donationLink, setDonationLink] = useState("");
  const { connection } = useConnection();
  const { publicKey: walletPublicKey, sendTransaction } = useWallet();
  const [isCopied, setIsCopied] = useState(false);
  const [amount, setAmount] = useState(0.01); // Example: Set default amount to 0.01 SOL

  // Determine the base URL based on the environment
  const baseUrl = import.meta.env.REACT_APP_BASE_URL || "http://localhost:5173";

  useEffect(() => {
    setOrganizationData({ name: "Example Organization" });
    setDonationLink(`https://solnate-frontend.vercel.app/donate/${publicKey}`);
  }, [publicKey, baseUrl]);

  const handleCopyClick = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setIsCopied(true))
      .catch((err) => console.error("Failed to copy text:", err));
  };

  const handleDonate = async () => {
    if (!walletPublicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const receiver = new PublicKey(publicKey); // The organization's public key
      const lamports = amount * 1e9; // Convert SOL to lamports

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: walletPublicKey,
          toPubkey: receiver,
          lamports: lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "processed");

      alert("Donation successful!");
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Donation failed. Please try again.");
    }
  };

  return (
    <div className="donation-page">
      <div className="donation-content">
        <div
          className="search-bar"
          onClick={() => handleCopyClick(donationLink)}
        >
          <input
            type="text"
            value={donationLink}
            readOnly
            className="search-input"
            title="Copy this link"
          />
          <button className="copy-button">
            {isCopied ? "Copied!" : "Copy Link"}
          </button>
        </div>
        <h1>
          Donate to {organizationData ? organizationData.name : "Loading..."}
        </h1>
        <div
          className="public-key-section"
          onClick={() => handleCopyClick(publicKey)}
        >
          <div className="public-key-value">{publicKey}</div>
        </div>
        <div className="wallet-connect">
          <WalletMultiButton />
        </div>
        {walletPublicKey && (
          <div className="donation-form">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="amount-input"
              placeholder="Amount in SOL"
            />
            <button onClick={handleDonate} className="donate-button">
              Donate {amount} SOL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationPage;
