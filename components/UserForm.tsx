import { useState } from "react";

const UserForm = () => {
  // Create state variables for each input field
  const [name, setName] = useState("");
  const [address, setAddress] = useState(""); // new state for address
  const [aadhar, setAadhar] = useState("");
  const [dob, setDob] = useState("");
  const [mob, setMob] = useState("");

  // This function will handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a user data object
    const userData = { name, address, aadhar, dob, mob }; // address added

    // Convert the user data to JSON and save it to localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    // (Optional) Clear the form fields or show a success message
    alert("User data saved!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
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
      </div>

      {/* New Address Field */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="aadhar">
          Aadhar No.
        </label>
        <input
          id="aadhar"
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

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
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="mob">
          Mobile No.
        </label>
        <input
          id="mob"
          type="tel"
          value={mob}
          onChange={(e) => setMob(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default UserForm;


// import { useState } from "react";

// const UserForm = () => {
//   // Create state variables for each input field
//   const [name, setName] = useState("");
//   const [aadhar, setAadhar] = useState("");
//   const [dob, setDob] = useState("");
//   const [mob, setMob] = useState("");

//   // This function will handle the form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Create a user data object
//     const userData = { name, aadhar, dob, mob };

//     // Convert the user data to JSON and save it to localStorage
//     localStorage.setItem("userData", JSON.stringify(userData));

//     // (Optional) Clear the form fields or show a success message
//     alert("User data saved!");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
//       <div>
//       <label className="block text-sm font-medium mb-1" htmlFor="name">
//         Name
//       </label>
//       <input
//         id="name"
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-medium mb-1" htmlFor="aadhar">
//         Aadhar No.
//       </label>
//       <input
//         id="aadhar"
//         type="text"
//         value={aadhar}
//         onChange={(e) => setAadhar(e.target.value)}
//         className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-medium mb-1" htmlFor="dob">
//         Date of Birth
//       </label>
//       <input
//         id="dob"
//         type="date"
//         value={dob}
//         onChange={(e) => setDob(e.target.value)}
//         className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-medium mb-1" htmlFor="mob">
//         Mobile No.
//       </label>
//       <input
//         id="mob"
//         type="tel"
//         value={mob}
//         onChange={(e) => setMob(e.target.value)}
//         className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       />
//     </div>

//     <button
//       type="submit"
//       className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//     >
//       Submit
//     </button>
//     </form>
//   );
// };

// export default UserForm;
