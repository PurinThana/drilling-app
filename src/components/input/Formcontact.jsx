import React, { useEffect, useState, useContext } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PressureCal } from '../../utils/calculator';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { AuthContext } from '../../context/Authcontext';

function Formcontact() {
  const { User_db } = useContext(AuthContext);
  const [output, setOutput] = useState(() => {
    if (localStorage.getItem('resdata') != '') {
      let savedresdata = localStorage.getItem('resdata');
      savedresdata = JSON.parse(savedresdata);
      return savedresdata;
    } else {
      return { resname: '', resdata: '' };
    }


  });

  const [ressname, setResname] = useState(() => {
    if (localStorage.getItem('resdata') != '') {
      let savedresdata = localStorage.getItem('resdata');
      savedresdata = JSON.parse(savedresdata);
      return savedresdata.resname;
    } else {
      return '';
    }
  });


  const [lithoData, setLithoData] = useState(() => {
    if (localStorage.getItem('resdata') != '') {
      let savedresdata = localStorage.getItem('resdata');
      savedresdata = JSON.parse(savedresdata);
      if (localStorage.getItem('resdata') != '' && savedresdata.resdata !== '') {


        return savedresdata.resdata;
      } else {
        return [{ litho: '', thickness: '', sg: '' }];
      }
    } else {
      return [{ litho: '', thickness: '', sg: '' }];
    }

  });

  const [divCount, setDivCount] = useState(1); // เพิ่มตัวแปรนับจำนวน div


  const handleAddClick = () => {
    setLithoData([...lithoData, { litho: '', thickness: '', sg: '' }]);
    setDivCount(divCount + 1); // เพิ่มจำนวน div
  };

  const handleChange = (index, fieldName, value) => {
    const updatedLithoData = [...lithoData];
    updatedLithoData[index][fieldName] = value;
    setLithoData(updatedLithoData);
    const calculatedPressureData = PressureCal(lithoData);
    setOutput({ resname: ressname, resdata: calculatedPressureData });
  };

  const handleChangeforresname = (value) => {
    const updatename = value;
    setResname(updatename);

    const calculatedPressureData = PressureCal(lithoData);
    setOutput({ resname: ressname, resdata: calculatedPressureData });
  };

  useEffect(() => {

    localStorage.setItem('resdata', JSON.stringify(output));

  }, [output]);






  return (
    <div className="container mt-2 main-component">
      <div className="d-flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="">
          <h2 className='title'>ข้อมูลแหล่งกักเก็บ</h2>
          <Form>
            <Form.Group className="mb-3 col-4" controlId="exampleForm.ControlInput1">
              <Form.Label> <h6>Reservoir Name</h6></Form.Label>
              <Form.Control style={{ maxWidth: "413px" }} type="text" value={ressname} name='resname' placeholder="ชื่อแหล่งกักเก็บ" onChange={(e) => handleChangeforresname(e.target.value)} required />
            </Form.Group>

            <h5>กรอกข้อมูลแหล่งกักเก็บ</h5>

            {lithoData.map((data, index) => (
              <div className="row" id={`litho-data-${divCount}-${index}`} key={index}>
                <Form.Group className="mb-3 col-4">
                  <Form.Label> <h6>Lithology</h6></Form.Label>
                  <Form.Control
                    type="text"
                    name={`litho${divCount}`}
                    value={data.litho}
                    onChange={(e) => handleChange(index, 'litho', e.target.value)}
                    rows={3}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-4">
                  <Form.Label> <h6>Thickness (ft)</h6></Form.Label>
                  <Form.Control
                    type="number"
                    step="0.001"
                    name={`thickness${divCount}`}
                    value={data.thickness}
                    onChange={(e) => handleChange(index, 'thickness', parseFloat(e.target.value))}
                    rows={3}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-4">
                  <Form.Label> <h6>Specific Gravity</h6></Form.Label>
                  <Form.Control
                    type="number"
                    step="0.001"
                    name={`sg${divCount}`}
                    value={data.sg}
                    onChange={(e) => handleChange(index, 'sg', parseFloat(e.target.value))}
                    rows={3}
                    required
                  />
                </Form.Group>
              </div>
            ))}

            <div className=" d-flex justify-content-between">
              <Button style={{ width: "80px" }} variant="primary" className='' onClick={handleAddClick}>Add</Button>

              <Link to="/result" className="">
                <Button variant="success">Save</Button>
              </Link>

            </div>
          </Form>
        </div>
      </div>



    </div>
  );
}

export default Formcontact;
