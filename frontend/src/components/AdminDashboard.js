

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "tailwindcss/tailwind.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    contact: "",
    email: "",
    status: "active",
    role: "user",
  });

  const [editingUser, setEditingUser] = useState(null);
  const [isCreateUserOpen, setCreateUserOpen] = useState(false);
  const [isEditUserOpen, setEditUserOpen] = useState(false);

  // New state for login modal and credentials
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // New states for password visibility toggles in modals
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // New state for password visibility per table row (using user._id as key)
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/get-users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Password Validation: Ensure at least 6 characters.
    if (userData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert("User created successfully!");
        fetchUsers();
        setCreateUserOpen(false);
      } else {
        alert("Error creating user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `http://localhost:5000/admin/delete-user/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("User deleted successfully!");
        fetchUsers();
      } else {
        alert("Error deleting user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/admin/update-user/${editingUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingUser),
        }
      );
      if (response.ok) {
        alert("User updated successfully!");
        fetchUsers();
        setEditUserOpen(false);
      } else {
        alert("Error updating user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // New login submit handler that calls the login API for both user and leader
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/admin/user-leader-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        // Optionally store token or user info here
        setLoginOpen(false);
      } else {
        alert(data.message || "Invalid credentials or not allowed to login.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login.");
    }
  };

  // Toggle password visibility for a given user in the table
  const togglePasswordVisibility = (userId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-primary mb-4">Admin Dashboard</h2>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          className="btn btn-success"
          onClick={() => setCreateUserOpen(true)}
        >
          Create User
        </button>
        <button className="btn btn-primary" onClick={() => setLoginOpen(true)}>
          User/Leader Login
        </button>
      </div>

      {isCreateUserOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3" style={{ position: "relative" }}>
              <span className="close" onClick={() => setCreateUserOpen(false)}>
                &times;
              </span>
              <h3 className="text-center">Create User</h3>
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-2"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                />
                <div style={{ position: "relative" }}>
                  <input
                    className="form-control mb-2"
                    type={showCreatePassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    onClick={() => setShowCreatePassword(!showCreatePassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showCreatePassword ? "🙈" : "👁️"}
                  </span>
                </div>
                <input
                  className="form-control mb-2"
                  type="text"
                  name="contact"
                  placeholder="Contact"
                  value={userData.contact}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-2"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
                <select
                  className="form-select mb-2"
                  name="status"
                  value={userData.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select
                  className="form-select mb-2"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="leader">Leader</option>
                </select>
                <button className="btn btn-primary w-100" type="submit">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {isLoginOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3" style={{ position: "relative" }}>
              <span className="close" onClick={() => setLoginOpen(false)}>
                &times;
              </span>
              <h3 className="text-center">User/Leader Login</h3>
              <form onSubmit={handleLoginSubmit}>
                <input
                  className="form-control mb-2"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData({ ...loginData, username: e.target.value })
                  }
                  required
                />
                <div style={{ position: "relative" }}>
                  <input
                    className="form-control mb-2"
                    type={showLoginPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                  <span
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showLoginPassword ? "🙈" : "👁️"}
                  </span>
                </div>
                <button className="btn btn-primary w-100" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {isEditUserOpen && editingUser && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <span className="close" onClick={() => setEditUserOpen(false)}>
                &times;
              </span>
              <h3 className="text-center">Edit User</h3>
              <form onSubmit={handleEditSubmit}>
                <input
                  className="form-control mb-2"
                  type="text"
                  name="username"
                  value={editingUser.username}
                  onChange={handleEditChange}
                  required
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  name="contact"
                  value={editingUser.contact}
                  onChange={handleEditChange}
                  required
                />
                <input
                  className="form-control mb-2"
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditChange}
                  required
                />
                <select
                  className="form-select mb-2"
                  name="status"
                  value={editingUser.status}
                  onChange={handleEditChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select
                  className="form-select mb-2"
                  name="role"
                  value={editingUser.role}
                  onChange={handleEditChange}
                >
                  <option value="user">User</option>
                  <option value="leader">Leader</option>
                </select>
                <button className="btn btn-primary w-100" type="submit">
                  Update User
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-center mt-4">Users List</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Password</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>
                  {visiblePasswords[user._id] ? user.password : "******"}
                  <span
                    onClick={() => togglePasswordVisibility(user._id)}
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {visiblePasswords[user._id] ? "🙈" : "👁️"}
                  </span>
                </td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <span
                    style={{ cursor: "pointer", marginRight: "0.5rem" }}
                    onClick={() => {
                      setEditingUser(user);
                      setEditUserOpen(true);
                    }}
                  >
                    ✏️
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(user._id)}
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
