import { BrowserProvider } from "ethers";

export const connectWallet = async (skipPermissionRequest = false) => {
  try {
    if (!window.ethereum) {
      alert("Please install Metamask!");
      return null;
    }

    const provider = new BrowserProvider(window.ethereum);
    
    // Only request permissions if explicitly needed
    if (!skipPermissionRequest) {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const signer = await provider.getSigner();
    return {
      signer,
      address: accounts[0],
    };
  } catch (error) {
    console.error("Wallet connection error:", error);
    return null;
  }
};