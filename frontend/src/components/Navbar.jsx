import { Link, useNavigate } from "react-router-dom";
import { FaBriefcase, FaUserTie, FaUser, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName") || "User";
  const isLoggedIn = !!role;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand logo" to="/">
          Job<span>Portal</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Center Links */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/jobs">
                Jobs
              </Link>
            </li>

            {/* Only show these after login */}
            {isLoggedIn && role === "JOB_SEEKER" && (
              <li className="nav-item">
                <Link className="nav-link" to="/jobseeker-dashboard">
                  <FaBriefcase className="me-1" />
                  Dashboard
                </Link>
              </li>
            )}

            {isLoggedIn && role === "RECRUITER" && (
              <li className="nav-item">
                <Link className="nav-link" to="/recruiter-dashboard">
                  <FaUserTie className="me-1" />
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn login-btn">
                  Login
                </Link>

                {/* Register Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn register-btn dropdown-toggle"
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    Register <FaChevronDown className="ms-1" size={12} />
                  </button>

                  {showDropdown && (
                    <ul className="dropdown-menu show custom-dropdown">
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/register?role=jobseeker"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaUser className="me-2" />
                          Job Seeker
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/register?role=recruiter"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaUserTie className="me-2" />
                          Recruiter
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <span className="text-white fw-semibold">{userName}</span>
                <button onClick={handleLogout} className="btn logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;