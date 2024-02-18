import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";
// import ScatterChart from './Chart';
import Sidebar from "../Sidebar";
import { Form } from "react-bootstrap";
import "../../utils/calculator";
// import SubpressureCal from '../input/SubpressureCal';
import Swal from "sweetalert2";
import { updateFieldInDoc, getFieldFromDoc } from "../../utils/user_confic";
import "../../utils/calculator";
import { PressureAssembly, mudvolCal } from "../../utils/calculator";
import ScatterChart from "./ScatterChart";
import { AuthContext } from "../../context/Authcontext";

function Result() {
  const { User_db, setCurrentSave } = useContext(AuthContext);
  const [Resdata, setResdata] = useState({ resname: "", resdata: "" });
  const [showDiv, setShowDiv] = useState(false);
  const [Savename, setSavename] = useState("");
  const [CementVol, setCementVol] = useState(() => {
    if (
      localStorage.getItem("CementVol") !== "" &&
      localStorage.getItem("CementVol") !== '""'
    ) {
      return JSON.parse(localStorage.getItem("CementVol"));
    } else {
      return "";
    }
  });
  const [isLoading, setisLoading] = useState(true);
  const [casingData, setcasingData] = useState(() => {
    if (
      localStorage.getItem("casingData") !== "" &&
      localStorage.getItem("casingData") !== '""'
    ) {
      return JSON.parse(localStorage.getItem("casingData"));
    } else {
      return [];
    }
  });
  const [EquipmentData, setEquipmentData] = useState(() => {
    if (
      localStorage.getItem("EquipmentData") !== "" &&
      localStorage.getItem("EquipmentData") !== '""'
    ) {
      return JSON.parse(localStorage.getItem("EquipmentData"));
    } else {
      return [];
    }
  });
  const [issetMud, setIssetMud] = useState(false);

  const [Muddata, setMuddata] = useState(() => {
    if (casingData.length !== 0 && EquipmentData.length !== 0) {
      return mudvolCal(casingData, EquipmentData);
    } else {
      return [];
    }
  });

  const [PressureSelected, setPressureSelected] = useState(() => {
    try {
      if (
        localStorage.getItem("casingData") != "" &&
        localStorage.getItem("casingData") != '""' &&
        localStorage.getItem("EquipmentData") !== "" &&
        localStorage.getItem("EquipmentData") !== '""'
      ) {
        let x = JSON.parse(localStorage.getItem("casingData"));
        let y = JSON.parse(localStorage.getItem("EquipmentData"));

        // Ensure PressureAssembly is a function before calling it
        if (typeof PressureAssembly === "function") {
          let z = PressureAssembly(x, y);

          const filteredData = z.filter((item) => item.type === "Conductor");

          return filteredData[0];
        } else {
          console.error("PressureAssembly is not a function.");
        }
      } else {
        return "";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return "";
    } finally {
      // Set loading state to false when fetching is done (whether successful or not)
      setisLoading(false);
    }
  });

  const [CementGrade, SetCementgrade] = useState(() => {
    if (
      localStorage.getItem("CementGrade") !== "" &&
      localStorage.getItem("CementGrade") !== '""'
    ) {
      return JSON.parse(localStorage.getItem("CementGrade"));
    } else {
      return "";
    }
  });

  //funtion Here .................
  useEffect(() => {
    console.log(User_db);
    if (localStorage.getItem("savename")) {
      setSavename(JSON.parse(localStorage.getItem("savename")));
    }
    if (
      localStorage.getItem("resdata") !== "" &&
      localStorage.getItem("resdata") !== '""'
    ) {
      let savedresdata = localStorage.getItem("resdata");
      savedresdata = JSON.parse(savedresdata);
      setResdata(savedresdata);
    }

    if (localStorage.getItem("casingData") !== "") {
      if (
        JSON.parse(localStorage.getItem("casingData"))[0].mudweight !==
        undefined
      ) {
        setIssetMud(true);
      }
    }

    console.log(Muddata);
  }, []); // Empty dependency array to run the effect only once on mount

  const handleButtonClick = () => {
    setShowDiv(!showDiv);
  };

  const HandleSubmit = async (e) => {
    const { value: savename } = await Swal.fire({
      title: "Enter your save name",
      input: "text",
      inputLabel: "Your Save name",
      inputValue: Savename,

      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    if (savename) {
      let updatedata = {
        savename: savename,
        resdata:
          localStorage.getItem("resdata") !== ""
            ? JSON.parse(localStorage.getItem("resdata"))
            : "",
        EquipmentData:
          localStorage.getItem("EquipmentData") !== ""
            ? JSON.parse(localStorage.getItem("EquipmentData"))
            : "",
        MudFlowData:
          localStorage.getItem("MudFlowData") !== ""
            ? JSON.parse(localStorage.getItem("MudFlowData"))
            : "",
        casingData:
          localStorage.getItem("casingData") !== ""
            ? JSON.parse(localStorage.getItem("casingData"))
            : "",
        CementGrade:
          localStorage.getItem("CementGrade") !== ""
            ? JSON.parse(localStorage.getItem("CementGrade"))
            : "",
        CementVol:
          localStorage.getItem("CementVol") !== ""
            ? JSON.parse(localStorage.getItem("CementVol"))
            : "",
        time: Date.now(),
      };

      let prevData = await getFieldFromDoc(
        localStorage.getItem("id"),
        "user_db"
      );

      prevData = JSON.parse(prevData);
      for (let i = 0; i < prevData.length; i++) {
        console.log(i);
        if (prevData[i].savename === updatedata.savename) {
          prevData[i] = updatedata;
          let newData = [...prevData];
          updateFieldInDoc(
            localStorage.getItem("id"),
            "user_db",
            JSON.stringify(newData)
          );
          return;
        }
      }

      let newData = [...prevData, updatedata];
      updateFieldInDoc(
        localStorage.getItem("id"),
        "user_db",
        JSON.stringify(newData)
      );
    }
  };

  const HandleOnselectedChange = async (e) => {
    setisLoading(true);

    try {
      let x = JSON.parse(localStorage.getItem("casingData"));
      let y = JSON.parse(localStorage.getItem("EquipmentData"));

      // Ensure PressureAssembly is a function before calling it
      if (typeof PressureAssembly === "function") {
        let z = PressureAssembly(x, y);

        const filteredData = z.filter((item) => item.type === e.target.value);

        // Use await to ensure setPressureSelected completes before continuing
        setPressureSelected(filteredData[0]);
        console.log(PressureSelected);
      } else {
        console.error("PressureAssembly is not a function.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle error appropriately (e.g., show an error message to the user)
    } finally {
      setisLoading(false);
      console.log(PressureSelected);
    }
  };

  return (
    <div className="container main-component">
      <div className="d-flex">
        <div className="">
          <Sidebar />
        </div>

        <div className="w-75">
          <h2 className="title mt-2">ผลลัพธ์</h2>

          <div className="result">
            <div className="row">
              <h5 className="mb-3">Reservoir name: {Resdata.resname}</h5>
              {Resdata.resdata === "" ? (
                <h1>No Data for cal</h1>
              ) : (
                <div className="">
                  <Table striped bordered hover size="sm ms-2 w-75">
                    <thead>
                      <tr>
                        <th>Lithology</th>
                        <th>Depth</th>
                        <th>Pore pressure (psig)</th>
                        <th>Fracture pressure (psig)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Resdata.resdata.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.litho}</td>
                          <td>{entry.total_thickness}</td>
                          <td>{entry.pore_pressure.toFixed(2)}</td>
                          <td>{entry.fracture_pressure.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="chartx">
                    <Button variant="primary" onClick={handleButtonClick}>
                      {showDiv ? "Close" : "Show Chart"}
                    </Button>

                    {showDiv && (
                      <div className="mt-3 d-flex justify-content-center">
                        {/* Plotly chart */}
                        <ScatterChart />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="">
            {CementVol === "" ? (
              <h1>No Data for cal</h1>
            ) : (
              <div className="">
                <div className="mt-3">
                  <h5>ข้อมูล Cementings</h5>
                  <div className="d-flex">
                    <p className="me-4">
                      <strong className="me-1">Volume per sack :</strong>{" "}
                      {CementGrade.vol}{" "}
                      <strong className="ms-1">ft/sack</strong>
                    </p>
                    <p>
                      <strong className="me-1">Water per sack :</strong>
                      {CementGrade.waterRatio}{" "}
                      <strong className="ms-1">gal/sack</strong>{" "}
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="me-4">
                      <strong className="me-1">Weight per sack :</strong>
                      {CementGrade.weight}{" "}
                      <strong className="ms-1">lb/sack</strong>{" "}
                    </p>
                    <p>
                      <strong className="me-1">Percent Bentonite :</strong>{" "}
                      {CementGrade.bentoniteRatio}
                    </p>
                  </div>
                </div>
                <Table striped bordered hover size="sm ms-2 w-75">
                  <thead>
                    <tr>
                      <th>Casing</th>
                      <th>Volume (ft3)</th>
                      <th>Weight (lb)</th>
                      <th>Cement (Sacks)</th>
                      <th>Water (gal)</th>
                      <th>Bentonite (lb)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CementVol.length === 0 ? (
                      <>No data</>
                    ) : (
                      CementVol.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.type}</td>
                          <td>{Math.ceil(entry.Volume)}</td>
                          <td>{Math.ceil(entry.weight)}</td>
                          <td>{Math.ceil(entry.totalSack)}</td>
                          <td>{Math.ceil(entry.waterVol)}</td>
                          <td>{Math.ceil(entry.bentoniteWeight)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </div>

          <hr />

          <div className="Pressure">
            <h4>Pressure Loss</h4>
            {/* <SubpressureCal /> */}

            <div className="auto-assembly row">
              <Form.Group className="col-5">
                <Form.Select
                  className="shadow"
                  onChange={(e) => {
                    HandleOnselectedChange(e);
                  }}
                >
                  {casingData.map((entry, index) => (
                    <option key={index} value={entry.type}>
                      {entry.type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Table
                striped
                bordered
                hover
                size="sm ms-2 w-75"
                className="mt-3 ms-2"
              >
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Flow Type</th>
                    <th>Pressure Loss</th>
                  </tr>
                </thead>

                {isLoading ? (
                  <tr>
                    <td colSpan="3">Loading...</td>
                  </tr>
                ) : PressureSelected === "" ? (
                  <tbody>
                    <tr>
                      <td colSpan="3">
                        <h1>nodata</h1>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td>Drill Pipe</td>
                      <td>{PressureSelected.drill_pipe.type}</td>
                      <td>
                        {PressureSelected.drill_pipe.lossRate.toFixed(5)} psi/ft
                      </td>
                    </tr>
                    <tr>
                      <td>Drill Collar</td>
                      <td>{PressureSelected.drill_collar.type}</td>
                      <td>
                        {PressureSelected.drill_collar.lossRate.toFixed(5)}{" "}
                        psi/ft
                      </td>
                    </tr>
                    <tr>
                      <td>Drill Collar and Hole</td>
                      <td>{PressureSelected.drill_collar_and_hole.type}</td>
                      <td>
                        {PressureSelected.drill_collar_and_hole.lossRate.toFixed(
                          5
                        )}{" "}
                        psi/ft
                      </td>
                    </tr>
                    <tr>
                      <td>Drill Pipe and Hole</td>
                      <td>{PressureSelected.drill_pipe_and_hole.type}</td>
                      <td>
                        {PressureSelected.drill_pipe_and_hole.lossRate.toFixed(
                          5
                        )}{" "}
                        psi/ft
                      </td>
                    </tr>
                    <tr>
                      <td>Drill Pipe and Casing</td>
                      <td>{PressureSelected.drill_pipe_and_casing.type}</td>
                      <td>
                        {PressureSelected.drill_pipe_and_casing.lossRate ===
                        undefined
                          ? ""
                          : PressureSelected.drill_pipe_and_casing.lossRate.toFixed(
                              5
                            ) + " psi/ft"}
                      </td>
                    </tr>
                  </tbody>
                )}
              </Table>
            </div>
          </div>

          <div className="Mud">
            <h4>Mud volume (gal/ft)</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Drill pipe</th>
                  <th>Drill Collar</th>
                  <th>Drill Collar and Hole</th>
                  <th>Drill Pipe and Hole</th>
                  <th>Drill Pipe and Casing</th>
                </tr>
              </thead>
              <tbody>
                {Muddata.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.dpVol}</td>
                    <td>{entry.dcVol}</td>
                    <td>{entry.dcAhVol}</td>
                    <td>{entry.dpAhVOl}</td>
                    <td>{entry.dpAcVol}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="">
            <Button onClick={HandleSubmit} variant="success">
              บันทึกข้อมูลทั้งหมด
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
