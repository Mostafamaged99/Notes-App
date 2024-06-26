import React from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { noteState } from "../../Atom/noteAtom";

export default function Layout() {
  let [noteLength, setNoteLength] = useRecoilState(noteState);

  return (
    <>
      <div
        style={{ backgroundColor: "#0DCAF0" }}
        className="w-100 p-2 text-white text-center sticky-top "
      >
        Notes App : {noteLength}
        {/* {noteLength}{" "} */}
      </div>
      <Outlet />
    </>
  );
}
