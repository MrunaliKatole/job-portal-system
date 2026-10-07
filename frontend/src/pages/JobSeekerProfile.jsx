import { useEffect, useState } from "react";
import API from "../services/api";

function JobSeekerProfile() {

  const userId =
    localStorage.getItem("userId");


  // =====================================================
  // PROFILE STATE
  // =====================================================

  const [profile, setProfile] = useState({

    userAccountId:
      userId ? Number(userId) : null,

    firstName: "",
    lastName: "",
    city: "",
    state: "",
    country: "",
    workAuthorization: "",
    employmentType: "",
    resume: "",
    profilePhoto: ""

  });


  const [resumeFile, setResumeFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {

    if (userId) {
      loadProfile();
    }

  }, [userId]);


  const loadProfile = async () => {

    try {

      const response =
        await API.get(
          `/jobseeker/${userId}`
        );

      console.log(
        "PROFILE RESPONSE:",
        response.data
      );


      setProfile({

        userAccountId:
          response.data.userAccountId
          ||
          Number(userId),

        firstName:
          response.data.firstName
          ||
          "",

        lastName:
          response.data.lastName
          ||
          "",

        city:
          response.data.city
          ||
          "",

        state:
          response.data.state
          ||
          "",

        country:
          response.data.country
          ||
          "",

        workAuthorization:
          response.data.workAuthorization
          ||
          "",

        employmentType:
          response.data.employmentType
          ||
          "",

        resume:
          response.data.resume
          ||
          "",

        profilePhoto:
          response.data.profilePhoto
          ||
          ""

      });

    } catch (error) {

      console.error(
        "LOAD PROFILE ERROR:",
        error.response?.data
        ||
        error.message
      );

    }

  };


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setProfile(
      prev => ({

        ...prev,

        [name]: value

      })
    );

  };


  // =====================================================
  // RESUME CHANGE
  // =====================================================

  const handleResumeChange = (e) => {

    const file =
      e.target.files[0];


    if (!file) {
      return;
    }


    if (
      file.type !==
      "application/pdf"
    ) {

      alert(
        "Please upload PDF file only"
      );

      e.target.value = "";

      return;
    }


    if (
      file.size >
      10 * 1024 * 1024
    ) {

      alert(
        "Resume size must be less than 10 MB"
      );

      e.target.value = "";

      return;
    }


    setResumeFile(file);

  };


  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const saveProfile = async () => {

    if (!userId) {

      alert(
        "User ID not found. Please login again."
      );

      return;
    }


    try {

      setLoading(true);


      const formData =
        new FormData();


      const profileData = {

        userAccountId:
          Number(userId),

        firstName:
          profile.firstName || "",

        lastName:
          profile.lastName || "",

        city:
          profile.city || "",

        state:
          profile.state || "",

        country:
          profile.country || "",

        workAuthorization:
          profile.workAuthorization || "",

        employmentType:
          profile.employmentType || "",

        profilePhoto:
          profile.profilePhoto || "",

        resume:
          profile.resume || ""

      };


      console.log(
        "PROFILE DATA SENT:",
        profileData
      );


      formData.append(
        "profile",
        JSON.stringify(profileData)
      );


      if (resumeFile) {

        formData.append(
          "resume",
          resumeFile
        );

      }


      const response =
        await API.post(
          "/jobseeker",
          formData
        );


      console.log(
        "PROFILE SAVED:",
        response.data
      );


      setProfile({

        userAccountId:
          response.data.userAccountId
          ||
          Number(userId),

        firstName:
          response.data.firstName
          ||
          "",

        lastName:
          response.data.lastName
          ||
          "",

        city:
          response.data.city
          ||
          "",

        state:
          response.data.state
          ||
          "",

        country:
          response.data.country
          ||
          "",

        workAuthorization:
          response.data.workAuthorization
          ||
          "",

        employmentType:
          response.data.employmentType
          ||
          "",

        resume:
          response.data.resume
          ||
          "",

        profilePhoto:
          response.data.profilePhoto
          ||
          ""

      });


      setResumeFile(null);


      alert(
        "Profile Saved Successfully!"
      );


    } catch (error) {

      console.error(
        "PROFILE SAVE ERROR:",
        error.response?.data
        ||
        error.message
      );


      alert(
        error.response?.data
        ||
        "Unable To Save Profile"
      );


    } finally {

      setLoading(false);

    }

  };
