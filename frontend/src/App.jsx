import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";

import RecruiterDashboard from "./pages/RecruiterDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";

import JobSeekerProfile from "./pages/JobSeekerProfile";
import RecruiterProfile from "./pages/Recruiterprofile";

import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import SavedJobs from "./pages/SavedJobs";
import AppliedJobs from "./pages/AppliedJobs";
import Applicants from "./pages/Applicants";

import Profile from "./pages/Profile";
import CandidateProfile from "./pages/CandidateProfile";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ================= AUTHENTICATION ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================= JOBS ================= */}

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/job/:id"
          element={<JobDetails />}
        />


        {/* ================= JOB SEEKER ================= */}

        <Route
          path="/jobseeker-dashboard"
          element={<JobSeekerDashboard />}
        />

        <Route
          path="/jobseeker-profile"
          element={<JobSeekerProfile />}
        />

        <Route
          path="/saved-jobs"
          element={<SavedJobs />}
        />

        <Route
          path="/applied-jobs"
          element={<AppliedJobs />}
        />


        {/* ================= RECRUITER ================= */}

        <Route
          path="/recruiter-dashboard"
          element={<RecruiterDashboard />}
        />

        <Route
          path="/recruiter-profile"
          element={<RecruiterProfile />}
        />

        <Route
          path="/post-job"
          element={<PostJob />}
        />

        <Route
          path="/my-jobs"
          element={<MyJobs />}
        />

        {/* Applicants for a particular job */}
        <Route
          path="/applicants/:id"
          element={<Applicants />}
        />


        {/* ================= CANDIDATE PROFILE ================= */}

        <Route
  path="/candidate-profile/:id"
  element={<CandidateProfile />}
/>


        {/* ================= COMMON PROFILE ================= */}

        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;