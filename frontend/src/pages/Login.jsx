import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import API from "../services/api";

import "../styles/login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);


  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email.trim() || !password.trim()) {

      alert("Email and password are required");

      return;
    }

    setLoading(true);

    try {

      const response =
        await API.post(
          "/auth/login",
          {
            email: email.trim(),
            password: password
          }
        );


      const user = response.data;


      console.log(
        "================================"
      );

      console.log(
        "LOGIN RESPONSE:",
        user
      );

      console.log(
        "================================"
      );


      /*
       * USER ID
       */

      const userId =
        user.userId ??
        user.id;


      /*
       * USER TYPE ID
       *
       * 1 = RECRUITER
       * 2 = JOB SEEKER
       */

      let userTypeId = null;


      if (
        user.userTypeId &&
        typeof user.userTypeId === "object"
      ) {

        userTypeId =
          user.userTypeId.userTypeId ??
          user.userTypeId.id;

      }

      else if (
        user.userTypeId !== null &&
        user.userTypeId !== undefined
      ) {

        userTypeId =
          user.userTypeId;

      }


      userTypeId =
        Number(userTypeId);


      /*
       * ROLE
       *
       * IMPORTANT:
       *
       * 1 = RECRUITER
       * 2 = JOB_SEEKER
       */

      let role = "";


      if (userTypeId === 1) {

        role = "RECRUITER";

      }

      else if (userTypeId === 2) {

        role = "JOB_SEEKER";

      }


      /*
       * DEBUG
       */

      console.log(
        "USER ID:",
        userId
      );

      console.log(
        "USER TYPE ID:",
        userTypeId
      );

      console.log(
        "FINAL ROLE:",
        role
      );


      /*
       * VALIDATE USER ID
       */

      if (!userId) {

        alert(
          "User ID not received from server."
        );

        return;
      }


      /*
       * VALIDATE ROLE
       */

      if (!role) {

        alert(
          "Invalid user type: " +
          userTypeId
        );

        return;
      }


      /*
       * SAVE LOGIN DATA
       */

      localStorage.setItem(
        "userId",
        String(userId)
      );


      localStorage.setItem(
        "email",
        user.email ||
        email.trim()
      );
      localStorage.setItem(
  "password",
  password
);


      localStorage.setItem(
        "role",
        role
      );


      localStorage.setItem(
        "userTypeId",
        String(userTypeId)
      );


      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      /*
       * NAVIGATION
       */

      if (role === "RECRUITER") {

        navigate(
          "/recruiter-dashboard"
        );

      }

      else if (role === "JOB_SEEKER") {

        navigate(
          "/jobseeker-dashboard"
        );

      }

    }

    catch (error) {

      console.error(
        "LOGIN ERROR:",
        error.response?.data ||
        error.message
      );


      let message =
        "Invalid email or password";


      if (
        typeof error.response?.data === "string"
      ) {

        message =
          error.response.data;

      }

      else if (
        error.response?.data?.message
      ) {

        message =
          error.response.data.message;

      }

      else if (
        error.response?.data?.error
      ) {

        message =
          error.response.data.error;

      }


      alert(message);

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="login-page">

      <div className="login-container">


        <div className="login-left">

          <div className="login-left-content">

            <h1>

              Welcome Back to <br />

              <span>
                JobPortal
              </span>

            </h1>


            <p>

              Login to continue your journey
              and find the perfect opportunity
              that matches your skills.

            </p>


            <div className="login-features">

              <div className="feature-item">

                ✓ 10,000+ Active Jobs

              </div>


              <div className="feature-item">

                ✓ Top Companies Hiring

              </div>


              <div className="feature-item">

                ✓ Easy Application Process

              </div>

            </div>

          </div>

        </div>


        <div className="login-right">

          <div className="login-card">

            <h2>
              Login
            </h2>


            <p className="login-subtitle">

              Enter your credentials
              to continue

            </p>


            <form
              onSubmit={handleLogin}
            >


              <div className="form-group">

                <label>
                  Email Address
                </label>


                <div className="input-with-icon">

                  <FaEnvelope
                    className="input-icon"
                  />


                  <input

                    type="email"

                    placeholder="Enter your email"

                    value={email}

                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }

                    required

                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Password
                </label>


                <div className="input-with-icon">

                  <FaLock
                    className="input-icon"
                  />


                  <input

                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }

                    placeholder="Enter your password"

                    value={password}

                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }

                    required

                  />


                  <span

                    className="password-toggle"

                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }

                  >

                    {

                      showPassword

                        ? <FaEyeSlash />

                        : <FaEye />

                    }

                  </span>

                </div>

              </div>


              <div className="login-options">

                <label
                  className="remember-me"
                >

                  <input
                    type="checkbox"
                  />

                  Remember me

                </label>


              </div>


              <button

                type="submit"

                className="login-submit-btn"

                disabled={loading}

              >

                {

                  loading

                    ? "Logging in..."

                    : "Login"

                }

              </button>

            </form>


            <div className="login-footer">

              Don't have an account?{" "}

              <Link
                to="/register"
              >

                Register now

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;