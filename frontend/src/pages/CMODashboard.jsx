

import { useEffect, useState } from "react";
import api from "../services/api";
import "./CMODashboard.css";

function CMODashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("cmo/stats/")
      .then((response) => setStats(response.data))
      .catch((err) => {
        console.error(err);
        setError("Unable to load dashboard. Please check your CMO login.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h3>Loading CMO Dashboard...</h3>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cmo-dashboard">
      <h1>CMO Admin Dashboard</h1>
      <p>Chief Minister's Public Grievance Redressal Portal</p>

      <div className="cmo-stats">
        <div className="cmo-stat">
          <h3>Total Grievances</h3>
          <h2>{stats.total_grievances}</h2>
        </div>
        <div className="cmo-stat">
          <h3>Pending</h3>
          <h2>{stats.pending_grievances}</h2>
        </div>
        <div className="cmo-stat">
          <h3>Resolved</h3>
          <h2>{stats.resolved_grievances}</h2>
        </div>
        <div className="cmo-stat">
          <h3>Overdue</h3>
          <h2>{stats.overdue_grievances}</h2>
        </div>
      </div>

      <h2>Recent Grievances</h2>

      <div className="cmo-table-wrapper">
        <table className="cmo-table">
          <thead>
            <tr>
              <th>Reference ID</th>
              <th>Subject</th>
              <th>District</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {stats.recent_grievances.map((item) => (
              <tr key={item.id}>
                <td>{item.reference_id}</td>
                <td>{item.subject}</td>
                <td>{item.district}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>{item.priority}</td>
                <td>{item.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {stats.recent_grievances.length === 0 && (
          <p>No grievances available.</p>
        )}
      </div>
    </div>
  );
}

export default CMODashboard;
