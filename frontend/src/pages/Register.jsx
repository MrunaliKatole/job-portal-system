import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get role from URL (?role=jobseeker or ?role=recruiter)
  const roleFromUrl = searchParams.get("role") || "jobseeker";
  const selectedRole =
    roleFromUrl.toLowerCase() === "recruiter" ? "RECRUITER" : "JOB_SEEKER";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const payload = {
  email: formData.email,
  password: formData.password,
  userTypeId: {
    userTypeId: selectedRole === "RECRUITER" ? 1 : 2
  }
};

      await API.post("/auth/register", payload);

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Side */}
        <div className="register-left">
          <div className="register-left-content">
            <h1>
              Join <span>JobPortal</span> 🚀
            </h1>
            <p>
              Create your account and unlock thousands of opportunities.
            </p>

            <div className="register-features">
              <div className="feature-item">✓ 10,000+ Jobs</div>
              <div className="feature-item">✓ Top Companies</div>
              <div className="feature-item">✓ Easy Apply</div>
              <div className="feature-item">✓ Save Jobs</div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="register-right">
          <div className="register-card">
            <h2>Create Account</h2>
            <p className="register-subtitle">
              Registering as{" "}
              <strong>
                {selectedRole === "RECRUITER" ? "Recruiter" : "Job Seeker"}
              </strong>
            </p>

            <form onSubmit={handleRegister}>
              {/* Full Name */}
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="register-submit-btn"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            <div className="register-footer">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;