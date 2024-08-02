import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DonationPage.css'; // Include CSS for styling

const DonationPage = () => {
  const { publicKey } = useParams(); // Get publicKey from URL
  const [organizationData, setOrganizationData] = useState(null);
  const [donationLink, setDonationLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Optionally, fetch additional data using the publicKey
    // Example: fetch organization details from the backend
    // fetch(`/api/organization/${publicKey}`)
    //   .then(response => response.json())
    //   .then(data => setOrganizationData(data))
    //   .catch(error => console.error('Error fetching organization data:', error));

    // For this example, we'll just set some static data
    setOrganizationData({ name: 'Example Organization' });

    // Generate the donation link
    setDonationLink(`http://localhost:5173/donate/${publicKey}`);
  }, [publicKey]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(donationLink)
      .then(() => setIsCopied(true))
      .catch(err => console.error('Failed to copy text:', err));
  };

  return (
    <div className="donation-page">
      <div className="donation-content">
        <div className="search-bar">
          <input
            type="text"
            value={donationLink}
            readOnly
            className="search-input"
            title="Copy this link"
          />
          <button onClick={handleCopyClick} className="copy-button">
            {isCopied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
        <h1>Donate to {organizationData ? organizationData.name : 'Loading...'}</h1>
        <p>
          Public Key: {publicKey}
        </p>
        <p>
          Instructions for donating using a Solana-compatible wallet...
        </p>
        {/* Include more details or functionalities as needed */}
      </div>
    </div>
  );
};

export default DonationPage;