// =====================================================
// DELETE ACCOUNT
// =====================================================

const deleteAccount = async () => {

  if (!userId) {

    alert(
      "User ID not found. Please login again."
    );

    return;
  }


  const confirmDelete =
    window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );


  if (!confirmDelete) {
    return;
  }


  try {

    await API.delete(
      `/auth/account/${userId}`
    );


    alert(
      "Your account has been deleted successfully."
    );


    // Clear login data

    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role");


    // Redirect to home page

    window.location.href = "/";


  } catch (error) {

    console.error(
      "DELETE ACCOUNT ERROR:",
      error.response?.data ||
      error.message
    );


    alert(
      error.response?.data ||
      "Unable to delete account"
    );

  }

};


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="container py-5">

      <div className="profile-card">

        <h2>
          Job Seeker Profile
        </h2>


        <div className="row">


          {/* LEFT */}

          <div className="col-md-6">

            <label>
              First Name
            </label>

            <input
              className="form-control mb-3"
              name="firstName"
              value={
                profile.firstName
              }
              onChange={
                handleChange
              }
            />


            <label>
              Last Name
            </label>

            <input
              className="form-control mb-3"
              name="lastName"
              value={
                profile.lastName
              }
              onChange={
                handleChange
              }
            />


            <label>
              City
            </label>

            <input
              className="form-control mb-3"
              name="city"
              value={
                profile.city
              }
              onChange={
                handleChange
              }
            />


            <label>
              State
            </label>

            <input
              className="form-control mb-3"
              name="state"
              value={
                profile.state
              }
              onChange={
                handleChange
              }
            />

          </div>


          {/* RIGHT */}

          <div className="col-md-6">

            <label>
              Country
            </label>

            <input
              className="form-control mb-3"
              name="country"
              value={
                profile.country
              }
              onChange={
                handleChange
              }
            />


            <label>
              Work Authorization
            </label>

            <input
              className="form-control mb-3"
              name="workAuthorization"
              value={
                profile.workAuthorization
              }
              onChange={
                handleChange
              }
            />


            <label>
              Employment Type
            </label>

            <select
              className="form-control mb-3"
              name="employmentType"
              value={
                profile.employmentType
              }
              onChange={
                handleChange
              }
            >

              <option value="">
                Select
              </option>

              <option value="Full Time">
                Full Time
              </option>

              <option value="Part Time">
                Part Time
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Remote">
                Remote
              </option>

            </select>


            <label>
              Resume
            </label>

            <input
              type="file"
              accept=".pdf,application/pdf"
              className="form-control mb-3"
              onChange={
                handleResumeChange
              }
            />


            {profile.resume && (

              <div className="mb-3">

                <a
                  href={
                    `http://localhost:8080/api/jobseeker/${userId}/resume`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-success"
                >

                  View Current Resume

                </a>

              </div>

            )}


            <label>
              Profile Photo URL
            </label>

            <input
              className="form-control mb-3"
              name="profilePhoto"
              value={
                profile.profilePhoto
              }
              onChange={
                handleChange
              }
            />

          </div>

        </div>


        <button
          className="btn btn-primary"
          onClick={saveProfile}
          disabled={loading}
        >

          {loading
            ? "Saving..."
            : "Save Profile"
          }

        </button>
        <button
  type="button"
  className="btn btn-danger mt-3"
  onClick={deleteAccount}
  disabled={loading}
>
  Delete Account
</button>

      </div>

    </div>

  );
  
}

export default JobSeekerProfile;