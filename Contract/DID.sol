// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DecentralizedIdentity is AccessControl {
    using MessageHashUtils for bytes32;

    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    struct Credential {
        uint256 id;
        string issuer;
        string dataHash; // IPFS CID or hash of JSON data
        uint256 issuanceTimestamp;
        uint256 expirationTimestamp;
        bool isRevoked;
        bytes issuerSignature;
    }

    mapping(address => string) public DIDs;
    mapping(address => Credential[]) private credentials;
    mapping(address => mapping(uint256 => uint256)) private credentialIndex; // user => credentialId => index
    mapping(address => mapping(address => bool)) public accessPermissions;

    event CredentialIssued(address indexed user, uint256 credentialId, string issuer, string dataHash);
    event CredentialRevoked(address indexed user, uint256 credentialId);
    event UserRegistered(address indexed user, string did);
    event AccessGranted(address indexed user, address verifier);
    event AccessRevoked(address indexed user, address verifier);
    event CredentialVerified(address indexed verifier, address indexed user, uint256 credentialId, bool result);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createDID() external {
        require(bytes(DIDs[msg.sender]).length == 0, "DID already exists");
        DIDs[msg.sender] = string(abi.encodePacked("did:eth:", Strings.toHexString(msg.sender)));
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
        credentials[user].push(Credential({
            id: credentialId,
            issuer: issuer,
            dataHash: dataHash,
            issuanceTimestamp: block.timestamp,
            expirationTimestamp: expirationTimestamp,
            isRevoked: false,
            issuerSignature: issuerSignature
        }));
        credentialIndex[user][credentialId] = credentials[user].length - 1;
        emit CredentialIssued(user, credentialId, issuer, dataHash);
    }

    function revokeCredential(address user, uint256 credentialId) public onlyRole(ISSUER_ROLE) {
        uint256 index = credentialIndex[user][credentialId];
        credentials[user][index].isRevoked = true;
        emit CredentialRevoked(user, credentialId);
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

    function getCredentialCount(address user) public view returns (uint256) {
        return credentials[user].length;
    }

    function verifyCredentialSignature(
        address issuer,
        string memory dataHash,
        bytes memory signature
    ) public pure returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(issuer, dataHash));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address recovered = ECDSA.recover(ethSignedMessageHash, signature);
        return recovered == issuer;
    }

    function verifyCredential(address user, uint256 credentialId) public returns (bool) {
        require(accessPermissions[user][msg.sender], "Access not granted");
        uint256 index = credentialIndex[user][credentialId];
        Credential memory cred = credentials[user][index];
        
        bool signatureValid = verifyCredentialSignature(user, cred.dataHash, cred.issuerSignature);
        bool valid = signatureValid && !cred.isRevoked && cred.expirationTimestamp >= block.timestamp;
        
        emit CredentialVerified(msg.sender, user, credentialId, valid);
        return valid;
    }

    function cleanExpiredCredentials() external {
        for (uint256 i = 0; i < credentials[msg.sender].length; i++) {
            if (credentials[msg.sender][i].expirationTimestamp < block.timestamp) {
                credentials[msg.sender][i].isRevoked = true;
            }
        }
    }
}
