import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

import {
  FaBriefcase,
  FaBookmark,
  FaCheckCircle,
  FaUser,
  FaSearch,
  FaFileAlt,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaHome
} from "react-icons/fa";

import "../styles/JobSeekerDashboard.css";

function JobSeekerDashboard() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [totalJobs, setTotalJobs] = useState(0);
  const [savedJobs, setSavedJobs] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    loadDashboard();
  }, []);


  const loadDashboard = async () => {

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setLoading(false);
      return;
    }

    try {

      // -------------------------------
      // AVAILABLE JOBS
      // -------------------------------

      try {

        const response = await API.get("/jobs");

        setTotalJobs(
          Array.isArray(response.data)
            ? response.data.length
            : 0
        );

      } catch (error) {

        console.error("JOBS ERROR:", error);

        setTotalJobs(0);

      }


      // -------------------------------
      // JOB SEEKER PROFILE
      // -------------------------------

      try {

        const response =
          await API.get(`/jobseeker/${userId}`);

        setProfile(
          response.data || {}
        );

      } catch (error) {

        console.error(
          "PROFILE ERROR:",
          error
        );

        setProfile({});

      }


      // -------------------------------
      // SAVED JOBS
      // -------------------------------

      try {

        const response =
          await API.get(
            `/saved-jobs/user/${userId}`
          );

        setSavedJobs(
          Array.isArray(response.data)
            ? response.data.length
            : 0
        );

      } catch (error) {

        console.error(
          "SAVED JOBS ERROR:",
          error
        );

        setSavedJobs(0);

      }


      // -------------------------------
      // APPLIED JOBS
      // -------------------------------

      try {

        const response =
          await API.get(
            `/applications/user/${userId}`
          );

        setAppliedJobs(
          Array.isArray(response.data)
            ? response.data.length
            : 0
        );

      } catch (error) {

        console.error(
          "APPLICATIONS ERROR:",
          error
        );

        setAppliedJobs(0);

      }

    } catch (error) {

      console.error(
        "DASHBOARD ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("userTypeId");

    navigate("/");

  };


  // ==========================================
  // PROFILE COMPLETION
  // ==========================================

  const calculateProfileCompletion = () => {

    const fields = [

      profile.firstName,
      profile.lastName,
      profile.city,
      profile.state,
      profile.country,
      profile.workAuthorization,
      profile.employmentType,
      profile.resume,
      profile.profilePhoto

    ];

    const completed = fields.filter(
      field =>
        field &&
        field.toString().trim() !== ""
    ).length;

    return Math.round(
      (completed / fields.length) * 100
    );

  };


  const profileCompletion =
    calculateProfileCompletion();


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div className="js-loading">

        <div className="js-spinner"></div>

        <h3>
          Loading your dashboard...
        </h3>

        <p>
          Please wait a moment
        </p>

      </div>

    );

  }


  // ==========================================
  // DASHBOARD UI
  // ==========================================

  return (

    <div className="js-dashboard">


      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside className="js-sidebar">


        {/* LOGO */}

        <div className="js-brand">

          <div className="js-brand-icon">
            <FaBriefcase />
          </div>

          <div>

            <h2>
              JobPortal
            </h2>

            <span>
              Job Seeker
            </span>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="js-navigation">


          <Link
            to="/jobseeker-dashboard"
            className="js-nav-link js-active"
          >

            <FaHome />

            <span>
              Dashboard
            </span>

          </Link>


          <Link
            to="/jobs"
            className="js-nav-link"
          >

            <FaSearch />

            <span>
              Find Jobs
            </span>

          </Link>


          <Link
            to="/saved-jobs"
            className="js-nav-link"
          >

            <FaBookmark />

            <span>
              Saved Jobs
            </span>

            <strong>
              {savedJobs}
            </strong>

          </Link>


          <Link
            to="/applied-jobs"
            className="js-nav-link"
          >

            <FaFileAlt />

            <span>
              My Applications
            </span>

            <strong>
              {appliedJobs}
            </strong>

          </Link>


          <Link
            to="/jobseeker-profile"
            className="js-nav-link"
          >

            <FaUser />

            <span>
              Profile
            </span>

          </Link>


        </nav>


        {/* LOGOUT */}

        <div className="js-sidebar-bottom">

          <button
            className="js-logout"
            onClick={handleLogout}
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>


      </aside>


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="js-main">


        {/* ====================================
            HEADER
        ==================================== */}

        <header className="js-header">

          <div>

            <span className="js-welcome-label">
              JOB SEEKER DASHBOARD
            </span>

            <h1>

              Welcome,{" "}

              {profile.firstName ||
                "Job Seeker"}

              {" "}👋

            </h1>

            <p>
              Find your next opportunity
              and build your career.
            </p>

          </div>

        </header>


        {/* ====================================
            STATISTICS
        ==================================== */}

        <section className="js-stats">


          {/* AVAILABLE JOBS */}

          <div className="js-stat-card">

            <div className="js-stat-icon purple">
              <FaBriefcase />
            </div>

            <div>

              <span>
                Available Jobs
              </span>

              <h2>
                {totalJobs}
              </h2>

              <small>
                Jobs available
              </small>

            </div>

          </div>


          {/* SAVED JOBS */}

          <div className="js-stat-card">

            <div className="js-stat-icon orange">
              <FaBookmark />
            </div>

            <div>

              <span>
                Saved Jobs
              </span>

              <h2>
                {savedJobs}
              </h2>

              <small>
                Jobs you saved
              </small>

            </div>

          </div>


          {/* APPLICATIONS */}

          <div className="js-stat-card">

            <div className="js-stat-icon green">
              <FaCheckCircle />
            </div>

            <div>

              <span>
                Applications
              </span>

              <h2>
                {appliedJobs}
              </h2>

              <small>
                Applications submitted
              </small>

            </div>

          </div>


        </section>


        {/* ====================================
            MAIN CONTENT
        ==================================== */}

        <section className="js-content-grid">


          {/* ==================================
              LEFT SIDE
          ================================== */}

          <div className="js-left-column">


            {/* FIND JOB BANNER */}

            <div className="js-search-banner">

              <div className="js-search-content">

                <span>
                  FIND YOUR NEXT OPPORTUNITY
                </span>

                <h2>
                  Your dream job is waiting for you.
                </h2>

                <p>
                  Explore available jobs and
                  find the right opportunity
                  for your skills.
                </p>

                <Link
                  to="/jobs"
                  className="js-banner-btn"
                >

                  <FaSearch />

                  Browse Jobs

                </Link>

              </div>


              <div className="js-banner-icon">

                <FaBriefcase />

              </div>

            </div>


            {/* RECENT JOB ACTIVITY */}

            <div className="js-panel">

              <div className="js-panel-header">

                <h3>
                  Job Search
                </h3>

                <p>
                  Manage your job applications
                  and saved jobs.
                </p>

              </div>


              <div className="js-action-list">


                <Link
                  to="/jobs"
                  className="js-action-item"
                >

                  <div className="js-action-icon purple">

                    <FaSearch />

                  </div>

                  <div>

                    <h4>
                      Find Jobs
                    </h4>

                    <p>
                      Browse available job opportunities
                    </p>

                  </div>

                </Link>


                <Link
                  to="/saved-jobs"
                  className="js-action-item"
                >

                  <div className="js-action-icon orange">

                    <FaBookmark />

                  </div>

                  <div>

                    <h4>
                      Saved Jobs
                    </h4>

                    <p>
                      View your saved job opportunities
                    </p>

                  </div>

                </Link>


                <Link
                  to="/applied-jobs"
                  className="js-action-item"
                >

                  <div className="js-action-icon green">

                    <FaFileAlt />

                  </div>

                  <div>

                    <h4>
                      My Applications
                    </h4>

                    <p>
                      Track your submitted applications
                    </p>

                  </div>

                </Link>


              </div>

            </div>


          </div>


          {/* ==================================
              PROFILE
          ================================== */}

          <div className="js-profile-card">


            <div className="js-profile-header">

              <span>
                MY PROFILE
              </span>

              <Link
                to="/jobseeker-profile"
              >

                Edit

              </Link>

            </div>


            <div className="js-profile-body">


              {/* PROFILE IMAGE */}

              <img
                src={
                  profile.profilePhoto ||

                  `https://ui-avatars.com/api/?name=${
                    encodeURIComponent(
                      `${profile.firstName || "Job"} ${
                        profile.lastName || "Seeker"
                      }`
                    )
                  }&background=6366f1&color=fff&size=150`
                }
                className="js-profile-image"
                alt="Profile"
              />


              {/* NAME */}

              <h3>

                {profile.firstName ||
                  "Job Seeker"}

                {" "}

                {profile.lastName ||
                  ""}

              </h3>


              {/* EMPLOYMENT */}

              <p className="js-profile-role">

                {profile.employmentType ||
                  "Job Seeker"}

              </p>


              {/* LOCATION */}

              <div className="js-profile-location">

                <FaMapMarkerAlt />

                <span>

                  {profile.city ||
                    "Location not added"}

                  {profile.state &&
                    `, ${profile.state}`}

                </span>

              </div>


              {/* PROFILE COMPLETION */}

              <div className="js-progress-section">

                <div className="js-progress-label">

                  <span>
                    Profile Completion
                  </span>

                  <strong>
                    {profileCompletion}%
                  </strong>

                </div>


                <div className="js-progress">

                  <div
                    className="js-progress-bar"
                    style={{
                      width:
                        `${profileCompletion}%`
                    }}
                  />

                </div>


                <p>

                  {profileCompletion === 100

                    ? "Your profile is complete! 🎉"

                    : "Complete your profile to improve your chances of getting hired."
                  }

                </p>

              </div>


              {/* PROFILE BUTTON */}

              <Link
                to="/jobseeker-profile"
                className="js-profile-btn"
              >

                <FaUser />

                Manage Profile

              </Link>


            </div>

          </div>


        </section>


      </main>

    </div>

  );

}


export default JobSeekerDashboard;