import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik/dist";
import axios from "axios";
import * as yup from "yup";
import { useRecoilState } from "recoil";
import { noteState } from "../../Atom/noteAtom";
import Note from "../Note/Note";
import { Link, useNavigate } from "react-router-dom/dist";

export default function Home() {
  const [show, setShow] = useState(false);
  let [noteLength, setNoteLength] = useRecoilState(noteState);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
  const [allnotes, setAllnotes] = useState([]);

  let validationSchema = yup.object({
    title: yup
      .string()
      .required("title is required")
      .min(3, "minimum 3 chars")
      .max(25, "maximum 25 chars"),
    content: yup
      .string()
      .required("content is requierd")
      .min(40, "minimum 40 chars")
      .max(150, "maximum 150 chars"),
  });

  function addNote(values) {
    setLoading(true);
    axios
      .post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        getUserNotes();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => handleClose());
  }

  function getUserNotes(values) {
    axios
      .get("https://note-sigma-black.vercel.app/api/v1/notes", {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNoteLength(res?.data.notes.length);
        setAllnotes(res?.data.notes);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUserNotes();
  }, []);

  const myFormik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: addNote,
    validationSchema,
  });

  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
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
              "Add Note"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="overflow-hidden ">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 px-lg-5 px-2 py-5">
            <div className="d-flex justify-content-between aling-items-center header">

              <div className="text-end">
                <div className="p-3 rounded-4 bg-info text-white">
                  Number of notes: {noteLength}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">

                <div className="text-start me-2 d-flex  aling-items-center">
                  <button
                    className="btn btn-success text-white rounded-4"
                    variant="primary"
                    onClick={handleShow}
                  >
                    <i className="fa-solid fa-plus"></i> Add Note
                  </button>
                </div>

                <div className="text-start me-2 logout aling-items-center d-flex d-lg-none">
                  {/* <Link> */}
                  <button
                    className="btn btn-danger text-white rounded-4 "
                    variant="primary"
                    onClick={logout}
                  >
                    <i class="fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                  {/* </Link> */}
                </div>

              </div>

            </div>

            <div className="row ">
              {/* {allNotes.map(note =>  <Note key={note._id} note={note}  getUserNote={ getUserNote}/>)} */}
              {allnotes?.map((note) => {
                return (
                  <Note
                    key={note._id}
                    note={note}
                    getUserNotes={getUserNotes}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
