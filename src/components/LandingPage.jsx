import { useState } from 'react';
import { createDonationLink } from '../api'; // Import your API utility
import './LandingPage.css';

const LandingPage = () => {
  const [publicKey, setPublicKey] = useState(''); // State for public key
  const [email, setEmail] = useState(''); // State for email
  const [link, setLink] = useState(''); // State for storing the generated donation link
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleCreateLinkClick = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      // Call the API function with both publicKey and email
      const response = await createDonationLink(publicKey, email);
      setLink(response.data.donationLink); // Assuming the backend responds with the donation link
    } catch (error) {
      console.error('Error creating donation link:', error);
      alert('Failed to create donation link. Please try again.');
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="landing-page">
      <div className="content">
        <h1>Welcome to SolNate!</h1>
        <p>SolNate is a decentralized platform that allows organizations to easily receive cryptocurrency donations. Generate unique donation links and QR codes to facilitate direct contributions to your cause.</p>
        
        <input
          type="text"
          placeholder="Enter Solana Public Key"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
          className="public-key-input"
        />
        
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
        />

        <button
          onClick={handleCreateLinkClick}
          disabled={isLoading}
          className="create-link-button"
        >
          {isLoading ? 'Generating Link...' : 'Create Donation Link'}
        </button>

        {link && (
          <div className="link-container">
            <p>Your donation link:</p>
            <div className="donation-link">
              <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
