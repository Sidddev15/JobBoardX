import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/admin/stats").then((res) => setStats(res.data));
    axios.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await axios.patch(`/admin/user/${id}`, { role });
      alert("Role updated");
      axios.get("/admin/users").then((res) => setUsers(res.data)); // refresh
    } catch (err) {
      alert("Failed to update role");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h4>📊 Stats</h4>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Jobs: {stats.totalJobs}</p>
      <p>Total Applications: {stats.totalApplications}</p>

      <h4>👥 Manage Users</h4>
      {users.map((u) => (
        <div key={u._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p><strong>{u.name}</strong> - {u.email}</p>
          <select
            value={u.role}
            onChange={(e) => handleRoleChange(u._id, e.target.value)}
          >
            <option value="admin">admin</option>
            <option value="recruiter">recruiter</option>
            <option value="candidate">candidate</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
