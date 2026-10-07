import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaHeart,
  FaBuilding,
  FaBriefcase
} from "react-icons/fa";

import API from "../services/api";
import "../styles/jobs.css";


function Jobs() {

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    loadJobs();

  }, []);


  const loadJobs = async () => {

    try {

      const response = await API.get("/jobs");

      console.log("JOBS RESPONSE:", response.data);


    
      if (Array.isArray(response.data)) {

        setJobs(response.data);

      } else {

        console.error(
          "Expected jobs array but received:",
          response.data
        );

        setJobs([]);

      }

    } catch (error) {

      console.log(
        "ERROR LOADING JOBS:",
        error.response?.data || error.message
      );

      setJobs([]);

      alert("Error loading jobs");

    } finally {

      setLoading(false);

    }

  };
const saveJob = async (jobId) => {

    const userId =
        localStorage.getItem(
            "userId"
        );


    const role =
        localStorage.getItem(
            "role"
        );


    if (!userId) {

        alert(
            "Please login first"
        );

        return;

    }


    if (
        role !==
        "JOB_SEEKER"
    ) {

        alert(
            "Only Job Seeker can save jobs"
        );

        return;

    }


    try {

        await API.post(

            `/saved-jobs/${userId}/${jobId}`

        );


        alert(
            "Job Saved Successfully"
        );


    } catch (error) {

        console.error(

            "SAVE JOB ERROR:",

            error.response?.data ||

            error.message

        );


        alert(

            error.response?.data ||

            "Error Saving Job"

        );

    }

};



  const filteredJobs = jobs.filter(

    (job) =>

      job.jobTitle

        ?.toLowerCase()

        .includes(

          search.toLowerCase()

        )

  );


  return (

    <div className="jobs-page">

      <div className="container">


        <div className="jobs-banner">

          <h1>

            Find Your Dream Job

          </h1>


          <p>

            Discover thousands of verified opportunities

          </p>


          <div className="search-area">

            <div className="search-box2">

              <FaSearch />


              <input

                type="text"

                placeholder="Search jobs..."

                value={search}

                onChange={(e) =>

                  setSearch(e.target.value)

                }

              />

            </div>

          </div>

        </div>


        <div className="row mt-5">


          <div className="col-lg-3">

            <div className="filter-card">

              <h4>

                Filters

              </h4>


              <hr />


              <p>

                📍 Location

              </p>


              <p>

                💼 Full Time

              </p>


              <p>

                🏠 Remote

              </p>


              <p>

                💰 Salary

              </p>


              <p>

                ⭐ Experience

              </p>

            </div>

          </div>


          <div className="col-lg-9">


            {loading ? (

              <h4>

                Loading jobs...

              </h4>

            ) : filteredJobs.length === 0 ? (

              <h4>

                No jobs found

              </h4>

            ) : (

              <div className="row">


                {filteredJobs.map(

                  (job) => (

                    <div

                      className="col-md-6 mb-4"

                      key={job.jobPostId}

                    >


                      <div className="job-card">


                        <div className="company-circle">

                          {job.jobCompanyId

                            ?.name

                            ?.charAt(0)

                            || "C"}

                        </div>


                        <h4 className="mt-3">

                          {job.jobTitle}

                        </h4>


                        <h6 className="text-primary">

                          <FaBuilding

                            className="me-2"

                          />


                          {job.jobCompanyId

                            ?.name

                            || "Company"}

                        </h6>


                        <p>

                          <FaMapMarkerAlt

                            className="me-2 text-danger"

                          />


                          {job.jobLocationId

                            ?.city

                            || ""}


                          {job.jobLocationId

                            ?.state

                            && ", "}


                          {job.jobLocationId

                            ?.state

                            || ""}

                        </p>


                        <div className="job-tags">


                          <span className="salary-tag">

                            <FaMoneyBillWave

                              className="me-1"

                            />


                            {job.salary

                              || "Not Specified"}

                          </span>


                          <span className="type-tag">

                            <FaBriefcase

                              className="me-1"

                            />


                            {job.jobType

                              || "Job"}

                          </span>

                        </div>


                        <p className="mt-3 text-muted">

                          {job.descriptionOfJob

                            ?.substring(

                              0,

                              120

                            )

                            || "No description available"}

                          ...

                        </p>


                        <div className="job-buttons">


                          <button

                            className="save-btn"

                            onClick={() =>

                              saveJob(

                                job.jobPostId

                              )

                            }

                          >

                            <FaHeart />

                            Save

                          </button>


                          <Link

                            to={`/job/${job.jobPostId}`}

                            className="details-btn"

                          >

                            View Details

                          </Link>


                        </div>


                      </div>


                    </div>

                  )

                )}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}


export default Jobs;