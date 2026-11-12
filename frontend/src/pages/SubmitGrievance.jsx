
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./SubmitGrievance.css";

const districts = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

const categories = [
  "Healthcare",
  "Education",
  "Public Infrastructure",
  "Water Supply",
  "Electricity",
  "Transportation",
  "Other",
];

function SubmitGrievance() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    district: "",
    category: "",
    subject: "",
    description: "",
  });

  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (attachment) {
        data.append("attachment", attachment);
      }

      const response = await api.post("grievances/my/", data);

      setSuccess(
        `Grievance submitted successfully! Reference ID: ${response.data.reference_id}`
      );

      setFormData({
        district: "",
        category: "",
        subject: "",
        description: "",
      });

      setAttachment(null);
    } catch (err) {
      const responseData = err.response?.data;

      setError(
        responseData
          ? JSON.stringify(responseData)
          : "Unable to connect to the backend. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-page">
      <div className="submit-card">
        <button
          type="button"
          className="back-link"
          onClick={() => navigate("/citizen-dashboard")}
        >
          ← Back to Dashboard
        </button>

        <h1>Submit a Grievance</h1>
        <p>
          Please provide accurate information about your complaint.
        </p>

        <form onSubmit={handleSubmit}>
          <label>District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          <label>Grievance Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter grievance subject"
            maxLength={200}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your grievance in detail"
            rows={6}
            required
          />

          <label>Supporting Document (Optional)</label>
          <input
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            onChange={(e) =>
              setAttachment(e.target.files[0] || null)
            }
          />

          {error && <div className="form-error">{error}</div>}

          {success && (
            <div className="form-success">{success}</div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Grievance"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitGrievance;
