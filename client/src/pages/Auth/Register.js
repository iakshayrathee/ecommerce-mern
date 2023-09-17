import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <section>
        <div style={{ minHeight: "100vh" }}>
          <div className="container-fluid h-custom login">
            <div className="row d-flex justify-content-center align-items-center mt-5  vh-100  ">
              <div className="col-md-9 col-lg-6 col-xl-5  ">
                <div className="text-white"></div>
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 blur border border-3 rounded-5 mt-3 border-white  p-4 rounded-5">
                <h1 className="text-center text-white">Register</h1>
                <form onSubmit={handleSubmit}>
                  {/* Email input */}
                  <div className="mb-3">
                    Name
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Name"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    Email
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Email "
                      required
                    />
                  </div>
                  <div className="mb-3">
                    Password
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    Phone No.
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Phone"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    Address
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Address"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    Answer
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="What is your favorite food or dish? "
                      required
                    />
                  </div>
                  <button type="submit" className="btn raise btn-lg w-100">
                    Create Account
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0 text-lg-center">
                    Already have an account?{" "}
                    <a
                      className="link-success"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
