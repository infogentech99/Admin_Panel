import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignUsers = () => {
    const [leaders, setLeaders] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedLeader, setSelectedLeader] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false); // New state to manage loading state

    useEffect(() => {
        // Fetch Leaders & Users
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const leaderRes = await axios.get("https://admin-panel-ejmu.onrender.com/admin/get-users?role=leader", { headers: { Authorization: token } });
                const userRes = await axios.get("https://admin-panel-ejmu.onrender.com/admin/get-users?role=user", { headers: { Authorization: token } });

                setLeaders(leaderRes.data.users); // Use 'users' key from response
                setUsers(userRes.data.users);
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to fetch users and leaders.");
            }
        };
        fetchData();
    }, []);

    const handleAssign = async () => {
        if (!selectedLeader) {
            alert("Please select a leader.");
            return;
        }

        if (selectedUsers.length !== 10) {
            alert("Please select exactly 10 users.");
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            await axios.post("https://admin-panel-ejmu.onrender.com/admin/assign-users", 
                { leaderId: selectedLeader, userIds: selectedUsers }, 
                { headers: { Authorization: token } }
            );

            alert("Users assigned successfully!");
            setSelectedUsers([]); // Clear selection after successful assignment
        } catch (error) {
            console.error("Error assigning users:", error);
            alert(error.response?.data?.message || "Error assigning users.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Assign Users to a Leader</h2>

            <div className="mb-3">
                <label className="form-label">Select Leader:</label>
                <select className="form-select" onChange={(e) => setSelectedLeader(e.target.value)}>
                    <option value="">-- Select a Leader --</option>
                    {leaders.map((leader) => (
                        <option key={leader._id} value={leader._id}>
                            {leader.username}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Select 10 Users:</label>
                <select className="form-select" multiple onChange={(e) => setSelectedUsers([...e.target.selectedOptions].map(o => o.value))}>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>

            <button className="btn btn-primary w-100" onClick={handleAssign} disabled={loading}>
                {loading ? "Assigning..." : "Assign Users"}
            </button>
        </div>
    );
};

export default AssignUsers;
