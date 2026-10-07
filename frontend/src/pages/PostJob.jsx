import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function PostJob() {

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [job, setJob] = useState({

    jobTitle: "",
    descriptionOfJob: "",
    salary: "",
    jobType: "",
    remote: "",

    jobCompanyId: {
      id: 1
    },

    jobLocationId: {
      id: 1
    }

  });

  const [loading, setLoading] = useState(false);


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setJob((prev) => ({

      ...prev,

      [name]: value

    }));

  };


  // ==========================================
  // POST JOB
  // ==========================================

  const postJob = async (e) => {

    e.preventDefault();

    if (!userId) {

      alert("Please login as Recruiter first");

      navigate("/login");

      return;
    }

    try {

      setLoading(true);

      console.log(
        "Posting job for recruiter:",
        userId
      );

      const response = await API.post(

        `/jobs?userId=${userId}`,

        job

      );

      console.log(
        "JOB POST RESPONSE:",
        response.data
      );

      alert(
        "Job Posted Successfully!"
      );

      // Reset form

      setJob({

        jobTitle: "",
        descriptionOfJob: "",
        salary: "",
        jobType: "",
        remote: "",

        jobCompanyId: {
          id: 1
        },

        jobLocationId: {
          id: 1
        }

      });

      // Go to My Jobs

      navigate("/my-jobs");

    } catch (error) {

      console.error(
        "POST JOB ERROR:",
        error.response?.data ||
        error.message
      );

      if (
        error.response?.data?.message
      ) {

        alert(
          error.response.data.message
        );

      } else {

        alert(
          "Unable To Post Job"
        );

      }

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="container py-5">

      <div
        className="row justify-content-center"
      >

        <div className="col-lg-8">

          <div className="card shadow-lg p-4">

            <h2 className="text-center mb-4">

              Post New Job

            </h2>


            <form
              onSubmit={postJob}
            >


              {/* ================= JOB TITLE ================= */}

              <div className="mb-3">

                <label className="form-label">

                  Job Title

                </label>

                <input

                  type="text"

                  className="form-control"

                  name="jobTitle"

                  value={
                    job.jobTitle
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Example: Java Full Stack Developer"

                  required

                />

              </div>


              {/* ================= DESCRIPTION ================= */}

              <div className="mb-3">

                <label className="form-label">

                  Job Description

                </label>

                <textarea

                  className="form-control"

                  rows="6"

                  name="descriptionOfJob"

                  value={
                    job.descriptionOfJob
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter complete job description..."

                  required

                />

              </div>


              {/* ================= SALARY ================= */}

              <div className="mb-3">

                <label className="form-label">

                  Salary

                </label>

                <input

                  type="text"

                  className="form-control"

                  name="salary"

                  value={
                    job.salary
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Example: ₹8 LPA"

                  required

                />

              </div>


              {/* ================= JOB TYPE ================= */}

              <div className="mb-3">

                <label className="form-label">

                  Job Type

                </label>

                <select

                  className="form-select"

                  name="jobType"

                  value={
                    job.jobType
                  }

                  onChange={
                    handleChange
                  }

                  required

                >

                  <option value="">

                    Select Job Type

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

                </select>

              </div>


              {/* ================= WORK MODE ================= */}

              <div className="mb-4">

                <label className="form-label">

                  Work Mode

                </label>

                <select

                  className="form-select"

                  name="remote"

                  value={
                    job.remote
                  }

                  onChange={
                    handleChange
                  }

                  required

                >

                  <option value="">

                    Select Work Mode

                  </option>

                  <option value="Office-Only">

                    Office-Only

                  </option>

                  <option value="Hybrid">

                    Hybrid

                  </option>

                  <option value="Remote">

                    Remote

                  </option>

                </select>

              </div>


              {/* ================= BUTTON ================= */}

              <button

                type="submit"

                className="btn btn-primary w-100"

                disabled={loading}

              >

                {loading
                  ? "Posting Job..."
                  : "Post Job"
                }

              </button>


            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default PostJob;