import React from "react";
import "./Note.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik/dist";
import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom/dist";
import { Fade } from "react-awesome-reveal";
import { CirclesWithBar } from "react-loader-spinner";

export default function Note({ note, getUserNotes }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(true);

  let validationSchema = yup.object({
    title: yup
      .string()
      .required("title is required")
      .min(3, "minimum 3 chars")
      .max(25, "maximum 25 chars"),
    content: yup
      .string()
      .required("content is requierd")
      .min(5, "minimum 5 chars")
      .max(150, "maximum 150 chars"),
  });

  function updateNote(values) {
    axios
      .put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        values,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        getUserNotes();
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false);
      })
      .finally(() => handleClose());
      //setLoading(false);
  }

  function deleteNote(values) {
    axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        getUserNotes();
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false);
      })
      .finally(() => handleClose());
      //setLoading(false);
  }

  const myFormik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: updateNote,
    validationSchema,
  });

  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <CirclesWithBar
  //         height="100"
  //         width="100"
  //         color="#54B4D3"
  //         outerCircleColor="#54B4D3"
  //         innerCircleColor="#54B4D3"
  //         barColor="#54B4D3"
  //         ariaLabel="circles-with-bar-loading"
  //         wrapperStyle={{}}
  //         wrapperClass=""
  //         visible={true}
  //       />
  //     </div>
  //   );
  // }  

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              type="text"
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
              placeholder="Enter Note Title"
              name="title"
              id="title"
              className="form-control my-3"
            />
            {myFormik.touched.title ? (
              <div className="text-info text-center">
                {myFormik.errors.title}
              </div>
            ) : (
              ""
            )}
            <textarea
              type="text"
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
              placeholder="Enter Note Content"
              name="content"
              id="content"
              className="form-control my-3"
            ></textarea>
            {myFormik.touched.content ? (
              <div className="text-info text-center">
                {myFormik.errors.content}
              </div>
            ) : (
              ""
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={myFormik.handleSubmit}>
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Update Note"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="col-md-6 p-3">
        <Fade duration={2000}>
          <div className="card">
            <Card >
              <Card.Body>
                <Card.Title>{note?.title}</Card.Title>
                <Card.Text>{note?.content}</Card.Text>
                <Link>
                  <i
                    className="fa-solid  fa-xl cursor-pointer mx-3 fa-pen-to-square text-success"
                    variant="primary"
                    onClick={handleShow}
                  ></i>
                </Link>
                <Link>
                  <i
                    className="fa-solid fa-xl mx-3 fa-trash cursor-pointer text-danger"
                    onClick={deleteNote}
                  ></i>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </Fade>
      </div>
    </>
  );
}
