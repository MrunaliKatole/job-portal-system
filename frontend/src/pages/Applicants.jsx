import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import API from "../services/api";

import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFilePdf,
  FaEye
} from "react-icons/fa";


function Applicants() {

  const { id } = useParams();

  const [applicants, setApplicants] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =====================================================
  // LOAD APPLICANTS
  // =====================================================

  useEffect(() => {

    if (
      !id ||
      id === "undefined"
    ) {

      setError(
        "Job ID is missing."
      );

      setLoading(false);

      return;
    }

    loadApplicants();

  }, [id]);


  const loadApplicants = async () => {

    try {

      setLoading(true);

      setError("");


      const response =
        await API.get(
          `/applications/job/${id}`
        );


      console.log(
        "========== APPLICANTS RESPONSE =========="
      );

      console.log(
        JSON.stringify(
          response.data,
          null,
          2
        )
      );

      console.log(
        "=========================================="
      );


      if (
        Array.isArray(
          response.data
        )
      ) {

        setApplicants(
          response.data
        );

      } else {

        setApplicants([]);

      }


    } catch (err) {

      console.error(
        "APPLICANTS ERROR:",
        err.response?.data ||
        err.message
      );


      setError(
        typeof err.response?.data === "string"
          ? err.response.data
          : "Unable to load applicants."
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

      <div className="container py-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        />

        <h4 className="mt-3">
          Loading Applicants...
        </h4>

      </div>

    );
  }


  // =====================================================
  // MAIN UI
  // =====================================================

  return (

    <div className="container py-5">


      {/* HEADER */}

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
            Job Applicants
          </h2>

          <p className="text-muted">

            Candidates who applied
            for this job

          </p>

        </div>


        <Link
          to="/my-jobs"
          className="btn btn-outline-primary"
        >

          Back to My Jobs

        </Link>

      </div>


      {/* ERROR */}

      {error && (

        <div className="alert alert-danger">

          {error}

        </div>

      )}


      {/* NO APPLICANTS */}

      {!error &&
        applicants.length === 0 && (

          <div className="alert alert-info">

            <h5>
              No Applicants Yet
            </h5>

            <p className="mb-0">

              No candidate has applied
              for this job yet.

            </p>

          </div>

        )
      }


      {/* APPLICANTS */}

      <div className="row">

        {applicants.map(
          (
            applicant,
            index
          ) => {


            // =================================================
            // PROFILE
            // =================================================

            const profile =
              applicant.jobSeekerProfile ||
              {};


            // =================================================
            // USER
            // =================================================

            const user =
              applicant.userId ||
              {};


            // =================================================
            // CANDIDATE ID
            // =================================================

            const profileId =
              profile.userAccountId ||
              user.userId ||
              null;


            // =================================================
            // NAME
            // =================================================

            const firstName =
              profile.firstName ||
              "Candidate";


            const lastName =
              profile.lastName ||
              "";


            const fullName =
              `${firstName} ${lastName}`.trim();


            // =================================================
            // EMAIL
            // =================================================

            const email =
              user.email ||
              "Not Available";


            // =================================================
            // PROFILE PHOTO
            // =================================================

            const profileImage =

              profile.profilePhoto &&
              profileId

                ? `http://localhost:8080/photos/jobseeker/${profileId}/${profile.profilePhoto}`

                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    fullName
                  )}&size=100`;


            // =================================================
            // RESUME
            //
            // resumeData exists in database
            // =================================================

            const hasResume =
              profile.resumeData &&
              profile.resumeData.length > 0;


            const resumeUrl =
              profileId && hasResume

                ? `http://localhost:8080/api/jobseeker/${profileId}/resume`

                : null;


            return (

              <div
                className="col-lg-6 mb-4"
                key={
                  applicant.id ||
                  index
                }
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


                    {/* PROFILE HEADER */}

                    <div
                      className="
                        d-flex
                        align-items-center
                        mb-3
                      "
                    >

                      <img
                        src={profileImage}
                        width="80"
                        height="80"
                        className="
                          rounded-circle
                          me-3
                          border
                        "
                        alt="Candidate"
                        style={{
                          objectFit:
                            "cover"
                        }}
                      />


                      <div>

                        <h4 className="mb-1">

                          {fullName}

                        </h4>


                        <p className="text-muted mb-0">

                          Job Seeker

                        </p>

                      </div>

                    </div>


                    <hr />


                    {/* EMAIL */}

                    <p>

                      <FaEnvelope
                        className="
                          me-2
                          text-primary
                        "
                      />

                      <b>
                        Email:
                      </b>{" "}

                      {email}

                    </p>


                    {/* LOCATION */}

                    <p>

                      <FaMapMarkerAlt
                        className="
                          me-2
                          text-primary
                        "
                      />

                      <b>
                        Location:
                      </b>{" "}

                      {profile.city ||
                        "N/A"}

                      {profile.state
                        ? `, ${profile.state}`
                        : ""
                      }

                      {profile.country
                        ? `, ${profile.country}`
                        : ""
                      }

                    </p>


                    {/* EMPLOYMENT */}

                    <p>

                      <FaUser
                        className="
                          me-2
                          text-primary
                        "
                      />

                      <b>
                        Employment Type:
                      </b>{" "}

                      {profile.employmentType ||
                        "N/A"}

                    </p>


                    {/* WORK AUTHORIZATION */}

                    <p>

                      <b>
                        Work Authorization:
                      </b>{" "}

                      {profile.workAuthorization ||
                        "N/A"}

                    </p>


                    <hr />


                    {/* BUTTONS */}

                    <div
                      className="
                        d-flex
                        gap-2
                        flex-wrap
                        mt-3
                      "
                    >


                      {/* VIEW PROFILE */}

                      {profileId ? (

                        <Link
                          to={
                            `/candidate-profile/${profileId}`
                          }
                          className="
                            btn
                            btn-outline-primary
                          "
                        >

                          <FaEye
                            className="me-2"
                          />

                          View Profile

                        </Link>

                      ) : (

                        <button
                          className="
                            btn
                            btn-outline-secondary
                          "
                          disabled
                        >

                          Candidate ID Missing

                        </button>

                      )}


                      {/* VIEW RESUME */}

                      {resumeUrl ? (

                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            btn
                            btn-primary
                          "
                        >

                          <FaFilePdf
                            className="me-2"
                          />

                          View Resume

                        </a>

                      ) : (

                        <span
                          className="
                            text-muted
                            align-self-center
                          "
                        >

                          Resume not uploaded

                        </span>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            );

          }
        )}

      </div>

    </div>

  );
}


export default Applicants;