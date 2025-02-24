



// // import { useState, useEffect } from "react";

// // const CreateUser = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [contactNumber, setContactNumber] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [workStatus, setWorkStatus] = useState("Active");
// //   const [role, setRole] = useState("User");
// //   const [message, setMessage] = useState("");
// //   const [users, setUsers] = useState([]);
// //   const [showModal, setShowModal] = useState(false);

// //   const token = localStorage.getItem("adminToken");

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const fetchUsers = async () => {
// //     try {
// //       const res = await fetch("http://localhost:5000/admin/users", {
// //         method: "GET",
// //         headers: { "Content-Type": "application/json", adminToken: token },
// //       });
// //       const data = await res.json();

// //       if (res.ok) {
// //         setUsers(Array.isArray(data.users) ? data.users : []);
// //       } else {
// //         setMessage("Failed to fetch users.");
// //         setUsers([]);
// //       }
// //     } catch (err) {
// //       console.error("Fetch error:", err);
// //       setMessage("Server error while fetching users.");
// //       setUsers([]);
// //     }
// //   };

// //   const isValidPassword = (password) => {
// //     const passwordRegex =
// //       /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// //     return passwordRegex.test(password);
// //   };

// //   // const handleCreateUser = async (e) => {
// //   //   e.preventDefault();
// //   //   if (!isValidPassword(password)) {
// //   //     setMessage(
// //   //       "Password must have at least 8 characters, one uppercase letter, one number, and one special character."
// //   //     );
// //   //     return;
// //   //   }

// //   //   const newUser = {
// //   //     username,
// //   //     email,
// //   //     password,
// //   //     contactNumber,
// //   //     workStatus,
// //   //     role,
// //   //   };

// //   //   try {
// //   //     const response = await fetch("http://localhost:5000/admin/create-user", {
// //   //       method: "POST",
// //   //       headers: { "Content-Type": "application/json", adminToken: token },
// //   //       body: JSON.stringify(newUser),
// //   //     });

// //   //     const result = await response.json();
// //   //     if (!response.ok)
// //   //       throw new Error(result.message || "Failed to create user");

// //   //     setMessage("User created successfully!");
// //   //     fetchUsers();
// //   //     setUsername("");
// //   //     setPassword("");
// //   //     setContactNumber("");
// //   //     setEmail("");
// //   //     setRole("User");
// //   //     setWorkStatus("Active");
// //   //   } catch (error) {
// //   //     console.error("Error creating user:", error);
// //   //     setMessage(error.message);
// //   //   }
// //   // };



// //   const handleCreateUser = async (e) => {
// //     e.preventDefault();
// //     if (!isValidPassword(password)) {
// //       setMessage(
// //         "Password must have at least 8 characters, one uppercase letter, one number, and one special character."
// //       );
// //       return;
// //     }

// //     const newUser = {
// //       username,
// //       email,
// //       password,
// //       contactNumber,
// //       workStatus,
// //       role,
// //     };

// //     try {
// //       const response = await fetch("http://localhost:5000/admin/create-user", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json", adminToken: token },
// //         body: JSON.stringify(newUser),
// //       });

// //       const result = await response.json();

// //       if (!response.ok) {
// //         console.error("Server Error:", result); // Log specific error from the backend
// //         throw new Error(result.message || "Failed to create user");
// //       }

// //       setMessage("User created successfully!");
// //       fetchUsers();
// //       setUsername("");
// //       setPassword("");
// //       setContactNumber("");
// //       setEmail("");
// //       setRole("User");
// //       setWorkStatus("Active");
// //     } catch (error) {
// //       console.error("Error creating user:", error);
// //       setMessage(error.message || "An error occurred");
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-6">
// //       <button
// //         onClick={() => setShowModal(true)}
// //         className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
// //       >
// //         + Create User
// //       </button>

// //       {/* Modal */}
// //       {showModal && (
// //         <div className="modal-overlay fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
// //           <div className="modal-content bg-white p-6 rounded-lg w-1/3">
// //             <h3 className="text-xl font-bold mb-4">Create User</h3>
// //             <form onSubmit={handleCreateUser} className="space-y-4">
// //               <label className="block">
// //                 Username
// //                 <input
// //                   type="text"
// //                   value={username}
// //                   onChange={(e) => setUsername(e.target.value)}
// //                   className="w-full border p-2 mt-2"
// //                   required
// //                 />
// //               </label>
// //               <label className="block">
// //                 Password
// //                 <input
// //                   type="password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   className="w-full border p-2 mt-2"
// //                   required
// //                 />
// //               </label>
// //               <label className="block">
// //                 Contact Number
// //                 <input
// //                   type="text"
// //                   value={contactNumber}
// //                   onChange={(e) => setContactNumber(e.target.value)}
// //                   className="w-full border p-2 mt-2"
// //                   required
// //                 />
// //               </label>
// //               <label className="block">
// //                 Email
// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   className="w-full border p-2 mt-2"
// //                   required
// //                 />
// //               </label>
// //               <label className="block">
// //                 Role
// //                 <select
// //                   value={role}
// //                   onChange={(e) => setRole(e.target.value)}
// //                   className="w-full border p-2 mt-2"
// //                 >
// //                   <option value="User">User</option>
// //                   <option value="Admin">Admin</option>
// //                 </select>
// //               </label>
// //               <label className="block">
// //                 Work Status
// //                 <select
// //                   value={workStatus}
// //                   onChange={(e) => setWorkStatus(e.target.value)}
// //                   className="w-full border p-2 mt-2"
// //                 >
// //                   <option value="active">Active</option>
// //                   <option value="inactive">Inactive</option>
// //                 </select>
// //               </label>
// //               <div className="flex justify-end space-x-4 mt-4">
// //                 <button
// //                   type="submit"
// //                   className="bg-blue-500 text-white py-2 px-4 rounded-md"
// //                 >
// //                   Create User
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowModal(false)}
// //                   className="bg-gray-500 text-white py-2 px-4 rounded-md"
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Users Table */}
// //       <h3 className="text-xl font-bold mt-8">Users List</h3>
// //       <table className="table-auto w-full mt-4 border-collapse border">
// //         <thead>
// //           <tr>
// //             <th className="border p-2">Username</th>
// //             <th className="border p-2">Email</th>
// //             <th className="border p-2">Contact</th>
// //             <th className="border p-2">Role</th>
// //             <th className="border p-2">Work Status</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map((user) => (
// //             <tr key={user._id}>
// //               <td className="border p-2">{user.username}</td>
// //               <td className="border p-2">{user.email}</td>
// //               <td className="border p-2">{user.contactNumber}</td>
// //               <td className="border p-2">{user.role}</td>
// //               <td className="border p-2">{user.workStatus}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {message && <div className="mt-4 text-red-500">{message}</div>}
// //     </div>
// //   );
// // };

