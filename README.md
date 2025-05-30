# Deciphers Blockchain

A decentralized identity management system developed for COHERENCE-25 Hackathon. This project leverages blockchain technology to provide secure, user-controlled digital identity solutions.

## 🚀 Project Overview

**Deciphers Blockchain** addresses the growing need for secure and decentralized identity verification. It eliminates reliance on centralized authorities by using smart contracts and Ethereum blockchain, ensuring transparency, privacy, and user control over personal data.

## 🧩 Features

- ✅ **Decentralized Identity Management (DID)**
- 🔐 **Smart Contract-based Verification**
- 🌐 **User Interface with Next.js & Tailwind CSS**
- ⚙️ **Integration with Ethereum via Ethers.js**
- 📄 **Secure Document Storage (IPFS Optional)**
- 📊 **Audit Trails for Identity Access**

## 🛠 Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Smart Contracts**: Solidity (0.8.x), Hardhat
- **Blockchain**: Ethereum (tested on Polygon Amoy or Sepolia testnet)
- **Web3 Integration**: Ethers.js
- **Backend (Optional)**: Node.js, Express.js


## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ShaileshAgrawal07/COHERENCE-25_Deciphers_Blockchain.git
cd COHERENCE-25_Deciphers_Blockchain
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Compile Smart Contracts

```bash
npx hardhat compile
```

### 4. Deploy Contracts (Local Network)

```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### 5.  Start the Frontend

```bash
npm run dev
```

### 6. Open http://localhost:3000 to view the app in your browser.
