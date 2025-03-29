import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { getContract } from '../utils/contract';

const GetCredentials = ({ signer }) => {
  const [userAddress, setUserAddress] = useState('');
  const [credentials, setCredentials] = useState([]);

  const handleGetCredentials = async () => {
    const contract = getContract(signer);
    try {
      const data = await contract.getCredentials(userAddress);
      setCredentials(data);
    } catch (error) {
      console.error('Error fetching credentials:', error);
      alert('Failed to fetch credentials.');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Get Credentials</h3>
      <TextField
        label="User Address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleGetCredentials}>Get Credentials</Button>
      {credentials.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <h4>Credentials:</h4>
          {credentials.map((cred, index) => (
            <pre key={index} style={{ background: '#f5f5f5', padding: '10px' }}>
              {JSON.stringify(cred, null, 2)}
            </pre>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetCredentials;
