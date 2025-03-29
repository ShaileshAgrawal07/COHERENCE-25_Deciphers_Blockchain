import React from 'react';
import { Button } from '@mui/material';
import { getContract } from '../utils/contract';

const CreateDID = ({ signer }) => {
  const handleCreateDID = async () => {
    const contract = getContract(signer);
    try {
      const tx = await contract.createDID();
      await tx.wait();
      alert('DID created successfully.');
    } catch (error) {
      console.error('Error creating DID:', error);
      alert('Failed to create DID.');
    }
  };

  return <Button variant="contained" onClick={handleCreateDID}>Create DID</Button>;
};

export default CreateDID;
