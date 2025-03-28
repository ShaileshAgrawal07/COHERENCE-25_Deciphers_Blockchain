// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract DecentralizedIdentity is AccessControl {
    using ECDSA for bytes32;
    
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    
    struct Credential {
        uint256 id;
        string issuer;
        string dataHash; // IPFS CID
        uint256 expirationTimestamp;
        bool isRevoked;
        bytes issuerSignature;
    }

    mapping(address => string) public DIDs;
    mapping(address => Credential[]) private credentials;
    mapping(address => mapping(address => bool)) public accessPermissions;

    event CredentialIssued(address indexed user, uint256 credentialId, string issuer, string dataHash);
    event CredentialRevoked(address indexed user, uint256 credentialId);
    event UserRegistered(address indexed user, string did);
    event AccessGranted(address indexed user, address verifier);
    event AccessRevoked(address indexed user, address verifier);
    event ProofVerified(address indexed user, bool result);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createDID() external {
        require(bytes(DIDs[msg.sender]).length == 0, "DID already exists");
        DIDs[msg.sender] = string(abi.encodePacked("did:eth:", toAsciiString(msg.sender)));
        _grantRole(USER_ROLE, msg.sender);
        emit UserRegistered(msg.sender, DIDs[msg.sender]);
    }

    function issueCredential(
        address user, 
        string memory issuer, 
        string memory dataHash, 
        uint256 expirationTimestamp,
        bytes memory issuerSignature
    ) public onlyRole(ISSUER_ROLE) {
        uint256 credentialId = credentials[user].length + 1;
        credentials[user].push(Credential(credentialId, issuer, dataHash, expirationTimestamp, false, issuerSignature));
        emit CredentialIssued(user, credentialId, issuer, dataHash);
    }

    function revokeCredential(address user, uint256 credentialId) public onlyRole(ISSUER_ROLE) {
        for (uint256 i = 0; i < credentials[user].length; i++) {
            if (credentials[user][i].id == credentialId) {
                credentials[user][i].isRevoked = true;
                emit CredentialRevoked(user, credentialId);
                break;
            }
        }
    }

    function grantAccess(address verifier) external onlyRole(USER_ROLE) {
        accessPermissions[msg.sender][verifier] = true;
        emit AccessGranted(msg.sender, verifier);
    }

    function revokeAccess(address verifier) external onlyRole(USER_ROLE) {
        accessPermissions[msg.sender][verifier] = false;
        emit AccessRevoked(msg.sender, verifier);
    }

    function getCredentials(address user) public view returns (Credential[] memory) {
        require(accessPermissions[user][msg.sender], "No access granted");
        return credentials[user];
    }

    function verifyProof(bytes memory proof, uint256[] memory publicInputs) public returns (bool) {
        // Placeholder for real Groth16/Plonk verification logic
        bool result = (publicInputs[0] >= 18); // Example: Age proof verification
        emit ProofVerified(msg.sender, result);
        return result;
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8*(19 - i)))));
            s[2*i] = char(uint8(b) / 16);
            s[2*i+1] = char(uint8(b) % 16);
        }
        return string(s);
    }

    function char(uint8 b) internal pure returns (bytes1) {
        if (b < 10) return bytes1(b + 48);
        else return bytes1(b + 87);
    }
}