
import { Link } from "react-router-dom";

const departments = [
  {
    icon: "🏥",
    name: "Health & Family Welfare",
    description: "Healthcare facilities and public health services."
  },
  {
    icon: "📚",
    name: "General Education",
    description: "Education facilities and school-related concerns."
  },
  {
    icon: "🏗️",
    name: "Public Works",
    description: "Roads, bridges and public infrastructure."
  },
  {
    icon: "💧",
    name: "Water Resources",
    description: "Water supply and resource management."
  },
  {
    icon: "⚡",
    name: "Power Department",
    description: "Electricity supply and power-related issues."
  },
  {
    icon: "🚌",
    name: "Transport",
    description: "Public transport and transportation services."
  }
];

function Home() {
  return (
    <div className="portal">

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="brand">
            <span className="brand-icon">കേരളം</span>
            <span>
              <strong>CM KERALA</strong>
              <small>PUBLIC GRIEVANCE PORTAL</small>
            </span>
          </Link>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#departments">Departments</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="register-btn">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">
            CITIZEN-CENTRIC GOVERNANCE
          </span>

          <h1>
            Your Voice Matters.<br />
            <span>We Are Here to Listen.</span>
          </h1>

          <p>
            A digital platform to submit public grievances,
            track their progress and stay informed about
            the actions taken.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Submit a Grievance →
            </Link>

            <Link to="/track" className="secondary-btn">
              Track Your Grievance
            </Link>
          </div>

          <div className="hero-note">
            ✓ Transparent process
            <span>✓ Secure citizen access</span>
            <span>✓ Trackable updates</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-icon">🏛️</div>
            <h3>Public Grievance Redressal</h3>
            <p>
              Connecting citizens with the appropriate
              authorities through a transparent process.
            </p>
            <div className="card-status">
              <span></span> Citizen-focused service
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="stats-heading">
          <span>PORTAL OVERVIEW</span>
          <p>Sample demonstration statistics</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h2>1,250</h2>
            <p>Total Grievances</p>
          </div>
          <div className="stat-card">
            <h2>320</h2>
            <p>Pending Grievances</p>
          </div>
          <div className="stat-card">
            <h2>850</h2>
            <p>Resolved Grievances</p>
          </div>
          <div className="stat-card">
            <h2>80</h2>
            <p>Under Review</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about-section" id="about">
        <div className="section-label">ABOUT THE PORTAL</div>
        <h2>A Platform for Every Citizen</h2>

        <p>
          The CM Kerala Public Grievance Redressal Portal is a
          recruitment demonstration project designed to help
          citizens submit public grievances and follow their
          progress through a structured administrative workflow.
        </p>

        <div className="about-points">
          <div>✓ Easy grievance submission</div>
          <div>✓ Transparent status tracking</div>
          <div>✓ Department-level coordination</div>
        </div>
      </section>

      {/* How it works */}
      <section className="workflow-section" id="how-it-works">
        <div className="section-label">SIMPLE PROCESS</div>
        <h2>How It Works</h2>
        <p className="section-description">
          Follow your grievance from submission to resolution.
        </p>

        <div className="workflow-grid">
          <div className="workflow-card">
            <span className="step-number">01</span>
            <div className="step-icon">👤</div>
            <h3>Register</h3>
            <p>Create your citizen account securely.</p>
          </div>

          <div className="workflow-card">
            <span className="step-number">02</span>
            <div className="step-icon">📝</div>
            <h3>Submit</h3>
            <p>Describe your issue and submit supporting documents.</p>
          </div>

          <div className="workflow-card">
            <span className="step-number">03</span>
            <div className="step-icon">🔍</div>
            <h3>Review & Action</h3>
            <p>The CMO reviews and forwards it to the relevant department.</p>
          </div>

          <div className="workflow-card">
            <span className="step-number">04</span>
            <div className="step-icon">✅</div>
            <h3>Resolution</h3>
            <p>Receive updates and view the action taken.</p>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="departments-section" id="departments">
        <div className="section-label">GOVERNMENT SERVICES</div>
        <h2>Featured Departments</h2>
        <p className="section-description">
          Grievances can be routed to the relevant departments.
        </p>

        <div className="department-grid">
          {departments.map((department, index) => (
            <div className="department-card" key={index}>
              <div className="department-icon">{department.icon}</div>
              <h3>{department.name}</h3>
              <p>{department.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Have an Issue to Report?</h2>
        <p>
          Submit your grievance and follow its progress
          through your personal dashboard.
        </p>
        <Link to="/register" className="primary-btn">
          Get Started →
        </Link>
      </section>

      {/* Contact */}
      <section className="contact-section" id="contact">
        <h2>Contact & Support</h2>
        <p>
          Have questions about using this demonstration portal?
          Contact the portal support team through the Contact Us page.
        </p>
        <Link to="/contact" className="contact-link">
          Contact Us →
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <h3>CM KERALA</h3>
            <p>Public Grievance Redressal Portal</p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#departments">Departments</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Academic Recruitment Prototype | Not an official
            Government of Kerala or Chief Minister's Office website.
          </p>
          <p>© 2026 CM Kerala Grievance Portal</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;
