"use client"
import { useState } from "react";
import { keccak256 } from "js-sha3"; // Import keccak256 from js-sha3

const CredentialForm = () => {
  // State for selected card type
  const [cardType, setCardType] = useState<"aadhaar" | "pan" | "driving">("aadhaar");

  // State for input fields
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // State for hash output
  const [hashOutput, setHashOutput] = useState("");

  // Validation regex patterns
  const namePattern = /^[A-Za-z\s]+$/; // letters and spaces only
  const aadhaarPattern = /^\d{12}$/;
  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const drivingLicencePattern = /^[A-Za-z0-9]{10}$/;
  const mobilePattern = /^\d{10}$/;

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!namePattern.test(name)) {
      newErrors.name = "Name must contain letters and spaces only.";
    }
    if (cardType === "aadhaar" && !aadhaarPattern.test(cardNumber)) {
      newErrors.cardNumber = "Aadhaar number must be exactly 12 digits.";
    }
    if (cardType === "pan" && !panPattern.test(cardNumber)) {
      newErrors.cardNumber = "PAN number must be in the format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F).";
    }
    if (cardType === "driving" && !drivingLicencePattern.test(cardNumber)) {
      newErrors.cardNumber = "Driving licence number must be exactly 10 alphanumeric characters.";
    }
    if (!mobilePattern.test(mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
    }
    if (!dob) {
      newErrors.dob = "Date of birth is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const userData = {
      cardType,
      name,
      cardNumber,
      dob,
      mobile,
    };

    // Convert userData to JSON string
    const userDataJSON = JSON.stringify(userData);

    // Generate keccak-256 hash
    const hash = keccak256(userDataJSON);

    // Store both JSON data and hash in localStorage
    localStorage.setItem("userData", userDataJSON);
    localStorage.setItem("userHash", hash);

    // Update state to display the hash
    setHashOutput(hash);
    alert("User data saved and hash generated!");
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(hashOutput)
      .then(() => alert("Hash copied to clipboard!"))
      .catch(() => alert("Failed to copy hash."));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      {/* Dropdown for selecting credential type */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="cardType">
          Select Credential Type
        </label>
        <select
          id="cardType"
          value={cardType}
          onChange={(e) => {
            setCardType(e.target.value as "aadhaar" | "pan" | "driving");
            setCardNumber(""); // Reset card number when type changes
          }}
          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="aadhaar">Aadhaar Card</option>
          <option value="pan">PAN Card</option>
          <option value="driving">Driving Licence</option>
        </select>
      </div>

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      {/* Card Number Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">
          {cardType === "aadhaar"
            ? "Aadhaar Number"
            : cardType === "pan"
            ? "PAN Number"
            : "Driving Licence Number"}
        </label>
        <input
          id="cardNumber"
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
      </div>

      {/* Date of Birth Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="dob">
          Date of Birth
        </label>
        <input
          id="dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
      </div>

      {/* Mobile Number Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="mobile">
          Mobile Number
        </label>
        <input
          id="mobile"
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Submit
      </button>

      {/* Display Hash Output and Copy Button if available */}
      {hashOutput && (
        <div className="mt-4 p-4 border border-gray-200 rounded">
          <p className="text-sm font-medium">Generated Hash (keccak-256):</p>
          <p className="text-xs break-words">{hashOutput}</p>
          <button
            type="button"
            onClick={handleCopyHash}
            className="mt-2 bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            Copy Code
          </button>
        </div>
      )}
    </form>
  );
};

export default CredentialForm;













// import { useState } from "react";

// const CredentialInput = () => {
//   // State for selected credential type and input value
//   const [credentialType, setCredentialType] = useState("name");
//   const [credentialValue, setCredentialValue] = useState("");

//   // Handle changes to the dropdown
//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setCredentialType(e.target.value);
//   };

//   // Handle changes to the input field
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCredentialValue(e.target.value);
//   };

//   return (
//     <div className="flex items-center space-x-4">
//       <select
//         value={credentialType}
//         onChange={handleSelectChange}
//         className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="name">Name</option>
//         <option value="aadhar">Aadhar No.</option>
//         <option value="dob">Date of Birth</option>
//         <option value="mob">Mobile No.</option>
//         <option value="address">Address</option>
//       </select>
//       <input
//         type="text"
//         placeholder={`Enter ${credentialType}`}
//         value={credentialValue}
//         onChange={handleInputChange}
//         className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// export default CredentialInput;
