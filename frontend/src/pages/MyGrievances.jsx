
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./MyGrievances.css";

function MyGrievances() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await api.get("grievances/my/");
        const data = response.data;
        setGrievances(data.results || data);
      } catch (err) {
        setError("Unable to load grievances. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []);

  return (
    <div className="my-grievances-page">
      <div className="my-grievances-container">
        <h2>My Grievances</h2>
        <p>View and track the grievances you have submitted.</p>

        <Link to="/citizen-dashboard" className="back-link">
          Back to Dashboard
        </Link>

        {loading && <p>Loading grievances...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && grievances.length === 0 && (
          <p>You haven't submitted any grievances yet.</p>
        )}

        <div className="grievance-list">
          {grievances.map((item) => (
            <div className="grievance-card" key={item.id}>
              <h3>{item.subject}</h3>
              <p><strong>Reference ID:</strong> {item.reference_id}</p>
              <p><strong>District:</strong> {item.district}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <p>
                <strong>Submitted:</strong>{" "}
                {new Date(item.created_at).toLocaleDateString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyGrievances;
