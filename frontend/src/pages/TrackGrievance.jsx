
import { useState } from "react";
import api from "../services/api";
import "./TrackGrievance.css";

function TrackGrievance() {
  const [referenceId, setReferenceId] = useState("");
  const [grievance, setGrievance] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();

    setError("");
    setGrievance(null);
    setHistory([]);

    if (!referenceId.trim()) {
      setError("Please enter your grievance reference ID.");
      return;
    }

    try {
      setLoading(true);

      // Fetch grievances belonging to the logged-in citizen
      const response = await api.get("grievances/my/");
      const data = response.data;
      const list = data.results || data;

      // Find the grievance using its reference ID
      const found = list.find(
        (item) =>
          item.reference_id.toLowerCase() ===
          referenceId.trim().toLowerCase()
      );

      if (!found) {
        setError("Grievance not found in your account.");
        return;
      }

      setGrievance(found);

      // Fetch grievance status history
      const historyResponse = await api.get(
        `grievances/history/${found.reference_id}/`
      );

      setHistory(historyResponse.data);
    } catch (err) {
      console.error("Tracking error:", err);

      if (err.response?.status === 404) {
        setError("Grievance history not found.");
      } else if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError(
          "Unable to track grievance. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-page">
      <div className="track-card">
        <h2>Track Your Grievance</h2>

        <p>
          Enter your reference ID to check your grievance
          details and status history.
        </p>

        <form onSubmit={handleTrack}>
          <input
            type="text"
            placeholder="Example: CMK-2026-XXXXXXXXXX"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Track Grievance"}
          </button>
        </form>

        {error && (
          <p className="track-error">{error}</p>
        )}

        {grievance && (
          <>
            <div className="track-result">
              <h3>Grievance Details</h3>

              <p>
                <strong>Reference ID:</strong>{" "}
                {grievance.reference_id}
              </p>

              <p>
                <strong>Subject:</strong>{" "}
                {grievance.subject}
              </p>

              <p>
                <strong>District:</strong>{" "}
                {grievance.district}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {grievance.category}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {grievance.status}
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                {grievance.priority}
              </p>

              <p>
                <strong>Submitted:</strong>{" "}
                {new Date(
                  grievance.created_at
                ).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="history-section">
              <h3>Grievance Status History</h3>

              {history.length > 0 ? (
                history.map((item) => (
                  <div
                    className="history-item"
                    key={item.id}
                  >
                    <h4>{item.new_status}</h4>

                    <p>
                      {item.remarks ||
                        "No remarks provided."}
                    </p>

                    <p>
                      <strong>Updated by:</strong>{" "}
                      {item.updated_by_name || "System"}
                    </p>

                    <small>
                      {new Date(
                        item.timestamp
                      ).toLocaleString("en-IN")}
                    </small>
                  </div>
                ))
              ) : (
                <p>No status updates available yet.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TrackGrievance;
