import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function SavedJobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId");


    useEffect(() => {

        if (userId) {
            loadSavedJobs();
        } else {
            setLoading(false);
        }

    }, [userId]);


    const loadSavedJobs = async () => {

        try {

            setLoading(true);

            console.log(
                "Loading saved jobs for user:",
                userId
            );

            // IMPORTANT:
            // Backend endpoint:
            // GET /api/saved-jobs/user/{userId}

            const response = await API.get(
                `/saved-jobs/user/${userId}`
            );

            console.log(
                "SAVED JOBS RESPONSE:",
                response.data
            );

            setJobs(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(
                "LOAD SAVED JOBS ERROR:",
                error.response?.data || error.message
            );

            setJobs([]);

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="container py-5">

                <h3>
                    Loading Saved Jobs...
                </h3>

            </div>

        );

    }


    return (

        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    Saved Jobs
                </h2>

                <span className="badge bg-warning text-dark fs-6">
                    {jobs.length} Saved
                </span>

            </div>


            {!userId ? (

                <div className="alert alert-warning">
                    Please login first.
                </div>

            ) : jobs.length === 0 ? (

                <div className="alert alert-info">
                    You have not saved any job yet.
                </div>

            ) : (

                <div className="row">

                    {jobs.map(
                        (item) => {

                            const job =
                                item.job;

                            const jobId =
                                job?.jobPostId ||
                                job?.id;

                            return (

                                <div
                                    className="col-md-6 mb-4"
                                    key={item.id}
                                >

                                    <div className="card shadow h-100">

                                        <div className="card-body">

                                            <h4 className="card-title">

                                                {
                                                    job?.jobTitle ||
                                                    "Job Title Not Available"
                                                }

                                            </h4>


                                            <p>

                                                <strong>
                                                    Company:
                                                </strong>{" "}

                                                {
                                                    job?.jobCompanyId?.name ||
                                                    job?.jobCompanyId?.companyName ||
                                                    "Company Not Available"
                                                }

                                            </p>


                                            <p>

                                                <strong>
                                                    Location:
                                                </strong>{" "}

                                                {
                                                    job?.jobLocationId?.city ||
                                                    ""
                                                }

                                                {
                                                    job?.jobLocationId?.city &&
                                                    job?.jobLocationId?.state
                                                        ? ", "
                                                        : ""
                                                }

                                                {
                                                    job?.jobLocationId?.state ||
                                                    ""
                                                }

                                            </p>


                                            <p>

                                                <strong>
                                                    Salary:
                                                </strong>{" "}

                                                {
                                                    job?.salary ||
                                                    "Not specified"
                                                }

                                            </p>


                                            {jobId && (

                                                <Link
                                                    to={`/job/${jobId}`}
                                                    className="btn btn-primary"
                                                >
                                                    View Details
                                                </Link>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </div>

    );

}

export default SavedJobs;