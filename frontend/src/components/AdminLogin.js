


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Hardcoded credentials
//   const hardcodedUsername = "admin";
//   const hardcodedPassword = "admin123";

//   const handleAdminLogin = (e) => {
//     e.preventDefault();
//     setError("");

//     // Check against hardcoded credentials
//     if (username === hardcodedUsername && password === hardcodedPassword) {
//       localStorage.setItem("adminToken", "hardcodedToken");
//       alert("Login Successful!");
//       navigate("/admin-dashboard");
//     } else {
//       setError("Invalid username or password.");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleAdminLogin}>
//         <label>Username: </label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <br />
//         <label>Password: </label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded credentials
  const hardcodedUsername = "admin";
  const hardcodedPassword = "admin123";

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError("");

    if (username === hardcodedUsername && password === hardcodedPassword) {
      localStorage.setItem("adminToken", "hardcodedToken");
      alert("Login Successful!");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleAdminLogin}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
