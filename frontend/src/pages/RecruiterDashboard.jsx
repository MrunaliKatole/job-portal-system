import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

import {
  FaBriefcase,
  FaUsers,
  FaBuilding,
  FaPlus,
  FaClipboardList,
  FaUserEdit,
  FaArrowRight,
  FaMapMarkerAlt,
  FaEye,
  FaChartLine,
  FaTrash
} from "react-icons/fa";

import "../styles/RecruiterDashboard.css";


function RecruiterDashboard() {

  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingJobId, setDeletingJobId] = useState(null);


  const userId = localStorage.getItem("userId");


  useEffect(() => {

    loadData();

  }, []);


  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  const loadData = async () => {

    if (!userId) {

      setLoading(false);

      return;

    }


    try {

      const [
        profileRes,
        jobsRes
      ] = await Promise.all([

        API.get(
          `/recruiter/${userId}`
        ),

        API.get(
          `/jobs/recruiter/${userId}`
        )

      ]);


      setProfile(
        profileRes.data || {}
      );


      setJobs(
        jobsRes.data || []
      );


    } catch (err) {

      console.error(
        "RECRUITER DASHBOARD ERROR:",
        err.response?.data ||
        err.message
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // DELETE JOB
  // =====================================================

  const deleteJob = async (jobId) => {

    if (!jobId) {

      alert("Invalid Job ID");

      return;

    }


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?\n\nThis action cannot be undone."
    );


    if (!confirmDelete) {

      return;

    }


    try {

      setDeletingJobId(jobId);


      // Backend DELETE API
      await API.delete(
        `/jobs/${jobId}`
      );


      // Remove deleted job from UI immediately
      setJobs((previousJobs) =>
        previousJobs.filter(
          (job) =>
            job.jobPostId !== jobId
        )
      );


      alert(
        "Job deleted successfully!"
      );


    } catch (err) {

      console.error(
        "DELETE JOB ERROR:",
        err.response?.data ||
        err.message
      );


      alert(
        err.response?.data?.message ||
        "Failed to delete job. Please try again."
      );

    } finally {

      setDeletingJobId(null);

    }

  };


  // =====================================================
  // TOTAL APPLICANTS
  // =====================================================

  const totalApplicants =
    jobs.reduce(

      (total, job) =>

        total +
        Number(
          job.totalCandidates || 0
        ),

      0

    );


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="dashboard-loading">

        <div className="spinner-border text-primary" />

        <h5 className="mt-3">
          Loading Recruiter Dashboard...
        </h5>

      </div>

    );

  }


  return (

    <div className="dashboard">


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="sidebar">

        <div className="sidebar-brand">

          <div className="brand-icon">
            JP
          </div>

          <span>
            JobPortal
          </span>

        </div>


        <div className="sidebar-menu">

          <Link
            to="/recruiter-dashboard"
            className="sidebar-link active"
          >

            <FaChartLine />

            <span>
              Dashboard
            </span>

          </Link>


          <Link
            to="/recruiter-profile"
            className="sidebar-link"
          >

            <FaUserEdit />

            <span>
              My Profile
            </span>

          </Link>


          <Link
            to="/post-job"
            className="sidebar-link"
          >

            <FaPlus />

            <span>
              Post a Job
            </span>

          </Link>


          <Link
            to="/my-jobs"
            className="sidebar-link"
          >

            <FaClipboardList />

            <span>
              Manage Jobs
            </span>

          </Link>

        </div>


        <div className="sidebar-bottom">

          <Link
            to="/"
            className="logout-link"
          >

            Logout

          </Link>

        </div>

      </aside>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="main-content">


        {/* =================================================
            TOP HEADER
        ================================================= */}

        <div className="dashboard-header">

          <div>

            <p className="welcome-label">
              Recruiter Dashboard
            </p>

            <h1>

              Welcome,{" "}

              {
                profile.firstName ||
                "Recruiter"
              }

              {" "}👋

            </h1>

            <p className="welcome-text">

              Manage your job postings and connect
              with talented candidates.

            </p>

          </div>


          <Link
            to="/post-job"
            className="header-post-btn"
          >

            <FaPlus />

            Post New Job

          </Link>

        </div>


        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="stats-grid">


          {/* TOTAL JOBS */}

          <div className="stat-card">

            <div className="stat-icon purple">

              <FaBriefcase />

            </div>

            <div>

              <span>
                Total Jobs
              </span>

              <h2>
                {jobs.length}
              </h2>

              <small>
                Jobs posted by you
              </small>

            </div>

          </div>


          {/* TOTAL APPLICANTS */}

          <div className="stat-card">

            <div className="stat-icon blue">

              <FaUsers />

            </div>

            <div>

              <span>
                Total Applicants
              </span>

              <h2>
                {totalApplicants}
              </h2>

              <small>
                Candidates applied
              </small>

            </div>

          </div>


          {/* COMPANY */}

          <div className="stat-card">

            <div className="stat-icon green">

              <FaBuilding />

            </div>

            <div>

              <span>
                Company
              </span>

              <h2 className="company-stat">

                {
                  profile.company ||
                  "Not Added"
                }

              </h2>

              <small>
                Your organization
              </small>

            </div>

          </div>


        </div>


        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="dashboard-grid">


          {/* QUICK ACTIONS */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Quick Actions
                </h3>

                <p>
                  Manage your recruitment activities
                </p>

              </div>

            </div>


            <div className="action-grid">


              {/* POST JOB */}

              <Link
                to="/post-job"
                className="action-card action-purple"
              >

                <div className="action-icon">

                  <FaPlus />

                </div>

                <div>

                  <h4>
                    Post a Job
                  </h4>

                  <p>
                    Create a new job opportunity
                  </p>

                </div>

                <FaArrowRight
                  className="action-arrow"
                />

              </Link>


              {/* MANAGE JOBS */}

              <Link
                to="/my-jobs"
                className="action-card action-blue"
              >

                <div className="action-icon">

                  <FaClipboardList />

                </div>

                <div>

                  <h4>
                    Manage Jobs
                  </h4>

                  <p>
                    View and manage your postings
                  </p>

                </div>

                <FaArrowRight
                  className="action-arrow"
                />

              </Link>


              {/* APPLICANTS */}

              <Link
                to="/my-jobs"
                className="action-card action-green"
              >

                <div className="action-icon">

                  <FaUsers />

                </div>

                <div>

                  <h4>
                    View Applicants
                  </h4>

                  <p>
                    Review candidates for your jobs
                  </p>

                </div>

                <FaArrowRight
                  className="action-arrow"
                />

              </Link>


              {/* PROFILE */}

              <Link
                to="/recruiter-profile"
                className="action-card action-orange"
              >

                <div className="action-icon">

                  <FaUserEdit />

                </div>

                <div>

                  <h4>
                    Edit Profile
                  </h4>

                  <p>
                    Update your recruiter information
                  </p>

                </div>

                <FaArrowRight
                  className="action-arrow"
                />

              </Link>


            </div>

          </div>


          {/* =================================================
              PROFILE CARD
          ================================================= */}

          <div className="dashboard-panel profile-panel">

            <div className="panel-header">

              <div>

                <h3>
                  My Profile
                </h3>

                <p>
                  Your recruiter information
                </p>

              </div>

              <Link
                to="/recruiter-profile"
                className="view-profile-link"
              >

                View Profile

                <FaArrowRight />

              </Link>

            </div>


            <div className="profile-content">


              <img

                src={

                  profile.profilePhoto ||

                  `https://ui-avatars.com/api/?name=${
                    profile.firstName ||
                    "Recruiter"
                  }&background=4f46e5&color=fff&size=160`

                }

                className="profile-image"

                alt="Recruiter Profile"

              />


              <h3>

                {
                  profile.firstName ||
                  ""
                }

                {" "}

                {
                  profile.lastName ||
                  ""
                }

              </h3>


              <p className="profile-company">

                {
                  profile.company ||
                  "Company Not Added"
                }

              </p>


              <div className="profile-location">

                <FaMapMarkerAlt />

                <span>

                  {
                    profile.city ||
                    "City N/A"
                  }

                  {", "}

                  {
                    profile.state ||
                    "State N/A"
                  }

                </span>

              </div>


              <div className="profile-details">

                <div>

                  <span>
                    Country
                  </span>

                  <strong>

                    {
                      profile.country ||
                      "N/A"
                    }

                  </strong>

                </div>


                <div>

                  <span>
                    Jobs Posted
                  </span>

                  <strong>
                    {jobs.length}
                  </strong>

                </div>

              </div>


              <Link
                to="/recruiter-profile"
                className="profile-edit-btn"
              >

                <FaUserEdit />

                Edit Profile

              </Link>

            </div>

          </div>


        </div>


        {/* =================================================
            RECENT JOBS
        ================================================= */}

        <div className="recent-section">

          <div className="section-header">

            <div>

              <h3>
                Recently Posted Jobs
              </h3>

              <p>
                Track your latest job postings
              </p>

            </div>


            <Link
              to="/my-jobs"
              className="view-all-link"
            >

              View All Jobs

              <FaArrowRight />

            </Link>

          </div>


          <div className="jobs-grid">


            {jobs.length === 0 ? (

              <div className="empty-jobs">

                <FaBriefcase />

                <h4>
                  No Jobs Posted Yet
                </h4>

                <p>
                  Start attracting talented candidates
                  by posting your first job.
                </p>

                <Link
                  to="/post-job"
                  className="header-post-btn"
                >

                  <FaPlus />

                  Post Your First Job

                </Link>

              </div>

            ) : (

              jobs
                .slice(0, 4)
                .map(
                  (job) => (

                    <div
                      className="job-card"
                      key={
                        job.jobPostId
                      }
                    >


                      <div className="job-card-top">

                        <div className="job-icon">

                          <FaBriefcase />

                        </div>


                        <span className="job-status">

                          Active

                        </span>

                      </div>


                      <h4>

                        {
                          job.jobTitle
                        }

                      </h4>


                      <p className="job-company">

                        <FaBuilding />

                        {
                          job.jobCompanyId?.name ||
                          "Company N/A"
                        }

                      </p>


                      <p className="job-location">

                        <FaMapMarkerAlt />

                        {
                          job.jobLocationId?.city ||
                          "Location N/A"
                        }

                        {", "}

                        {
                          job.jobLocationId?.state ||
                          ""
                        }

                      </p>


                      <div className="job-footer">

                        <span>

                          <FaUsers />

                          {
                            job.totalCandidates ||
                            0
                          } Applicants

                        </span>

                      </div>


                      {/* =================================================
                          JOB ACTIONS
                      ================================================= */}

                      <div className="job-actions">

                        <Link

                          to={
                            `/job/${job.jobPostId}`
                          }

                          className="view-job-btn"

                        >

                          <FaEye />

                          View Job

                        </Link>


                        <Link

                          to={
                            `/applicants/${job.jobPostId}`
                          }

                          className="applicants-btn"

                        >

                          <FaUsers />

                          Applicants

                        </Link>

                      </div>


                      {/* =================================================
                          DELETE BUTTON
                      ================================================= */}

                      <button

                        type="button"

                        className="delete-job-btn"

                        onClick={() =>
                          deleteJob(
                            job.jobPostId
                          )
                        }

                        disabled={
                          deletingJobId ===
                          job.jobPostId
                        }

                      >

                        <FaTrash />

                        {
                          deletingJobId ===
                          job.jobPostId
                            ? "Deleting..."
                            : "Delete Job"
                        }

                      </button>


                    </div>

                  )

                )

            )}

          </div>

        </div>


      </main>

    </div>

  );

}


export default RecruiterDashboard;