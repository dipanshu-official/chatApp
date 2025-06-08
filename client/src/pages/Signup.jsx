import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    const { fullname, email, password, confirmpassword } = signupData;

    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      

      const result = await signup({ fullname, email, password });

      console.log("Signup result:", result);

      if (result.success) {
        // User is now logged in automatically, navigate to dashboard/home
        navigate("/login"); // or wherever you want logged-in users to go
      } else {
        setError(result.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="border border-black px-6 py-2 rounded-md space-y-3 w-96"
        >
          <h1 className="text-2xl items-center text-blue-600 font-bold">
            Messenger
          </h1>

          <h2 className="text-2xl items-center">
            Create a new{" "}
            <span className="text-blue-600 font-semibold">Account</span>
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Fullname */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="fullname"
              value={signupData.fullname}
              onChange={handleChange}
              className="grow"
              placeholder="Fullname"
              required
              disabled={loading}
            />
          </label>

          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              className="grow"
              placeholder="Email"
              required
              disabled={loading}
            />
          </label>

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
              className="grow"
              placeholder="Password"
              required
              disabled={loading}
            />
          </label>

          {/*Confirm Password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="confirmpassword"
              value={signupData.confirmpassword}
              onChange={handleChange}
              className="grow"
              placeholder="Confirm Password"
              required
              disabled={loading}
            />
          </label>

          {/* Text & Button */}
          <div className="flex justify-center">
            <input
              type="submit"
              value={loading ? "Creating Account..." : "Signup"}
              className="text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={loading}
            />
          </div>
          <p>
            Have any Account?{" "}
            <Link
              to={"/login"}
              className="text-blue-500 underline cursor-pointer ml-1"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
