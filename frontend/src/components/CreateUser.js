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
