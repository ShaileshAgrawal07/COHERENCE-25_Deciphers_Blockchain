import { ethers } from 'ethers';
import { getSigner } from './web3';
import DecentralizedIdentityABI from './DecentralizedIdentityABI.json';

const contractAddress = '0x103b90f79d3e6ac865f4a875becc8d279daba3f9';

const getContract = async () => {
  const signer = await getSigner();
  if (signer) {
    return new ethers.Contract(contractAddress, DecentralizedIdentityABI, signer);
  }
  return null;
};

export { getContract };
