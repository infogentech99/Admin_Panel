import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignLeader = () => {
  const [users, setUsers] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedLeader, setSelectedLeader] = useState('');
  const navigate = useNavigate();

  // Fetch users and leaders on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Fetch users
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));

    // Fetch leaders
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/admin/leaders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLeaders(res.data))
      .catch((err) => console.error('Error fetching leaders:', err));
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedLeader) {
      alert('Please select both a user and a leader.');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/admin/assign-leader`,
        { userId: selectedUser, leaderId: selectedLeader },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Leader assigned successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error assigning leader:', error);
      alert('There was an error assigning the leader. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Assign Leader to User</h2>
      <form onSubmit={handleAssign}>
        <div className="form-group">
          <label htmlFor="userSelect">Select User:</label>
          <select
            id="userSelect"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="form-control"
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="leaderSelect">Select Leader:</label>
          <select
            id="leaderSelect"
            value={selectedLeader}
            onChange={(e) => setSelectedLeader(e.target.value)}
            className="form-control"
          >
            <option value="">-- Select Leader --</option>
            {leaders.map((leader) => (
              <option key={leader._id} value={leader._id}>
                {leader.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Assign Leader
        </button>
      </form>
    </div>
  );
};

export default AssignLeader;
