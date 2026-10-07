import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import API from "../services/api";

import {
  FaBriefcase,
  FaUsers,
  FaMapMarkerAlt,
  FaBuilding,
  FaEye
} from "react-icons/fa";


function MyJobs() {

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  const userId =
    localStorage.getItem("userId");


  // =====================================================
  // LOAD RECRUITER JOBS
  // =====================================================

  useEffect(() => {

    loadJobs();

  }, []);


  const loadJobs = async () => {

    if (!userId) {

      setError(
        "Please login as Recruiter first."
      );

      setLoading(false);

      return;
    }


    try {

      setLoading(true);

      setError("");


      const response =
        await API.get(
          `/jobs/recruiter/${userId}`
        );


      console.log(
        "========== MY JOBS RESPONSE =========="
      );

      console.log(
        JSON.stringify(
          response.data,
          null,
          2
        )
      );

      console.log(
        "======================================"
      );


      if (
        Array.isArray(
          response.data
        )
      ) {

        setJobs(
          response.data
        );

      } else {

        setJobs([]);

      }


    } catch (err) {

      console.error(
        "MY JOBS ERROR:",
        err.response?.data ||
        err.message
      );


      setError(
        err.response?.data ||
        "Unable to load your jobs."
      );


    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="container py-5">

        <div className="text-center">

          <div
            className="spinner-border text-primary"
            role="status"
          />

          <h3 className="mt-3">

            Loading Your Jobs...

          </h3>

        </div>

      </div>

    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="container py-5">


      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          d-flex
          justify-content-between
          align-items-center
          mb-4
        "
      >

        <div>

          <h2>

            My Posted Jobs

          </h2>

          <p className="text-muted">

            Manage all jobs posted by you

          </p>

        </div>


        <Link
          to="/post-job"
          className="btn btn-primary"
        >

          + Post New Job

        </Link>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="alert alert-danger">

          {error}

        </div>

      )}


      {/* =================================================
          NO JOBS
      ================================================= */}

      {!error &&
        jobs.length === 0 && (

          <div
            className="alert alert-info"
          >

            <h5>

              No Jobs Posted Yet

            </h5>

            <p>

              You have not posted any job yet.

            </p>


            <Link
              to="/post-job"
              className="btn btn-primary"
            >

              Post Your First Job

            </Link>

          </div>

        )
      }


      {/* =================================================
          JOB CARDS
      ================================================= */}

      <div className="row">

        {jobs.map((job) => (

          <div
            className="col-lg-6 mb-4"
            key={job.jobPostId}
          >

            <div
              className="
                card
                shadow-sm
                h-100
                border-0
              "
            >

              <div className="card-body">


                {/* JOB TITLE */}

                <h4>

                  <FaBriefcase
                    className="me-2"
                  />

                  {job.jobTitle ||
                    "Untitled Job"}

                </h4>


                <hr />


                {/* COMPANY */}

                <p>

                  <FaBuilding
                    className="me-2"
                  />

                  <b>
                    Company:
                  </b>{" "}

                  {job.name ||
                    "Company"}

                </p>


                {/* LOCATION */}

                <p>

                  <FaMapMarkerAlt
                    className="me-2"
                  />

                  <b>
                    Location:
                  </b>{" "}

                  {job.city ||
                    "N/A"}

                  {job.state
                    ? `, ${job.state}`
                    : ""
                  }

                  {job.country
                    ? `, ${job.country}`
                    : ""
                  }

                </p>


                {/* TOTAL APPLICANTS */}

                <div
                  className="
                    alert
                    alert-success
                    d-flex
                    align-items-center
                  "
                >

                  <FaUsers
                    className="me-2"
                  />

                  <b>

                    Total Applicants:

                  </b>{" "}

                  {Number(
                    job.totalCandidates || 0
                  )}

                </div>


                {/* BUTTONS */}

                <div
                  className="
                    d-flex
                    gap-2
                    flex-wrap
                  "
                >


                  {/* VIEW JOB */}

                  <Link
                    to={`/job/${job.jobPostId}`}
                    className="
                      btn
                      btn-outline-primary
                    "
                  >

                    <FaEye
                      className="me-2"
                    />

                    View Job

                  </Link>


                  {/* VIEW APPLICANTS */}

                  <Link
                    to={`/applicants/${job.jobPostId}`}
                    className="
                      btn
                      btn-success
                    "
                  >

                    <FaUsers
                      className="me-2"
                    />

                    View Applicants

                  </Link>


                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}


export default MyJobs;