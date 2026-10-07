import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function AppliedJobs() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId");

    useEffect(() => {

        if (userId) {
            loadApplications();
        } else {
            setLoading(false);
        }

    }, [userId]);


    const loadApplications = async () => {

        try {

            setLoading(true);

            console.log(
                "Loading applied jobs for user:",
                userId
            );

            // IMPORTANT:
            // Backend endpoint:
            // GET /api/applications/user/{userId}

            const response = await API.get(
                `/applications/user/${userId}`
            );

            console.log(
                "APPLIED JOBS RESPONSE:",
                response.data
            );

            setApplications(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(
                "APPLIED JOBS ERROR:",
                error.response?.data || error.message
            );

            setApplications([]);

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (
            <div className="container py-5">
                <h3>Loading Applied Jobs...</h3>
            </div>
        );

    }


    return (

        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    My Applied Jobs
                </h2>

                <span className="badge bg-success fs-6">
                    {applications.length} Applied
                </span>

            </div>


            {!userId ? (

                <div className="alert alert-warning">
                    Please login first.
                </div>

            ) : applications.length === 0 ? (

                <div className="alert alert-info">
                    You have not applied for any job yet.
                </div>

            ) : (

                <div className="row">

                    {applications.map(
                        (application) => {

                            const job =
                                application.job;

                            const jobId =
                                job?.jobPostId ||
                                job?.id;

                            return (

                                <div
                                    className="col-md-6 mb-4"
                                    key={
                                        application.id
                                    }
                                >

                                    <div className="card shadow h-100">

                                        <div className="card-body">

                                            <h4 className="card-title">

                                                {
                                                    job?.jobTitle ||
                                                    "Job Title Not Available"
                                                }

                                            </h4>


                                            <p className="mb-2">

                                                <strong>
                                                    Company:
                                                </strong>{" "}

                                                {
                                                    job?.jobCompanyId?.name ||
                                                    job?.jobCompanyId?.companyName ||
                                                    "Company Not Available"
                                                }

                                            </p>


                                            <p className="mb-2">

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


                                            <p className="mb-2">

                                                <strong>
                                                    Salary:
                                                </strong>{" "}

                                                {
                                                    job?.salary ||
                                                    "Not specified"
                                                }

                                            </p>


                                            <p className="mb-3">

                                                <strong>
                                                    Applied On:
                                                </strong>{" "}

                                                {
                                                    application.applyDate
                                                        ? new Date(
                                                            application.applyDate
                                                        ).toLocaleString()
                                                        : "Date not available"
                                                }

                                            </p>


                                            {jobId && (

                                                <Link
                                                    to={`/job/${jobId}`}
                                                    className="btn btn-primary"
                                                >
                                                    View Job
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

export default AppliedJobs;