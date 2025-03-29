import React, { useState, useEffect } from 'react';
import { connectWallet } from './utils/web3';
import CreateDID from './components/CreateDID';
import IssueCredential from './components/IssueCredential';
import GrantAccess from './components/GrantAccess';
import RevokeAccess from './components/RevokeAccess';
import GetCredentials from './components/GetCredentials';
import VerifyCredential from './components/VerifyCredential';
import { Button, TextField } from '@mui/material';
import './App.css';
import { LockOpen, Fingerprint, Person } from '@mui/icons-material';
import { ethers } from 'ethers';

function App() {
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    address: '',
    aadhar: '',
    dob: '',
    mobile: ''
  });

  const handleConnect = async () => {
    const data = await connectWallet();
    if (data) {
      setSigner(data.signer);
      setAddress(data.address);
    }
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    console.log("Personal Information Submitted:", personalInfo);
    // No actual functionality changes as per request
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0) {
          // Just update the address and signer without re-requesting permissions
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          setSigner(signer);
          setAddress(accounts[0]);
        } else {
          // Wallet was disconnected
          setSigner(null);
          setAddress('');
        }
      };

      const handleChainChanged = () => {
        window.location.reload(); // Reload on chain change
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Check if wallet is already connected
      const checkConnectedWallet = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          handleAccountsChanged(accounts);
        }
      };
      checkConnectedWallet();

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  // Format address for display (first 6 chars + ... + last 4 chars)
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="identity-container">
      <h1 className="identity-header">
        <Fingerprint sx={{ fontSize: 36, color: '#8B5CF6' }} />
        Decentralized <span>Identity</span> System
      </h1>
      
      {!signer ? (
        <div className="connect-container">
          <div className="glass-card">
            <p className="connect-message">
              Connect your wallet to manage your decentralized identity
            </p>
            <Button 
              variant="contained" 
              onClick={handleConnect} 
              className="wallet-button"
              startIcon={<LockOpen />}
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="address-container">
            <div className="wallet-address">
              {formatAddress(address)}
            </div>
          </div>
          
          {/* Personal Information Form */}
          <div className="personal-info-container">
            <div className="personal-info-card">
              <h2 className="personal-info-title">
                <Person sx={{ fontSize: 24, color: '#8B5CF6', marginRight: '10px' }} />
                Personal Information
              </h2>
              <form onSubmit={handlePersonalInfoSubmit}>
                <div className="form-grid">
                  <div className="form-field">
                    <TextField 
                      label="Full Name" 
                      variant="outlined" 
                      fullWidth
                      name="name"
                      value={personalInfo.name}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <TextField 
                      label="Address" 
                      variant="outlined" 
                      fullWidth
                      name="address"
                      value={personalInfo.address}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <TextField 
                      label="Aadhar Number" 
                      variant="outlined" 
                      fullWidth
                      name="aadhar"
                      value={personalInfo.aadhar}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <TextField 
                      label="Date of Birth" 
                      variant="outlined" 
                      fullWidth
                      name="dob"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={personalInfo.dob}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <TextField 
                      label="Mobile Number" 
                      variant="outlined" 
                      fullWidth
                      name="mobile"
                      value={personalInfo.mobile}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-submit">
                  <Button 
                    type="submit" 
                    variant="contained" 
                    className="submit-button"
                  >
                    Submit Information
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="components-grid">
            <div className="identity-component gradient-card-1">
              <CreateDID signer={signer} />
            </div>
            <div className="identity-component gradient-card-2">
              <IssueCredential signer={signer} />
            </div>
            <div className="identity-component gradient-card-3">
              <GrantAccess signer={signer} />
            </div>
            <div className="identity-component gradient-card-4">
              <RevokeAccess signer={signer} />
            </div>
            <div className="identity-component gradient-card-5">
              <GetCredentials signer={signer} />
            </div>
            <div className="identity-component gradient-card-6">
              <VerifyCredential signer={signer} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import { connectWallet } from './utils/web3';
// import CreateDID from './components/CreateDID';
// import IssueCredential from './components/IssueCredential';
// import GrantAccess from './components/GrantAccess';
// import RevokeAccess from './components/RevokeAccess';
// import GetCredentials from './components/GetCredentials';
// import VerifyCredential from './components/VerifyCredential';
// import { Button } from '@mui/material';
// import './App.css';
// import { LockOpen, Fingerprint } from '@mui/icons-material';
// import { ethers } from 'ethers';

// function App() {
//   const [signer, setSigner] = useState(null);
//   const [address, setAddress] = useState('');

//   const handleConnect = async () => {
//     const data = await connectWallet();
//     if (data) {
//       setSigner(data.signer);
//       setAddress(data.address);
//     }
//   };

//   useEffect(() => {
//     if (window.ethereum) {
//       const handleAccountsChanged = async (accounts) => {
//         if (accounts.length > 0) {
//           // Just update the address and signer without re-requesting permissions
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           const signer = await provider.getSigner();
//           setSigner(signer);
//           setAddress(accounts[0]);
//         } else {
//           // Wallet was disconnected
//           setSigner(null);
//           setAddress('');
//         }
//       };

//       const handleChainChanged = () => {
//         window.location.reload(); // Reload on chain change
//       };

//       window.ethereum.on('accountsChanged', handleAccountsChanged);
//       window.ethereum.on('chainChanged', handleChainChanged);

//       // Check if wallet is already connected
//       const checkConnectedWallet = async () => {
//         const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//         if (accounts.length > 0) {
//           handleAccountsChanged(accounts);
//         }
//       };
//       checkConnectedWallet();

//       return () => {
//         window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
//         window.ethereum.removeListener('chainChanged', handleChainChanged);
//       };
//     }
//   }, []);

//   // Format address for display (first 6 chars + ... + last 4 chars)
//   const formatAddress = (addr) => {
//     if (!addr) return '';
//     return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
//   };

//   return (
//     <div className="identity-container">
//       <h1 className="identity-header">
//         <Fingerprint sx={{ fontSize: 36, color: '#8B5CF6' }} />
//         Decentralized <span>Identity</span> System
//       </h1>
      
//       {!signer ? (
//         <div style={{ textAlign: 'center', padding: '40px 0' }}>
//           <p style={{ marginBottom: '20px', color: '#666', fontSize: '1.1rem' }}>
//             Connect your wallet to manage your decentralized identity
//           </p>
//           <Button 
//             variant="contained" 
//             onClick={handleConnect} 
//             className="wallet-button"
//             startIcon={<LockOpen />}
//           >
//             Connect Wallet
//           </Button>
//         </div>
//       ) : (
//         <div>
//           <div style={{ textAlign: 'center', marginBottom: '30px' }}>
//             <div className="wallet-address">
//               {formatAddress(address)}
//             </div>
//           </div>
          
//           <div className="components-grid">
//             <div className="identity-component">
//               <CreateDID signer={signer} />
//             </div>
//             <div className="identity-component">
//               <IssueCredential signer={signer} />
//             </div>
//             <div className="identity-component">
//               <GrantAccess signer={signer} />
//             </div>
//             <div className="identity-component">
//               <RevokeAccess signer={signer} />
//             </div>
//             <div className="identity-component">
//               <GetCredentials signer={signer} />
//             </div>
//             <div className="identity-component">
//               <VerifyCredential signer={signer} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;