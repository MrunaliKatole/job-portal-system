import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import API from "../services/api";


function JobDetails() {

  const {
    id
  } = useParams();


  const navigate =
    useNavigate();


  const [
    job,
    setJob
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    applying,
    setApplying
  ] = useState(false);


  const [
    saving,
    setSaving
  ] = useState(false);


  // ==========================================
  // GET LOGIN DATA
  // ==========================================

  const userId =
    localStorage.getItem(
      "userId"
    );


  const storedRole =
    localStorage.getItem(
      "role"
    );


  const userTypeId =
    localStorage.getItem(
      "userTypeId"
    );


  // ==========================================
  // NORMALIZE ROLE
  // ==========================================

  const role =
    storedRole
      ?.trim()
      .toUpperCase()
      .replace(/-/g, "_")
      .replace(/\s+/g, "_");


  // ==========================================
  // CHECK JOB SEEKER
  // ==========================================

  const isJobSeeker =
    role === "JOB_SEEKER" ||
    role === "JOBSEEKER" ||
    role === "JOB_SEEKER";


  // ==========================================
  // CHECK RECRUITER
  // ==========================================

  const isRecruiter =
    role === "RECRUITER";


  // ==========================================
  // LOAD JOB
  // ==========================================

  useEffect(() => {

    loadJob();

  }, [id]);


  const loadJob = async () => {

    try {

      setLoading(
        true
      );


      const response =
        await API.get(
          `/jobs/${id}`
        );


      console.log(
        "JOB DETAILS:",
        response.data
      );


      setJob(
        response.data
      );


    }

    catch (error) {

      console.error(
        "JOB LOAD ERROR:",
        error.response?.data ||
        error.message
      );


      alert(
        "Unable to load job details"
      );

    }

    finally {

      setLoading(
        false
      );

    }

  };


  // ==========================================
  // APPLY JOB
  // ==========================================

  const applyJob = async () => {

    // Check login

    if (
      !userId
    ) {

      alert(
        "Please login first"
      );

      navigate(
        "/login"
      );

      return;

    }


    // Check role

    if (
      !isJobSeeker
    ) {

      alert(
        "Only Job Seeker can apply for jobs"
      );

      return;

    }


    // Check job

    if (
      !job
    ) {

      alert(
        "Job details not available"
      );

      return;

    }


    try {

      setApplying(
        true
      );


      const jobId =
        job.jobPostId ||
        job.id;


      console.log(
        "APPLY USER ID:",
        userId
      );


      console.log(
        "APPLY JOB ID:",
        jobId
      );


      await API.post(
    `/applications/apply/${userId}/${jobId}`
);

      alert(
        "Job Applied Successfully"
      );


    }

    catch (error) {

      console.error(
        "APPLY JOB ERROR:",
        error.response?.data ||
        error.message
      );


      const message =
        typeof error.response?.data ===
        "string"

          ? error.response.data

          : error.response?.data?.message ||

            "Unable to Apply";

      alert(
        message
      );

    }

    finally {

      setApplying(
        false
      );

    }

  };


  // ==========================================
  // SAVE JOB
  // ==========================================

  const saveJob = async () => {

    // Check login

    if (
      !userId
    ) {

      alert(
        "Please login first"
      );

      navigate(
        "/login"
      );

      return;

    }


    // Check role

    if (
      !isJobSeeker
    ) {

      alert(
        "Only Job Seeker can save jobs"
      );

      return;

    }


    if (
      !job
    ) {

      return;

    }


    try {

      setSaving(
        true
      );


      const jobId =
        job.jobPostId ||
        job.id;


      console.log(
        "SAVE USER ID:",
        userId
      );


      console.log(
        "SAVE JOB ID:",
        jobId
      );


      await API.post(
    `/saved-jobs/save/${userId}/${jobId}`
);

      alert(
        "Job Saved Successfully"
      );


    }

    catch (error) {

      console.error(
        "SAVE JOB ERROR:",
        error.response?.data ||
        error.message
      );


      const message =
        typeof error.response?.data ===
        "string"

          ? error.response.data

          : error.response?.data?.message ||

            "Unable to Save Job";


      alert(
        message
      );

    }

    finally {

      setSaving(
        false
      );

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (
    loading
  ) {

    return (

      <div className="container mt-5">

        <h3 className="text-center">

          Loading...

        </h3>

      </div>

    );

  }


  // ==========================================
  // NO JOB
  // ==========================================

  if (
    !job
  ) {

    return (

      <div className="container mt-5">

        <h3 className="text-center">

          Job not found

        </h3>

      </div>

    );

  }


  // ==========================================
  // JOB ID
  // ==========================================

  const jobId =
    job.jobPostId ||
    job.id;


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="container mt-5 mb-5">

      <div className="card shadow p-4">


        {/* ====================================
            JOB TITLE
        ===================================== */}

        <h2>

          {
            job.jobTitle
          }

        </h2>


        {/* ====================================
            COMPANY
        ===================================== */}

        <h4>

          {
            job.jobCompanyId?.name ||
            job.jobCompanyId?.companyName ||
            "Company"
          }

        </h4>


        {/* ====================================
            LOCATION
        ===================================== */}

        <p>

          {
            job.jobLocationId?.city
          }

          {job.jobLocationId?.city &&
            job.jobLocationId?.state &&
            ", "
          }

          {
            job.jobLocationId?.state
          }

        </p>


        {/* ====================================
            SALARY
        ===================================== */}

        <p>

          <b>
            Salary:
          </b>{" "}

          {
            job.salary ||
            "Not specified"
          }

        </p>


        {/* ====================================
            JOB TYPE
        ===================================== */}

        <p>

          <b>
            Job Type:
          </b>{" "}

          {
            job.jobType ||
            "Not specified"
          }

        </p>


        {/* ====================================
            WORK MODE
        ===================================== */}

        <p>

          <b>
            Work Mode:
          </b>{" "}

          {
            job.remote ||
            "Not specified"
          }

        </p>


        {/* ====================================
            DESCRIPTION
        ===================================== */}

        <p>

          {
            job.descriptionOfJob
          }

        </p>


        <hr />


        {/* ====================================
            JOB SEEKER BUTTONS
        ===================================== */}

        {isJobSeeker && (

          <div className="d-flex gap-3 mt-3">


            {/* APPLY */}

            <button

              className="btn btn-success"

              onClick={
                applyJob
              }

              disabled={
                applying
              }

            >

              {
                applying
                  ? "Applying..."
                  : "Apply Now"
              }

            </button>


            {/* SAVE */}

            <button

              className="btn btn-warning"

              onClick={
                saveJob
              }

              disabled={
                saving
              }

            >

              {
                saving
                  ? "Saving..."
                  : "❤️ Save Job"
              }

            </button>


          </div>

        )}


        {/* ====================================
            RECRUITER BUTTON
        ===================================== */}

        {isRecruiter && (

          <button

            className="btn btn-primary mt-3"

            onClick={() =>
              navigate(
                `/applicants/${jobId}`
              )
            }

          >

            View Applicants

          </button>

        )}


        {/* ====================================
            DEBUG INFO
        ===================================== */}

        <div className="mt-4">

          <small className="text-muted">

            Logged User ID:
            {" "}
            {userId || "Not logged in"}

            <br />

            Role:
            {" "}
            {role || "Not available"}

            <br />

            User Type ID:
            {" "}
            {userTypeId || "Not available"}

          </small>

        </div>


      </div>

    </div>

  );

}


export default JobDetails;