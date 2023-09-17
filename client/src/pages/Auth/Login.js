import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Layout title="Register - Ecommer App">
        <section>
          <div className="container-fluid h-custom login vh-100">
            <div className="row d-flex justify-content-center align-items-center h-100  ">
              <div className="col-md-9 col-lg-6 col-xl-5  ">
                <div className="text-white"></div>
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 blur border border-3 rounded-5   p-5 rounded-5">
                <h1 className="text-center text-white">Login</h1>
                <form onSubmit={handleSubmit}>
                  {/* Email input */}
                  <div className="form-outline mb-4">
                    Email address
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control form-control-lg"
                      placeholder="your@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label
                      className="form-label"
                      htmlFor="form3Example3"
                    ></label>
                  </div>
                  {/* Password input */}
                  <div className="form-outline mb-3">
                    Password
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label
                      className="form-label"
                      htmlFor="form3Example4"
                    ></label>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Checkbox */}
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        defaultValue
                        id="form2Example3"
                      />
                      <label
                        className="form-check-label "
                        htmlFor="form2Example3"
                      >
                        Remember me
                      </label>
                    </div>

                    <a
                      href="#!"
                      className="text-body white"
                      onClick={() => {
                        navigate("/forgot-password");
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="submit"
                      className="btn fill btn-lg w-100"
                      style={{
                        paddingLeft: "2.5rem",
                        paddingRight: "2.5rem",
                      }}
                    >
                      Login
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0 text-lg-center">
                      Don't have an account?{" "}
                      <a
                        className="link-danger"
                        onClick={() => {
                          navigate("/register");
                        }}
                      >
                        Create account
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Login;
