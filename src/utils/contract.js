import { ethers } from 'ethers';
import contractABI from '../contracts/DecentralizedIdentity.json';

const contractAddress = '0x103b90f79d3e6ac865f4a875becc8d279daba3f9';

export const getContract = (signer) => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};
