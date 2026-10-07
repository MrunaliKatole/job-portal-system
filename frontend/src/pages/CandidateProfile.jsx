import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import API from "../services/api";

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaFilePdf,
  FaArrowLeft,
  FaUser
} from "react-icons/fa";


function CandidateProfile() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [
    profile,
    setProfile
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");


  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {

    if (
      !id ||
      id === "undefined" ||
      id === "null"
    ) {

      setError(
        "Candidate ID is missing."
      );

      setLoading(false);

      return;
    }


    loadProfile();

  }, [id]);


  // =====================================================
  // GET PROFILE
  // =====================================================

  const loadProfile = async () => {

    try {

      setLoading(true);

      setError("");


      const response =
          await API.get(
            `/jobseeker/${id}`
          );


      console.log(
        "CANDIDATE PROFILE:",
        response.data
      );


      setProfile(
        response.data
      );


    } catch (error) {

      console.error(
        "CANDIDATE PROFILE ERROR:",
        error.response?.data ||
        error.message
      );


      setError(
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message ||
            "Unable to load candidate profile."
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

          Loading Candidate Profile...

        </h4>

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <div className="container py-5">

        <div className="alert alert-danger">

          <h5>
            Error
          </h5>

          <p>
            {error}
          </p>


          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >

            <FaArrowLeft className="me-2" />

            Go Back

          </button>

        </div>

      </div>

    );

  }


  // =====================================================
  // PROFILE NOT FOUND
  // =====================================================

  if (!profile) {

    return (

      <div className="container py-5">

        <div className="alert alert-warning">

          Candidate Profile Not Found.

        </div>

      </div>

    );

  }


  // =====================================================
  // USER OBJECT
  // =====================================================

  const user =
      profile.userId ||
      profile.user ||
      null;


  // =====================================================
  // NAME
  // =====================================================

  const firstName =
      profile.firstName ||
      "Candidate";


  const lastName =
      profile.lastName ||
      "";


  // =====================================================
  // EMAIL
  // =====================================================

  const email =
      user?.email ||
      profile.email ||
      "Not Available";


  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const profileImage =

      profile.profilePhoto ||

      profile.profilePhotoUrl ||

      profile.photosImagePath ||

      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        `${firstName} ${lastName}`
      )}&size=180`;


  // =====================================================
  // RESUME URL
  //
  // Resume is stored in resume_data LONGBLOB.
  // Backend endpoint:
  // GET /api/jobseeker/{id}/resume
  // =====================================================

  const resumeUrl =
      `${API.defaults.baseURL}/jobseeker/${id}/resume`;


  // =====================================================
  // RETURN UI
  // =====================================================

  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow-lg border-0">


            {/* ================= HEADER ================= */}

            <div
              className="card-header bg-primary text-white text-center"
            >

              <h3 className="mb-0">

                Candidate Profile

              </h3>

            </div>


            <div className="card-body p-5">


              {/* ================= PROFILE IMAGE ================= */}

              <div className="text-center mb-4">

                <img
                  src={profileImage}
                  width="180"
                  height="180"
                  className="rounded-circle border shadow"
                  alt="Candidate"
                  style={{
                    objectFit: "cover"
                  }}
                />


                <h2 className="mt-3">

                  {firstName} {lastName}

                </h2>


                <p className="text-muted">

                  <FaUser className="me-2" />

                  Job Seeker

                </p>

              </div>


              <hr />


              {/* ================= EMAIL ================= */}

              <p>

                <FaEnvelope
                  className="me-2 text-primary"
                />

                <strong>
                  Email:
                </strong>{" "}

                {email}

              </p>


              {/* ================= CITY ================= */}

              <p>

                <FaMapMarkerAlt
                  className="me-2 text-primary"
                />

                <strong>
                  City:
                </strong>{" "}

                {profile.city ||
                  "N/A"}

              </p>


              {/* ================= STATE ================= */}

              <p>

                <strong>
                  State:
                </strong>{" "}

                {profile.state ||
                  "N/A"}

              </p>


              {/* ================= COUNTRY ================= */}

              <p>

                <strong>
                  Country:
                </strong>{" "}

                {profile.country ||
                  "N/A"}

              </p>


              {/* ================= EMPLOYMENT ================= */}

              <p>

                <strong>
                  Employment Type:
                </strong>{" "}

                {profile.employmentType ||
                  "N/A"}

              </p>


              {/* ================= WORK AUTHORIZATION ================= */}

              <p>

                <strong>
                  Work Authorization:
                </strong>{" "}

                {profile.workAuthorization ||
                  "N/A"}

              </p>


              <hr />


              {/* ================= RESUME ================= */}

              <h5>

                <FaFilePdf
                  className="me-2 text-danger"
                />

                Resume

              </h5>


              {profile.resume ? (

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-2"
                >

                  <FaFilePdf className="me-2" />

                  View Resume

                </a>

              ) : (

                <div className="alert alert-warning mt-2">

                  Resume not uploaded.

                </div>

              )}


              {/* ================= BACK ================= */}

              <div className="mt-4">

                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(-1)}
                >

                  <FaArrowLeft className="me-2" />

                  Back

                </button>

              </div>


            </div>

          </div>

        </div>

      </div>

    </div>

  );

}


export default CandidateProfile;