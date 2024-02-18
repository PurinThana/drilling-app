import React, { useContext, useEffect, useState } from "react";
import User_sidebar from "./User_sidebar";
import Table from "react-bootstrap/Table";
import {
  addUser,
  getUserByUsername,
  updateFieldInDoc,
  updateUser,
  deleteUser,
  getUserByID,
  getFieldFromDoc,
} from "../../utils/user_confic";
import "../../utils/calculator";
import { Button } from "react-bootstrap";
import { PressureAssembly } from "../../utils/calculator";
import { AuthContext } from "../../context/Authcontext";

function User_index() {
  const [search, setSearch] = useState("");
  const [userObject, setUserObject] = useState(null);
  // const { user_db } = useContext(AuthContext);
  const { isLoading, User_db, setCurrentSave, setUser_db } =
    useContext(AuthContext);

  useEffect(() => {});

  const OnContinue = async (save) => {
    const promises = User_db.map((element) => {
      if (element.savename === save) {
        setCurrentSave({
          resdata: element.resdata,
          EquipmentData: element.EquipmentData,
          MudFlowData: element.MudFlowData,
          casingData: element.casingData,
          CementGrade: element.CementGrade,
          CementVol: element.CementVol,
        });
        console.log(element.savename);
        localStorage.setItem("resdata", JSON.stringify(element.resdata));
        localStorage.setItem(
          "EquipmentData",
          JSON.stringify(element.EquipmentData)
        );
        localStorage.setItem(
          "MudFlowData",
          JSON.stringify(element.MudFlowData)
        );
        localStorage.setItem("casingData", JSON.stringify(element.casingData));
        localStorage.setItem(
          "CementGrade",
          JSON.stringify(element.CementGrade)
        );
        localStorage.setItem("CementVol", JSON.stringify(element.CementVol));
        localStorage.setItem("LoadData", true);
        localStorage.setItem("savename", JSON.stringify(element.savename));
        return Promise.resolve();
      }
      // Return a resolved promise for elements that do not match
      return Promise.resolve();
    });

    // Wait for all promises to complete
    await Promise.all(promises);

    // Reload the page after all items are set
    location.reload();
  };

  const hOnclick = async () => {
    localStorage.setItem("resdata", "");
    localStorage.setItem("EquipmentData", "");
    localStorage.setItem("MudFlowData", "");
    localStorage.setItem("casingData", "");
    localStorage.setItem("CementGrade", "");
    localStorage.setItem("CementVol", "");
    localStorage.setItem("LoadData", true);
    localStorage.setItem("savename", "");

    // Wait for a short delay (e.g., 100 milliseconds) to ensure localStorage is updated
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Reload the page
    location.reload();
  };

  const Ondelete = (save) => {
    const Deleted = User_db.filter((item) => item.savename !== save);
    console.log(Deleted);
    setUser_db(Deleted);
    updateFieldInDoc(
      localStorage.getItem("id"),
      "user_db",
      JSON.stringify(Deleted)
    );
  };

  return (
    <div className="">
      <h4 className="mt-1">ข้อมูลที่บันทึก</h4>
      <h6>ข้อมูลที่เคยกรอกไว้ทั้งหมด</h6>

      <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ชื่อที่บันทึก</th>
              <th>ชื่อแหล่งกักเก็บ</th>
              <th>วันที่บันทึก</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Display loading state while data is being fetched
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            ) : User_db && User_db.length > 0 ? (
              User_db.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.savename}</td>
                  <td>{doc.resdata.resname}</td>
                  <td>{new Date(doc.time).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => Ondelete(doc.savename)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success ms-2"
                      onClick={() => OnContinue(doc.savename)}
                    >
                      ทำต่อ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Button onClick={hOnclick} variant="primary mt-1">
        เพิ่มข้อมูลใหม่
      </Button>
    </div>
  );
}

export default User_index;
