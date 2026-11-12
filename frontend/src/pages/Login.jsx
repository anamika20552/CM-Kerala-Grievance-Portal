
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("accounts/login/", {
        username: formData.email,
        password: formData.password,
      });

      sessionStorage.setItem("access_token", response.data.access);
      sessionStorage.setItem("refresh_token", response.data.refresh);

      const userResponse = await api.get("accounts/me/");

      sessionStorage.setItem(
        "user",
        JSON.stringify(userResponse.data)
      );

      if (userResponse.data.role === "citizen") {
        navigate("/citizen-dashboard");
      } else {
        setError("This login page is currently for citizens.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError(
          "Unable to connect to the backend. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Citizen Login</h2>
        <p>Login to manage and track your grievances.</p>

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        {error && <div className="auth-error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
