
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       // Corrected fetch request to match backend's GET method with URL parameters
//       const res = await fetch(
//         `http://localhost:5000/admin/login/${username}/${password}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       const data = await res.json();
//       console.log("Response Data:", data);

//       if (res.ok) {
//         localStorage.setItem("adminToken", data.token);
//         navigate("/admin/dashboard");
//       } else {
//         setError(data.message || "Login failed. Try again.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Server Error. Try again later.");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default AdminLogin;







import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `http://localhost:5000/admin/login/${username}/${password}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      console.log("Response Data:", data);

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Server Error. Try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "350px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Admin Login</h2>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </form>
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default AdminLogin;
