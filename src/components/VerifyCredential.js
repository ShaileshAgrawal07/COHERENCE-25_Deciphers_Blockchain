import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { getContract } from '../utils/contract';

const VerifyCredential = ({ signer }) => {
  const [userAddress, setUserAddress] = useState('');
  const [credentialIndex, setCredentialIndex] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleVerify = async () => {
    const contract = getContract(signer);
    try {
      const valid = await contract.verifyCredential(userAddress, credentialIndex);
      setIsValid(valid);
    } catch (error) {
      console.error('Verification error:', error);
      alert('Failed to verify credential.');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Verify Credential</h3>
      <TextField
        label="User Address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Credential Index"
        value={credentialIndex}
        onChange={(e) => setCredentialIndex(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleVerify}>Verify</Button>
      {isValid !== null && (
        <p style={{ marginTop: '10px' }}>
          {isValid ? '✅ Credential is valid' : '❌ Credential is invalid'}
        </p>
      )}
    </div>
  );
};

export default VerifyCredential;
