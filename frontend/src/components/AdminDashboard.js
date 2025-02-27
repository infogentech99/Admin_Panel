

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
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  //const [visiblePasswords, setVisiblePasswords] = useState({});
  const [isAssignLeaderOpen, setAssignLeaderOpen] = useState(false);
  const [selectedLeaderAssign, setSelectedLeaderAssign] = useState("");
  const [selectedUsersAssign, setSelectedUsersAssign] = useState([]);

  //const [showPassword, setShowPassword] = useState({});
  // Track which leader row is expanded
  const [expandedLeader, setExpandedLeader] = useState(null);

  // Pagination states (for leaders only)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 leaders per page

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://admin-panel-ejmu.onrender.com/admin/get-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // const handleEditChange = (e) => {
  //   setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  // };



  const handleEditChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      const response = await fetch("https://admin-panel-ejmu.onrender.com/admin/create-user", {
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
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`https://admin-panel-ejmu.onrender.com/admin/delete-user/${userId}`, {
        method: "DELETE",
      });
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
      const response = await fetch(`https://admin-panel-ejmu.onrender.com/admin/update-user/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });
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


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data Sent:", loginData); // Debugging

    try {
        const response = await fetch("https://admin-panel-ejmu.onrender.com/admin/user-leader-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();
        console.log("Response Status:", response.status);
        console.log("Response Data:", data);

        if (response.ok) {
            alert("Login successful!");
            setLoginOpen(false);
        } else {
            alert(data.message || "Invalid credentials or not authorized.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Error during login.");
    }
};



// const togglePasswordVisibility = (userId) => {
//   setShowPassword((prevState) => ({
//     ...prevState,
//     [userId]: !prevState[userId],
//   }));
// };

  
  const handleAssignLeaderSubmit = async (e) => {
    e.preventDefault();
    if (selectedUsersAssign.length === 0) {
      alert("Please select at least one user.");
      return;
    }
    try {
      const response = await fetch("https://admin-panel-ejmu.onrender.com/admin/assign-leader", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leaderId: selectedLeaderAssign,
          userIds: selectedUsersAssign,
        }),
      });
      if (response.ok) {
        alert("Users assigned successfully!");
        setAssignLeaderOpen(false);
        fetchUsers();
      } else {
        alert("Error assigning users.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  
  const toggleExpandedLeader = (leaderId) => {
    setExpandedLeader(expandedLeader === leaderId ? null : leaderId);
  };

  // Filter leaders for main table and apply pagination on leaders
  const leaderList = users.filter((user) => user.role === "leader");
  const indexOfLastLeader = currentPage * itemsPerPage;
  const indexOfFirstLeader = indexOfLastLeader - itemsPerPage;
  const currentLeaders = leaderList.slice(indexOfFirstLeader, indexOfLastLeader);
  const totalPages = Math.ceil(leaderList.length / itemsPerPage);

  return (
    <div className="container py-4">
      <h2 className="text-center text-primary mb-4">Admin Dashboard</h2>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-success" onClick={() => setCreateUserOpen(true)}>
          Create User
        </button>
        <button className="btn btn-primary" onClick={() => setLoginOpen(true)}>
          User/Leader Login
        </button>
        <button className="btn btn-warning" onClick={() => setAssignLeaderOpen(true)}>
          Assign Users to Leader
        </button>
      </div>

      {/* Create User Modal */}
      {isCreateUserOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3" style={{ position: "relative" }}>
              <span className="close" onClick={() => setCreateUserOpen(false)}>&times;</span>
              <h3 className="text-center">Create User</h3>
              <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} required />
                <div style={{ position: "relative" }}>
                  <input className="form-control mb-2" type={showCreatePassword ? "text" : "password"} name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
                  <span onClick={() => setShowCreatePassword(!showCreatePassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>
                    {showCreatePassword ? "🙈" : "👁️"}
                  </span>
                </div>
                <input className="form-control mb-2" type="text" name="contact" placeholder="Contact" value={userData.contact} onChange={handleChange} required />
                <input className="form-control mb-2" type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} required />
                <select className="form-select mb-2" name="status" value={userData.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select className="form-select mb-2" name="role" value={userData.role} onChange={handleChange}>
                  <option value="user">User</option>
                  <option value="leader">Leader</option>
                </select>
                <button className="btn btn-primary w-100" type="submit">Create Account</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3" style={{ position: "relative" }}>
              <span className="close" onClick={() => setLoginOpen(false)}>&times;</span>
              <h3 className="text-center">User/Leader Login</h3>
              <form onSubmit={handleLoginSubmit}>
                <input className="form-control mb-2" type="text" name="username" placeholder="Username" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} required />
                <div style={{ position: "relative" }}>
                  <input className="form-control mb-2" type={showLoginPassword ? "text" : "password"} name="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
                  <span onClick={() => setShowLoginPassword(!showLoginPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>
                    {showLoginPassword ? "🙈" : "👁️"}
                  </span>
                </div>
                <button className="btn btn-primary w-100" type="submit">Login</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Assign Leader Modal */}
      {isAssignLeaderOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <span className="close" onClick={() => setAssignLeaderOpen(false)}>&times;</span>
              <h3 className="text-center">Assign Users to Leader</h3>
              <form onSubmit={handleAssignLeaderSubmit}>
                <div className="mb-3">
                  <label className="form-label">Select Leader:</label>
                  <select className="form-select" value={selectedLeaderAssign} onChange={(e) => setSelectedLeaderAssign(e.target.value)} required>
                    <option value="">-- Select Leader --</option>
                    {users.filter((user) => user.role === "leader").map((leader) => (
                      <option key={leader._id} value={leader._id}>{leader.username}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Up to 10 Users:</label>
                  {users.filter((user) => user.role === "user" && !user.leaderId).map((user) => (
                    <div key={user._id} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`assign-${user._id}`}
                        checked={selectedUsersAssign.includes(user._id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            if (selectedUsersAssign.length < 10) {
                              setSelectedUsersAssign((prev) => [...prev, user._id]);
                            } else {
                              alert("You can only select up to 10 users.");
                            }
                          } else {
                            setSelectedUsersAssign((prev) => prev.filter((id) => id !== user._id));
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor={`assign-${user._id}`}>{user.username}</label>
                    </div>
                  ))}
                </div>
                <button type="submit" className="btn btn-warning w-100">Assign</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {/* {isEditUserOpen && editingUser && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <span className="close" onClick={() => setEditUserOpen(false)}>&times;</span>
              <h3 className="text-center">Edit User</h3>
              <form onSubmit={handleEditSubmit}>
                <input className="form-control mb-2" type="text" name="username" value={editingUser.username} onChange={handleEditChange} required />
                <input className="form-control mb-2" type="text" name="contact" value={editingUser.contact} onChange={handleEditChange} required />
                <input className="form-control mb-2" type="email" name="email" value={editingUser.email} onChange={handleEditChange} required />
                <select className="form-select mb-2" name="status" value={editingUser.status} onChange={handleEditChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select className="form-select mb-2" name="role" value={editingUser.role} onChange={handleEditChange}>
                  <option value="user">User</option>
                  <option value="leader">Leader</option>
                </select>
                <button className="btn btn-primary w-100" type="submit">Update User</button>
              </form>
            </div>
          </div>
        </div>
      )} */}

{/* Edit User Modal */}
{isEditUserOpen && editingUser && (
  <div className="modal show d-block">
    <div className="modal-dialog">
      <div className="modal-content p-3">
        <span className="close" onClick={() => setEditUserOpen(false)}>&times;</span>
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
            disabled
          />
          <input
            className="form-control mb-2"
            type="email"
            name="email"
            value={editingUser.email}
            disabled
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

          {/* Password Field with Toggle */}
          <div style={{ position: "relative" }}>
            <input
              className="form-control mb-2"
              type={showCreatePassword ? "text" : "password"}  // Toggle between text and password
              name="password"
              placeholder="New Password"
              value={editingUser.password}
              onChange={handleEditChange}
            />
            <span
              onClick={() => setShowCreatePassword(!showCreatePassword)}  // Toggle the password visibility
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showCreatePassword ? "🙈" : "👁️"}  {/* Change the icon based on visibility */}
            </span>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Update User
          </button>
        </form>
      </div>
    </div>
  </div>
)}


      {/* Main Table: Only Leaders are displayed */}
      <h3 className="text-center mt-4">Leaders List</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Contact</th>
              {/* <th>Password</th> */}
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLeaders.map((leader) => {
              const assignedUsers = users.filter(
                (u) => u.leaderId === leader._id && u.role === "user"
              );
              return (
                <React.Fragment key={leader._id}>
                  <tr
                    onClick={() => toggleExpandedLeader(leader._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      {leader.username} {assignedUsers.length > 0 && "🔽"}
                    </td>
                    <td>{leader.email}</td>
                    <td>{leader.contact}</td>


{/* 
<td>
                  {showPassword[leader._id] ? leader.password : "******"}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePasswordVisibility(leader._id, leader.password);
                    }}
                    style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                  >
                    {showPassword[leader._id] ? "🙈" : "👁️"}
                  </span>
                </td> */}



                  

                    <td>{leader.role}</td>
                    <td>{leader.status}</td>
                    <td>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingUser(leader);
                          setEditUserOpen(true);
                        }}
                        style={{ cursor: "pointer", marginRight: "0.5rem" }}
                      >
                        ✏️
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(leader._id);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        🗑️
                      </span>
                    </td>
                  </tr>
                  {expandedLeader === leader._id && assignedUsers.length > 0 && (
                    <tr>
                      <td colSpan="7">
                        <div>
                          <h5 className="text-secondary">Assigned Users</h5>
                          <div className="table-responsive">
                            <table className="table table-sm table-bordered">
                              <thead>
                                <tr>
                                  <th>Username</th>
                                  <th>Email</th>
                                  <th>Contact</th>
                                  {/* <th>Password</th> */}
                                  <th>Status</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assignedUsers.map((assignedUser) => (
                                  <tr key={assignedUser._id}>
                                    <td>{assignedUser.username}</td>
                                    <td>{assignedUser.email}</td>
                                    <td>{assignedUser.contact}</td>
                               
{/* 

<td>
                  {showPassword[assignedUser._id] ? assignedUser.password : "******"}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePasswordVisibility(assignedUser._id, assignedUser.password);
                    }}
                    style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                  >
                    {showPassword[assignedUser._id] ? "🙈" : "👁️"}
                  </span>
                </td> */}



                                    <td>{assignedUser.status}</td>
                                    <td>
                                      <span
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingUser(assignedUser);
                                          setEditUserOpen(true);
                                        }}
                                        style={{ cursor: "pointer", marginRight: "0.5rem" }}
                                      >
                                        ✏️
                                      </span>
                                      <span
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDelete(assignedUser._id);
                                        }}
                                        style={{ cursor: "pointer" }}
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
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls for Leaders */}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
