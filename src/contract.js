import { ethers } from "ethers";
import IdentityABI from "../contracts/DecentralizedIdentity.json";

const contractAddress = "0x103b90f79d3e6ac865f4a875becc8d279daba3f9";

export const getContract = (signer) => {
  return new ethers.Contract(contractAddress, IdentityABI.abi, signer);
};

export const createDID = async (signer) => {
  const contract = getContract(signer);
  const tx = await contract.createDID();
  await tx.wait();
};

export const issueCredential = async (signer, user, issuer, dataHash, expirationTimestamp, signature) => {
  const contract = getContract(signer);
  const tx = await contract.issueCredential(user, issuer, dataHash, expirationTimestamp, signature);
  await tx.wait();
};

export const grantAccess = async (signer, verifier) => {
  const contract = getContract(signer);
  const tx = await contract.grantAccess(verifier);
  await tx.wait();
};

export const getCredentials = async (signer, user) => {
  const contract = getContract(signer);
  return await contract.getCredentials(user);
};
