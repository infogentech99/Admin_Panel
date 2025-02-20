// import { useState } from "react";

// const CreateUser = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const token = localStorage.getItem("adminToken"); // ✅ Ensure token is stored

//   // ✅ Password Validation Function
//   const isValidPassword = (password) => {
//     const passwordRegex =
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!username.trim() || !password.trim()) {
//       setMessage("Username and password are required.");
//       return;
//     }

//     if (!isValidPassword(password)) {
//       setMessage(
//         "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
//       );
//       return;
//     }

//     if (!token) {
//       setMessage("Authentication failed. Please log in again.");
//       return;
//     }

//     try {
//       const res = await fetch(
//         "https://loginapi-orya.onrender.com/admin/create-user",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             adminToken: token, // ✅ Fix: Send token as "adminToken"
//           },
//           body: JSON.stringify({ username, password }),
//         }
//       );

//       const data = await res.json();

//       if (res.status === 401) {
//         setMessage("Unauthorized. Please log in again.");
//         return;
//       }

//       if (res.ok) {
//         setMessage(data.message || "User created successfully.");
//         setUsername(""); // Clear input fields after successful creation
//         setPassword("");
//       } else {
//         setMessage(data.message || "Failed to create user.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setMessage("Server Error. Try again later.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
//       <h2>Create User</h2>
//       <form
//         onSubmit={handleCreateUser}
//         style={{ display: "flex", flexDirection: "column" }}
//       >
//         <input
//           type="text"
//           placeholder="New Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={{ marginBottom: "10px", padding: "8px" }}
//           required
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ marginBottom: "10px", padding: "8px" }}
//           required
//         />
//         <button
//           type="submit"
//           style={{
//             padding: "10px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Create User
//         </button>
//       </form>
//       {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
//     </div>
//   );
// };

// export default CreateUser;






import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("adminToken"); // ✅ Ensure token is stored

  const navigate = useNavigate(); // ✅ Hook for navigation

  // ✅ Password Validation Function
  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!username.trim() || !password.trim()) {
      setMessage("Username and password are required.");
      return;
    }

    if (!isValidPassword(password)) {
      setMessage(
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
      );
      return;
    }

    if (!token) {
      setMessage("Authentication failed. Please log in again.");
      return;
    }

    try {
      const res = await fetch(
        "https://loginapi-orya.onrender.com/admin/create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            adminToken: token, // ✅ Fix: Send token as "adminToken"
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        setMessage("Unauthorized. Please log in again.");
        return;
      }

      if (res.ok) {
        setMessage(data.message || "User created successfully.");
        setUsername(""); // Clear input fields after successful creation
        setPassword("");
      } else {
        setMessage(data.message || "Failed to create user.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Server Error. Try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Create User</h2>
      <form
        onSubmit={handleCreateUser}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px" }}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px" }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          Create User
        </button>
      </form>
      <button
        onClick={() => navigate("/user/admin")}
        style={{
          padding: "10px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Go to Admin Users
      </button>
      {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default CreateUser;
