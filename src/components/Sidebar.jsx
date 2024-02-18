import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css";
import Swal from "sweetalert2";
import { auth, signOut } from "../firebaseConfic";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const pathname = window.location.pathname;

  const [LoadData, setLoadData] = useState(false);

  const Logout = () => {
    Swal.fire({
      title: "ต้องการ Log out หรือไม่?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("resdata", "");
        localStorage.setItem("EquipmentData", "");
        localStorage.setItem("MudFlowData", "");
        localStorage.setItem("casingData", "");
        localStorage.setItem("CementGrade", "");
        localStorage.setItem("CementVol", "");
        localStorage.setItem("LoadData", false);
        localStorage.setItem("id", "");
        localStorage.setItem("token", "");
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        await signOut(auth);
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    if (
      localStorage.getItem("isLoggedIn") !== "" &&
      localStorage.getItem("isLoggedIn") !== '""' &&
      localStorage.getItem("isLoggedIn") !== undefined &&
      localStorage.getItem("isLoggedIn") !== null
    ) {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn == "false") {
        navigate("/Login");
      } else {
      }
      if (
        localStorage.getItem("LoadData") != "" &&
        localStorage.getItem("LoadData") != '""' &&
        localStorage.getItem("LoadData") !== undefined &&
        localStorage.getItem("LoadData") !== null
      ) {
        let Load = localStorage.getItem("LoadData");
        if (Load === "false") {
          setLoadData(false);
        } else {
          setLoadData(true);
        }
      }
    } else {
      navigate("/Login");
    }
  }, []);

  return (
    <div className="side-bar shadow">
      {/* ปุ่มลิงก์ไปทุก path */}
      <div className="side-con">
        <div className="menu">
          <Link
            className={`navlinkhome mt-1 ${pathname === "/" ? "active" : ""}`}
            onChange={(e) => HandleOnclik("/")}
            to="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className={`bi bi-house-door-fill svg ${
                pathname === "/" ? "activehome" : ""
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
            </svg>
          </Link>
          {LoadData ? (
            // Content to render when LoadData is true
            <div>
              <Link
                className={`navlink mt-1 ${
                  pathname === "/resform" ? "active" : ""
                }`}
                to="/resform"
              >
                แหล่งกักเก็บ
              </Link>
              <Link
                className={`navlink mt-1 ${
                  pathname === "/casing" ? "active" : ""
                }`}
                to="/casing"
              >
                ข้อมูลท่อกรุ
              </Link>

              <Link
                className={`navlink mt-1 ${
                  pathname === "/drilling_equipment" ? "active" : ""
                }`}
                to="/drilling_equipment"
              >
                อุปกรณ์การเจาะ
              </Link>
              <Link
                className={`navlink mt-1 ${
                  pathname === "/pressurelost" ? "active" : ""
                }`}
                to="/pressurelost"
              >
                คำนวณปั๊ม
              </Link>
              <Link
                className={`navlink mt-1 ${
                  pathname === "/cement" ? "active" : ""
                }`}
                to="/cement"
              >
                ซีเมนต์
              </Link>
              <Link
                className={`navlink mt-1 ${
                  pathname === "/result" ? "active" : ""
                }`}
                to="/result"
              >
                ผลลัพธ์
              </Link>
            </div>
          ) : (
            // Content to render when LoadData is false
            <div>{/* Your content when LoadData is false */}</div>
          )}

          {/* <Link className={`navlink mt-1 ${pathname === '/user' ? 'active' : ''}`} to="/user">Dashboard</Link> */}
        </div>
        <div className="menu2">
          <button className="btnlogout btn" onClick={Logout}>
            <svg
              xmlns=" http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="svg bi bi-box-arrow-right out"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* นอกจากนี้คือเนื้อหาของ Formcontact component */}
    </div>
  );
}

export default Sidebar;
