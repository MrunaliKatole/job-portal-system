import { useState } from "react";
import API from "../services/api";

function PostJob() {

  const [jobTitle, setJobTitle] = useState("");
  const [descriptionOfJob, setDescriptionOfJob] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [remote, setRemote] = useState("");

  const postJob = async (e) => {

    e.preventDefault();

    try {

      await API.post("/jobs", {

        jobTitle,
        descriptionOfJob,
        salary,
        jobType,
        remote

      });

      alert("Job Posted Successfully");

      setJobTitle("");
      setDescriptionOfJob("");
      setSalary("");
      setJobType("");
      setRemote("");

    } catch (error) {

      console.log(error);

      alert("Error Posting Job");

    }

  };

  return (

    <div className="container mt-5">

      <div className="card shadow-lg p-4">

        <h2 className="text-center mb-4">
          Add New Job
        </h2>

        <form onSubmit={postJob}>

          <div className="mb-3">

            <label className="form-label">
              Job Title
            </label>

            <input
              type="text"
              className="form-control"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Job Description
            </label>

            <textarea
              className="form-control"
              rows="5"
              value={descriptionOfJob}
              onChange={(e) => setDescriptionOfJob(e.target.value)}
              required
            ></textarea>

          </div>

          <div className="mb-3">

            <label className="form-label">
              Salary
            </label>

            <input
              type="text"
              className="form-control"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Job Type
            </label>

            <select
              className="form-select"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
            </select>

          </div>

          <div className="mb-4">

            <label className="form-label">
              Work Mode
            </label>

            <select
              className="form-select"
              value={remote}
              onChange={(e) => setRemote(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option>Office-Only</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>

          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Post Job
          </button>

        </form>

      </div>

    </div>

  );

}

export default PostJob;