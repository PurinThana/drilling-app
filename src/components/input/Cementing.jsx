import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { CementvolCal } from "../../utils/calculator";
import Sidebar from "../Sidebar";

function Cementing() {
  //From Local Strorage....
  const [Isemty, setIsemty] = useState(false);
  const [casingData, setCasingData] = useState([]);
  useEffect(() => {
    if (
      localStorage.getItem("casingData") != "" &&
      localStorage.getItem("casingData") != '""'
    ) {
      let SavecasingData = JSON.parse(localStorage.getItem("casingData"));
      if (SavecasingData[0]["type"] != "") {
        setCasingData(SavecasingData);
        setIsemty(true);
      }
    }
  }, []);

  //ver here ....
  const [CementGrade, SetCementgrade] = useState(() => {
    if (
      localStorage.getItem("CementGrade") !== "" &&
      localStorage.getItem("CementGrade") != '""'
    ) {
      let SaveCementGrade = localStorage.getItem("CementGrade");
      SaveCementGrade = JSON.parse(SaveCementGrade);
      return SaveCementGrade;
    } else {
      return {
        vol: 0,
        waterRatio: 0,
        weight: 0,
        bentoniteRatio: 0,
      };
    }
  });

  //fucntion here .....
  const handleChange = (key, value) => {
    let update = CementGrade;
    update[key] = value;
    SetCementgrade(update);
    console.log(CementGrade);
  };

  const Onsubmit = () => {
    let CementVol = CementvolCal(casingData, CementGrade);
    localStorage.setItem("CementGrade", JSON.stringify(CementGrade));
    localStorage.setItem("CementVol", JSON.stringify(CementVol));
  };

  return (
    <div className="container d-flex main-component">
      <div className="d-flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="w-75">
          {Isemty ? (
            <div className="row ">
              <h3 className="title">ข้อมูลซีเมนต์</h3>
              <h3>Cement Grade</h3>
              <Form className="row">
                <div className="group col-6  p-4">
                  <div className="">
                    <h5>Cement Volume per sack (cu.ft)</h5>
                  </div>
                  <Form.Group className="">
                    <Form.Label>Enter Volume</Form.Label>
                    <Form.Control
                      type="number"
                      step={0.001}
                      name="vol"
                      defaultValue={
                        CementGrade.vol === 0 ? "" : CementGrade.vol
                      }
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                  </Form.Group>
                </div>

                <div className="group col-6  p-4">
                  <div className="">
                    <h5>Water Cement Ratio (gal/sack)</h5>
                  </div>
                  <Form.Group className="">
                    <Form.Label>Enter water cement raito</Form.Label>
                    <Form.Control
                      type="number"
                      step={0.001}
                      name="waterRatio"
                      defaultValue={
                        CementGrade.waterRatio === 0
                          ? ""
                          : CementGrade.waterRatio
                      }
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                  </Form.Group>
                </div>

                <div className="group col-6  p-4">
                  <div className="">
                    <h5>Weight per sack (lb/gal)</h5>
                  </div>
                  <Form.Group className="">
                    <Form.Label>Enter weight</Form.Label>
                    <Form.Control
                      type="number"
                      step={0.001}
                      name="weight"
                      defaultValue={
                        CementGrade.weight === 0 ? "" : CementGrade.weight
                      }
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                  </Form.Group>
                </div>

                <div className="group col-6  p-4">
                  <div className="">
                    <h5>Percent Bentonite (%)</h5>
                  </div>
                  <Form.Group className="">
                    <Form.Label>Enter percent</Form.Label>
                    <Form.Control
                      type="number"
                      step={0.001}
                      name="bentoniteRatio"
                      defaultValue={
                        CementGrade.bentoniteRatio === 0
                          ? ""
                          : CementGrade.bentoniteRatio
                      }
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />
                  </Form.Group>
                </div>
              </Form>

              <div className="btn-con">
                <Button variant="success" onClick={Onsubmit}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <h3>กรุณากรอกข้อมูลท่อกรุก่อน</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cementing;
