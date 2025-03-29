import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import { getContract } from '../utils/contract';

const CredentialsList = ({ signer, address }) => {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCredentials = async () => {
      if (signer && address) {
        setLoading(true);
        const contract = getContract(signer);
        try {
          // First grant yourself access to view credentials
          await contract.grantAccess(address);
          // Then fetch credentials
          const creds = await contract.getCredentials(address);
          setCredentials(creds);
        } catch (error) {
          console.error('Error fetching credentials:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCredentials();
  }, [signer, address]);

  if (!signer) return null;

  return (
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: '8px', mt: 2 }}>
      <Typography variant="h6" gutterBottom>Your Credentials</Typography>
      {loading ? (
        <Typography>Loading credentials...</Typography>
      ) : credentials.length === 0 ? (
        <Typography>No credentials issued yet</Typography>
      ) : (
        <List>
          {credentials.map((cred, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={`Credential ID: ${cred.id}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" display="block">
                        Issuer: {cred.issuer}
                      </Typography>
                      <Typography component="span" variant="body2" display="block">
                        Data Hash: {cred.dataHash}
                      </Typography>
                      <Typography component="span" variant="body2" display="block">
                        Issued: {new Date(cred.issuanceTimestamp * 1000).toLocaleString()}
                      </Typography>
                      <Typography component="span" variant="body2" display="block">
                        Expires: {new Date(cred.expirationTimestamp * 1000).toLocaleString()}
                      </Typography>
                      {cred.isRevoked && (
                        <Chip label="Revoked" color="error" size="small" sx={{ mt: 1 }} />
                      )}
                    </>
                  }
                />
              </ListItem>
              {index < credentials.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CredentialsList;