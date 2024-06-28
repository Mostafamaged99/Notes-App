import React, { useState } from "react";
import logo from "../../images/notesInfo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Circles } from "react-loader-spinner";

export default function Register() {
  const [successMsg, setSuccessMsg] = useState(null);
  const [erorrMsg, setErorrMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function onSubmit(values) {
    setLoading(true);
    await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
      .then(({ data }) => {
        setSuccessMsg(data?.msg);
        navigate("/login");
        setLoading(false);
      })
      .catch((err) => {
        setErorrMsg(err?.response.data.msg);
        setLoading(false);
      });
  }

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be less than 15 characters")
      .required("Name is Required"),
    email: yup.string().email("Invalid Email").required("Email is Required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      )
      .required("Password is Required"),
    age: yup
      .number()
      .min(10, "Age must be at least 10")
      .max(80, "Age must be less than 80")
      .required("Age is Required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Phone number is not valid")
      .required("Phone is Required"),
  });

  const myFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
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
      <section className="register auth">
        <div className="fixed-top d-flex w-100 me-auto ps-5  ">
          <div className='logo'>
            <img src={logo} alt="logo" className="w-50" />
          </div>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center vh-100 layer">
            <div className="col-md-7  ">
              <form
                className="form p-5 text-white rounded-4 formLayer"
                onSubmit={myFormik.handleSubmit}
              >
                <h2 className="text-center">Register Now</h2>
                <input
                  type="text"
                  className="form-control input"
                  placeholder="Name"
                  id="name"
                  name="name"
                  onChange={myFormik.handleChange}
                  onBlur={myFormik.handleBlur}
                  onFocus={clearMsg}
                />
                {myFormik.touched.name ? (
                  <div className=" text-info ">
                    {myFormik.errors.name}
                  </div>
                ) : null}
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
                  <div className=" text-info ">
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
                  <div className=" text-info ">
                    {myFormik.errors.password}
                  </div>
                ) : null}
                <div className="row">
                  <div className="col">
                    <input
                      type="number"
                      className="form-control input"
                      placeholder="Age"
                      id="age"
                      name="age"
                      onChange={myFormik.handleChange}
                      onBlur={myFormik.handleBlur}
                      onFocus={clearMsg}
                    />
                    {myFormik.touched.age ? (
                      <div className=" text-info ">
                        {myFormik.errors.age}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control input"
                      placeholder="Phone "
                      id="phone"
                      name="phone"
                      onChange={myFormik.handleChange}
                      onBlur={myFormik.handleBlur}
                      onFocus={clearMsg}
                    />
                    {myFormik.touched.phone ? (
                      <div className=" text-info ">
                        {myFormik.errors.phone}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
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
                    "Sign up"
                  )}
                </button>
                {successMsg ? (
                  <div className=" text-info text-center p-2">
                    {successMsg}
                  </div>
                ) : null}
                {erorrMsg ? (
                  <div className=" text-info text-center p-2">
                    {erorrMsg}
                  </div>
                ) : null}
                <p className="text-center mt-3 text-white">
                  <Link to="/login" className="text-white">
                    Already have an account?
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
