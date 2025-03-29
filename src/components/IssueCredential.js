import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { getContract } from '../utils/contract';

const IssueCredential = ({ signer }) => {
  const [userAddress, setUserAddress] = useState('');
  const [issuer, setIssuer] = useState('');
  const [dataHash, setDataHash] = useState('');
  const [expirationTimestamp, setExpirationTimestamp] = useState('');
  const [issuerSignature, setIssuerSignature] = useState('');

  const handleIssueCredential = async () => {
    const contract = getContract(signer);
    try {
      const tx = await contract.issueCredential(
        userAddress,
        issuer,
        dataHash,
        expirationTimestamp,
        issuerSignature
      );
      await tx.wait();
      alert('Credential issued successfully.');
    } catch (error) {
      console.error('Error issuing credential:', error);
      alert('Failed to issue credential.');
    }
  };

  return (
    <div>
      <TextField label="User Address" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} fullWidth />
      <TextField label="Issuer" value={issuer} onChange={(e) => setIssuer(e.target.value)} fullWidth />
      <TextField label="Data Hash" value={dataHash} onChange={(e) => setDataHash(e.target.value)} fullWidth />
      <TextField label="Expiration Timestamp" value={expirationTimestamp} onChange={(e) => setExpirationTimestamp(e.target.value)} fullWidth />
      <TextField label="Issuer Signature" value={issuerSignature} onChange={(e) => setIssuerSignature(e.target.value)} fullWidth />
      <Button variant="contained" onClick={handleIssueCredential}>Issue Credential</Button>
    </div>
  );
};

export default IssueCredential;