// // export default CreateUser;





// import { useState, useEffect } from "react";

// const CreateUser = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [workStatus, setWorkStatus] = useState("Active");
//   const [role, setRole] = useState("User");
//   const [message, setMessage] = useState("");
//   const [users, setUsers] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const token = localStorage.getItem("adminToken");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/admin/users", {
//         method: "GET",
//         headers: { "Content-Type": "application/json", adminToken: token },
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setUsers(Array.isArray(data.users) ? data.users : []);
//       } else {
//         setMessage("Failed to fetch users.");
//         setUsers([]);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setMessage("Server error while fetching users.");
//       setUsers([]);
//     }
//   };

//   const isValidPassword = (password) => {
//     const passwordRegex =
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     if (!isValidPassword(password)) {
//       setMessage(
//         "Password must have at least 8 characters, one uppercase letter, one number, and one special character."
//       );
//       return;
//     }

//     const newUser = {
//       username,
//       email,
//       password,
//       contactNumber,
//       workStatus,
//       role,
//     };

//     try {


//       const token = localStorage.getItem("adminToken");
//       const response = await fetch("http://localhost:5000/admin/create-user", {
//         method: "POST",
//         // headers: { "Content-Type": "application/json", adminToken: token },

//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(newUser),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         console.error("Server Error:", result); // Log specific error from the backend
//         throw new Error(result.message || "Failed to create user");
//       }

//       setMessage("User created successfully!");
//       fetchUsers();
//       setUsername("");
//       setPassword("");
//       setContactNumber("");
//       setEmail("");
//       setRole("User");
//       setWorkStatus("Active");
//     } catch (error) {
//       console.error("Error creating user:", error);
//       setMessage(error.message || "An error occurred");
//     }
//   };

//   return (
//     <div className="container my-5">
//       <button
//         onClick={() => setShowModal(true)}
//         className="btn btn-primary mb-4"
//       >
//         + Create User
//       </button>

//       {/* Modal */}
//       {showModal && (
//         <div
//           className="modal fade show"
//           style={{ display: "block" }}
//           tabIndex="-1"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Create User</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <form onSubmit={handleCreateUser}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label htmlFor="username" className="form-label">
//                       Username
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="password" className="form-label">
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="contactNumber" className="form-label">
//                       Contact Number
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="contactNumber"
//                       value={contactNumber}
//                       onChange={(e) => setContactNumber(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="role" className="form-label">
//                       Role
//                     </label>
//                     <select
//                       className="form-select"
//                       id="role"
//                       value={role}
//                       onChange={(e) => setRole(e.target.value)}
//                     >
//                       <option value="User">User</option>
//                       <option value="Admin">Admin</option>
//                     </select>
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="workStatus" className="form-label">
//                       Work Status
//                     </label>
//                     <select
//                       className="form-select"
//                       id="workStatus"
//                       value={workStatus}
//                       onChange={(e) => setWorkStatus(e.target.value)}
//                     >
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="submit" className="btn btn-primary">
//                     Create User
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Users Table */}
//       <h3 className="mt-4">Users List</h3>
//       <table className="table table-bordered mt-4">
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Contact</th>
//             <th>Role</th>
//             <th>Work Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//               <td>{user.contactNumber}</td>
//               <td>{user.role}</td>
//               <td>{user.workStatus}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {message && <div className="alert alert-danger mt-4">{message}</div>}
//     </div>
//   );
// };

// export default CreateUser;




// CreateUser.js
import React, { useState } from "react";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");
  const [role, setRole] = useState("user");

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    const newUser = { username, password, contact, email, status, role };

    try {
      const response = await fetch("http://localhost:5000/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          adminToken: token, // Send token in header
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log("User created successfully", data);
      } else {
        console.error("Error creating user:", data.message);
      }
    } catch (err) {
      console.error("Error creating user:", err.message);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser}>
        <label>Username: </label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label>Contact Number: </label>
        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
        <br />
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Status: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <br />
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="leader">Leader</option>
        </select>
        <br />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
