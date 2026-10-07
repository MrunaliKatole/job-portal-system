import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});


// =====================================================
// REQUEST INTERCEPTOR
// =====================================================

API.interceptors.request.use(

  (config) => {

    console.log(
      "===================================="
    );

    console.log(
      "API REQUEST:",
      config.method?.toUpperCase(),
      config.url
    );


    // =================================================
    // FORM DATA
    // =================================================

    // If sending FormData, do not manually set
    // Content-Type.
    //
    // Axios automatically creates:
    // multipart/form-data
    // with correct boundary.

    if (
      config.data instanceof FormData
    ) {

      delete config.headers[
        "Content-Type"
      ];

    }


    // =================================================
    // LOGIN / REGISTER
    // =================================================

    if (
      config.url === "/auth/login" ||
      config.url === "/auth/register"
    ) {

      console.log(
        "PUBLIC API REQUEST"
      );

      console.log(
        "===================================="
      );

      return config;
    }


    // =================================================
    // USER DATA
    // =================================================

    const userId =
      localStorage.getItem(
        "userId"
      );

    const email =
      localStorage.getItem(
        "email"
      );

    const role =
      localStorage.getItem(
        "role"
      );


    console.log(
      "USER ID:",
      userId
    );

    console.log(
      "EMAIL:",
      email
    );

    console.log(
      "ROLE:",
      role
    );


    // =================================================
    // DO NOT SEND PASSWORD
    // =================================================
    //
    // We are NOT storing password in localStorage.
    //
    // Therefore:
    //
    // config.auth = ...
    //
    // is removed.
    //
    // Backend endpoints must be permitAll()
    // until JWT or Session authentication
    // is implemented.
    //


    console.log(
      "===================================="
    );


    return config;

  },

  (error) => {

    console.error(
      "REQUEST INTERCEPTOR ERROR:",
      error
    );

    return Promise.reject(
      error
    );
  }

);


// =====================================================
// RESPONSE INTERCEPTOR
// =====================================================

API.interceptors.response.use(

  (response) => {

    console.log(
      "API RESPONSE:",
      response.status,
      response.config.url
    );

    return response;

  },

  (error) => {

    console.error(
      "API ERROR:"
    );

    console.error(
      "STATUS:",
      error.response?.status
    );

    console.error(
      "DATA:",
      error.response?.data
    );

    console.error(
      "URL:",
      error.config?.url
    );


    // =================================================
    // 401
    // =================================================

    if (
      error.response?.status === 401
    ) {

      console.error(
        "401 UNAUTHORIZED"
      );

      console.error(
        "Check Spring Security configuration."
      );

    }


    return Promise.reject(
      error
    );

  }

);


export default API;