import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { getContract } from '../utils/contract';

const GrantAccess = ({ signer }) => {
  const [verifierAddress, setVerifierAddress] = useState('');

  const handleGrantAccess = async () => {
    const contract = getContract(signer);
    try {
      const tx = await contract.grantAccess(verifierAddress);
      await tx.wait();
      alert('Access granted successfully.');
    } catch (error) {
      console.error('Error granting access:', error);
      alert('Failed to grant access.');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Grant Access to Verifier</h3>
      <TextField
        label="Verifier Address"
        value={verifierAddress}
        onChange={(e) => setVerifierAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleGrantAccess}>Grant Access</Button>
    </div>
  );
};

export default GrantAccess;
