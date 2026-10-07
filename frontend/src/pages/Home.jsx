import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaRocket,
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?keyword=${keyword}&location=${location}`);
  };

  return (
    <div className="landing-page">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content text-center">
            {/* Badge */}
            <div className="hero-badge">
              <span>⭐</span> #1 Job Portal for Freshers in India
            </div>

            {/* Title */}
            <h1 className="hero-title">
              Find Your <span>Dream Job</span>
              <br />
              Today <FaRocket className="rocket-icon" />
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Discover thousands of job opportunities from top companies.
              Your next career move is just a search away.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="search-box">
              <div className="search-field">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Job title, skills or company name"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <div className="divider"></div>

              <div className="search-field">
                <FaMapMarkerAlt className="search-icon" />
                <input
                  type="text"
                  placeholder="City or location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <button type="submit" className="search-btn">
                <FaSearch /> Search Jobs
              </button>
            </form>
          </div>

          {/* ================= STATS CARDS ================= */}
          <div className="row stats-row">
            <div className="col-md-4">
              <div className="stats-card">
                <FaBriefcase size={36} />
                <h2>10,000+</h2>
                <p>Active Jobs</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card">
                <FaBuilding size={36} />
                <h2>500+</h2>
                <p>Companies</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card">
                <FaUsers size={36} />
                <h2>25K+</h2>
                <p>Candidates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title text-center">Featured Jobs</h2>
          <p className="section-subtitle text-center">
            Explore the most popular opportunities right now
          </p>

          <div className="row">
            {[
              {
                title: "Java Developer",
                company: "Google",
                location: "Bangalore",
                salary: "₹8 - ₹15 LPA",
              },
              {
                title: "React Developer",
                company: "Microsoft",
                location: "Hyderabad",
                salary: "₹7 - ₹14 LPA",
              },
              {
                title: "Software Engineer",
                company: "Amazon",
                location: "Pune",
                salary: "₹10 - ₹18 LPA",
              },
              {
                title: "Python Developer",
                company: "TCS",
                location: "Mumbai",
                salary: "₹6 - ₹12 LPA",
              },
              {
                title: "UI/UX Designer",
                company: "Flipkart",
                location: "Bangalore",
                salary: "₹8 - ₹16 LPA",
              },
              {
                title: "Data Analyst",
                company: "Infosys",
                location: "Chennai",
                salary: "₹5 - ₹11 LPA",
              },
            ].map((job, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="featured-card">
                  <h4>{job.title}</h4>
                  <p>
                    <FaBuilding className="me-2" /> {job.company}
                  </p>
                  <p>
                    <FaMapMarkerAlt className="me-2" /> {job.location}
                  </p>
                  <p>
                    <FaMoneyBillWave className="me-2" /> {job.salary}
                  </p>
                  <Link to="/jobs" className="btn view-job-btn">
                    View Jobs
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;