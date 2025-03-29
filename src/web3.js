import { ethers } from "ethers";

let provider;
let signer;

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      signer = await provider.getSigner();
      const address = await signer.getAddress();
      return address;
    } catch (err) {
      console.error("User rejected connection:", err);
      return null;
    }
  } else {
    alert("Please install MetaMask!");
    return null;
  }
};

export const getProvider = async () => {
  if (!provider) {
    provider = new ethers.BrowserProvider(window.ethereum);
  }
  return provider;
};

export const getSigner = async () => {
  if (!signer) {
    await connectWallet();
  }
  return signer;
};
