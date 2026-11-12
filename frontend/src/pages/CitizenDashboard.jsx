
import { useNavigate } from "react-router-dom";
import "./CitizenDashboard.css";

function CitizenDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    sessionStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="citizen-dashboard">

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h2>CM Kerala</h2>
          <span>Public Grievance Redressal Portal</span>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-content">

        {/* Welcome Section */}
        <section className="welcome-section">
          <h1>Welcome, {user.name || "Citizen"}!</h1>
          <p>
            Manage your grievances and stay updated on their progress.
          </p>
        </section>

        {/* Statistics */}
        <section className="dashboard-stats">

          <div className="stat-card">
            <h3>0</h3>
            <p>Total Grievances</p>
          </div>

          <div className="stat-card">
            <h3>0</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h3>0</h3>
            <p>Resolved</p>
          </div>

        </section>

        {/* Grievance Services */}
        <section className="dashboard-actions">
          <h2>Grievance Services</h2>

          <div className="action-grid">

            <div className="action-card">
              <h3>Submit a Grievance</h3>
              <p>
                Register a new complaint or public grievance.
              </p>
              <button
                onClick={() => navigate("/submit-grievance")}
              >
                Submit Now
              </button>
            </div>

            <div className="action-card">
              <h3>Track Grievance</h3>
              <p>
                Check the status of your submitted grievance.
              </p>
              <button
                onClick={() => navigate("/track")}
              >
                Track Now
              </button>
            </div>

            <div className="action-card">
              <h3>My Grievances</h3>
              <p>
                View your previously submitted grievances.
              </p>
              <button
                onClick={() => navigate("/my-grievances")}
              >
                View Grievances
              </button>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default CitizenDashboard;
