import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaderDashboard = () => {
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://admin-panel-ejmu.onrender.com/leader/assigned-users", { headers: { Authorization: token } });

                setAssignedUsers(response.data.assignedUsers);
            } catch (error) {
                console.error("Error fetching assigned users:", error);
                alert("Failed to fetch assigned users.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">My Assigned Users</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : assignedUsers.length === 0 ? (
                <p className="text-center">No users assigned to you.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.contact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LeaderDashboard;
