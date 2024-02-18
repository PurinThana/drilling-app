import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Sidebar from '../Sidebar';

function DrillingEq() {
    const [DrillPipeData, setDrillPipeData] = useState({ name: 'Drill pipe', type: '', id: 0, od: 0, len: 0 });
    const [DrillCollarData, setDrillCollarData] = useState({ name: 'Drill collar', type: '', id: 0, od: 0, len: 0 });
    const [BitData, setBitData] = useState({ name: 'Bit', area: 0 });
    const [Flowrate, setFlowrate] = useState({ name: 'Flow rate', flowrate: 0 });
    const [EquipmentData, setEquipmentData] = useState(() => {
        if (localStorage.getItem('EquipmentData') !== '' && localStorage.getItem('EquipmentData') !== '""') {
            let SaveEquipmentData = localStorage.getItem('EquipmentData');

            if (SaveEquipmentData) {
                const parsedData = JSON.parse(SaveEquipmentData);
                setDrillPipeData(parsedData[0]);
                setDrillCollarData(parsedData[1]);
                setBitData(parsedData[2]);
                setFlowrate(parsedData[3]);
                return JSON.parse(SaveEquipmentData);

            } else {
                return [DrillPipeData, DrillCollarData, BitData, Flowrate];
            }
        } else {
            return [DrillPipeData, DrillCollarData, BitData, Flowrate];
        }

    });
    console.log(DrillPipeData)


    const handleChange = (name, fieldName, value) => {
        let updatedDrillPipeData = { ...DrillPipeData };
        let updatedDrillCollarData = { ...DrillCollarData };
        let updatedBitData = { ...BitData };
        let updatedFlowrate = { ...Flowrate };
        let updatedEQ = [...EquipmentData];

        if (name === 'Drill pipe') {
            updatedDrillPipeData[fieldName] = value;
        } else if (name === 'Drill collar') {
            updatedDrillCollarData[fieldName] = value;
        } else if (name === 'Bit') {
            updatedBitData[fieldName] = value;
        } else if (name === 'Flow rate') {
            updatedFlowrate[fieldName] = value;
        }

        updatedEQ = [updatedDrillPipeData, updatedDrillCollarData, updatedBitData, updatedFlowrate];

        setDrillPipeData(updatedDrillPipeData);
        setDrillCollarData(updatedDrillCollarData);
        setBitData(updatedBitData);
        setFlowrate(updatedFlowrate);
        setEquipmentData(updatedEQ);
    };

    useEffect(() => {
        console.log(EquipmentData);
    }, [EquipmentData]);

    const handleSubmit = () => {
        localStorage.setItem('EquipmentData', JSON.stringify(EquipmentData));
    };

    return (
        <div className='container main-component'>
            <div className="d-flex">
                <div className="">
                    <Sidebar />
                </div>
                <div className="w-75">
                    <h2 className="title">อุปกรณ์การเจาะ</h2>
                    <h4>กรอกข้อมูลสำหรับเจาะชั้นที่ลึกที่สุด</h4>
                    <Form className='row'>

                        <div className="group row mb-2">
                            <div className="row"><h5>สำหรับ Drill pipe (ก้านเจาะ)</h5></div>
                            <Form.Group className='col-3'>
                                <Form.Label>Grade</Form.Label>
                                <Form.Control
                                    type='text'
                                    step={0.001}
                                    name='type'
                                    defaultValue={EquipmentData[0].type === '' ? '' : EquipmentData[0].type}
                                    onChange={(e) => handleChange('Drill pipe', 'type', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='col-3'>
                                <Form.Label>Inside Diameter (inch)</Form.Label>
                                <Form.Control
                                    type='number'
                                    step={0.001}
                                    name='id'
                                    defaultValue={EquipmentData[0].id === 0 ? '' : EquipmentData[0].id}
                                    onChange={(e) => handleChange('Drill pipe', 'id', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='col-3'>
                                <Form.Label>Outside Diameter (inch)</Form.Label>
                                <Form.Control
                                    type='number'
                                    step={0.001}
                                    name='od'
                                    defaultValue={EquipmentData[0].od === 0 ? '' : EquipmentData[0].od}
                                    onChange={(e) => handleChange('Drill pipe', 'od', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='col-3'>
                                <Form.Label>Length (ft)</Form.Label>
                                <Form.Control
                                    type='number'
                                    step={0.001}
                                    name='len'
                                    defaultValue={EquipmentData[0].len === 0 ? '' : EquipmentData[0].len}
                                    onChange={(e) => handleChange('Drill pipe', 'len', e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className="group row  mb-2">
                            <div className="row"><h5>สำหรับ Drill collar (ก้านถ่วงน้ำหนัก)</h5></div>
                            <Form.Group className='col-3'>
                                <Form.Label>Grade</Form.Label>
                                <Form.Control
                                    type='text'
                                    step={0.001}
                                    name='type'
                                    defaultValue={EquipmentData[1].type === '' ? '' : EquipmentData[1].type}
                                    onChange={(e) => handleChange('Drill collar', 'type', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='col-3'>
                                <Form.Label>Inside Diameter (inch)</Form.Label>
                                <Form.Control
                                    type='number'
                                    step={0.001}
                                    name='id'
                                    defaultValue={EquipmentData[1].id === 0 ? '' : EquipmentData[1].id}
                                    onChange={(e) => handleChange('Drill collar', 'id', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='col-3'>
                                <Form.Label>Outside Diameter (inch)</Form.Label>
                                <Form.Control
                                    type='number'
                                    step={0.001}
                                    name='od'
                                    defaultValue={EquipmentData[1].od === 0 ? '' : EquipmentData[1].od}
                                    onChange={(e) => handleChange('Drill collar', 'od', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='col-3'>
                                <Form.Label>Length (ft)</Form.Label>
                                <Form.Control
                                    type='number'
                                    step={0.001}
                                    name='len'
                                    defaultValue={EquipmentData[1].len === 0 ? '' : EquipmentData[1].len}
                                    onChange={(e) => handleChange('Drill collar', 'len', e.target.value)}
                                />
                            </Form.Group>
                        </div>

                        <div className="group row mb-2 ">
                            <div className="row"><h5>สำหรับ Bit (หัวเจาะ)</h5></div>
                            <Form.Group className='col-3'>
                                <Form.Label>Area (sq.inch)</Form.Label>
                                <Form.Control
                                    type='number'
                                    step={0.001}
                                    name='area'
                                    defaultValue={EquipmentData[2].area === 0 ? '' : EquipmentData[2].area}
                                    onChange={(e) => handleChange('Bit', 'area', e.target.value)}
                                />
                            </Form.Group>
                        </div>

                        <div className="d-flex justify-content-end ">
                            <Button className='me-3' style={{ width: '100px' }} variant='success' onClick={handleSubmit}>Save</Button>
                        </div>
                    </Form>
                    <div className="footer mt-5">
                        {/* ส่วนท้ายตามต้องการ */}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DrillingEq;
