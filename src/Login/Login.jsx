import React, { useState } from "react";
import logo from "../images/notesInfo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Circles } from "react-loader-spinner";

export default function Login() {
  const [successMsg, setSuccessMsg] = useState(null);
  const [erorrMsg, setErorrMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function onSubmit(values) {
    setLoading(true);
    await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", values)
      .then(({ data }) => {
        setSuccessMsg(data?.msg);
        localStorage.setItem("token", data?.token);
        navigate("/home");
        setLoading(false);
      })
      .catch((err) => {
        setErorrMsg(err?.response.data.msg);
      });
  }

  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email").required("Email is Required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      )
      .required("Password is Required"),
  });

  const myFormik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit,
  });

  function clearMsg() {
    setSuccessMsg(null);
    setErorrMsg(null);
  }

  return (
    <>
      {/* <div className='fixed-top d-flex w-100 me-auto ps-5 '>
            <div >
                <img src={logo} alt="logo" className='w-50' />
            </div>
        </div>
        <div className="container">
            <div class="row">
                <div className="col-lg-7">

                </div>
            </div>
        </div> */}
      <section className="login auth">
        <div className="fixed-top d-flex w-100 me-auto ps-5  ">
          <div className="logo">
            <img src={logo} alt="logo" className="w-50" />
          </div>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center vh-100 layer">
            <div className="col-md-7  ">
              <form
                className="form p-5 text-white rounded-4 fromLayer"
                onSubmit={myFormik.handleSubmit}
              >
                <h2 className="text-center">Login Now</h2>
                <input
                  type="email"
                  className="form-control input"
                  placeholder="Email"
                  id="email"
                  name="email"
                  onChange={myFormik.handleChange}
                  onBlur={myFormik.handleBlur}
                  onFocus={clearMsg}
                />
                {myFormik.touched.email ? (
                  <div className=" text-info">
                    {myFormik.errors.email}
                  </div>
                ) : null}
                <input
                  type="password"
                  className="form-control input"
                  placeholder="Password"
                  id="password"
                  name="password"
                  onChange={myFormik.handleChange}
                  onBlur={myFormik.handleBlur}
                  onFocus={clearMsg}
                />
                {myFormik.touched.password ? (
                  <div className=" text-info">
                    {myFormik.errors.password}
                  </div>
                ) : null}
                <button
                  className="btn btn-outline-info  text-white mt-3 w-100 "
                  type="submit"
                >
                  {loading ? (
                     <Circles
                     height="30"
                     width="30"
                     color="#fff"
                     ariaLabel="circles-loading"
                     visible={true}
                     className="text-center"
                   />
                  ) : (
                    "Login"
                  )}
                </button>
                {successMsg ? (
                  <div className=" text-infot-center p-2">
                    {successMsg}
                  </div>
                ) : null}
                {erorrMsg ? (
                  <div className=" text-infot-center p-2">
                    {erorrMsg}
                  </div>
                ) : null}
                <p className="text-center mt-3 text-white">
                  <Link to="/register" className="text-white">
                    Don't have an account?
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// import React from 'react'

// export default function Login() {
//   return (
//     <div>
      
//     </div>
//   )
// }
