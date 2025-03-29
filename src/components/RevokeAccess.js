import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { getContract } from '../utils/contract';

const RevokeAccess = ({ signer }) => {
  const [verifierAddress, setVerifierAddress] = useState('');

  const handleRevokeAccess = async () => {
    const contract = getContract(signer);
    try {
      const tx = await contract.revokeAccess(verifierAddress);
      await tx.wait();
      alert('Access revoked successfully.');
    } catch (error) {
      console.error('Error revoking access:', error);
      alert('Failed to revoke access.');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Revoke Access</h3>
      <TextField
        label="Verifier Address"
        value={verifierAddress}
        onChange={(e) => setVerifierAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleRevokeAccess}>Revoke Access</Button>
    </div>
  );
};

export default RevokeAccess;
