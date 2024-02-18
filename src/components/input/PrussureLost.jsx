import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Sidebar from '../Sidebar';
import Table from 'react-bootstrap/Table';


function PressureLost() {
    // Varraint here .....


    const [casingData, setcasingData] = useState(() => {
        if (localStorage.getItem('casingData') !== '' && localStorage.getItem('casingData') !== '""') {
            return JSON.parse(localStorage.getItem('casingData'));
        } else {
            return [];
        }
    });


    // const [Flowrate, setFlowrate] = useState(() => {
    //     if (localStorage.getItem('MudFlowData') !== '' && localStorage.getItem('MudFlowData') !== '""') {
    //         return JSON.parse(localStorage.getItem('MudFlowData'))[0]
    //     } else {
    //         return { name: 'Flow rate', value: 0 };
    //     }
    // });
    // const [Vicosity, setVicosity] = useState(() => {
    //     if (localStorage.getItem('MudFlowData') !== '' && localStorage.getItem('MudFlowData') !== '""') {
    //         return JSON.parse(localStorage.getItem('MudFlowData'))[2]
    //     } else {
    //         return { name: 'Vicosity', value: 0 };
    //     }
    // });
    // const [SheerRate, setSheerRate] = useState(() => {
    //     if (localStorage.getItem('MudFlowData') !== '' && localStorage.getItem('MudFlowData') !== '""') {
    //         return JSON.parse(localStorage.getItem('MudFlowData'))[0]
    //     } else {
    //         return { name: 'Flow SheerRate', value: 0 };
    //     }
    // });

    // const MudFlowData = [Flowrate, Vicosity, SheerRate];


    // const handleChange = (name, fieldName, value) => {
    //     if (name === 'Flow rate') {
    //         setFlowrate((prev) => ({ ...prev, [fieldName]: value }));
    //     } else if (name === 'Vicosity') {
    //         setVicosity((prev) => ({ ...prev, [fieldName]: value }));
    //     } else if (name === 'SheerRate') {
    //         setSheerRate((prev) => ({ ...prev, [fieldName]: value }));
    //     }

    // };

    const handleChangeMud = (e, index) => {
        let updatedCasingData = [...casingData];
        updatedCasingData[index][e.target.name] = e.target.value;
        setcasingData(updatedCasingData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save data to localStorage
        localStorage.setItem('casingData', JSON.stringify(casingData));
        console.log('Saved successfully');
    };
    const HandleCopy = () => {
        console.log("copied!");
        let mud = casingData[0]['mudweight'];
        let vis = casingData[0]['viscosity'];
        let shear = casingData[0]['shear'];
        let flow = casingData[0]['flowrate'];

        let copycasing = casingData.map((element, i) => ({
            ...element,
            mudweight: mud,
            viscosity: vis,
            shear: shear,
            flowrate: flow
        }));

        setcasingData(copycasing);
        console.log(casingData);
    };

    return (
        <div className='container main-component'>
            <div className="d-flex">
                <div className="">
                    <Sidebar />
                </div>
                <div className="">
                    <h4>กรอกข้อมูลสำหรับเจาะชั้นที่ลึกที่สุด</h4>
                    <div className="row table">
                        <Table striped bordered hover size="sm ms-2 w-75">
                            <thead>
                                <tr>
                                    <th>Casing</th>
                                    <th>Setting Depth(ft)</th>
                                    <th>Drilling Depth(ft)</th>
                                    <th>Mud weight (ppg)</th>
                                    <th>Plastic Viscosity (cP)</th>
                                    <th>Shear Rate (lb/100ft2)</th>
                                    <th>Flow Rate (GPM)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {casingData.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.type}</td>
                                        <td>{entry.sd}</td>
                                        <td>{entry.dd}</td>
                                        <td>
                                            <Form.Control
                                                type='number'
                                                step={0.001}
                                                name='mudweight'
                                                value={casingData[index]?.mudweight || ''}
                                                onChange={(e) => handleChangeMud(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type='number'
                                                step={0.001}
                                                name='viscosity'
                                                value={casingData[index]?.viscosity || ''}
                                                onChange={(e) => handleChangeMud(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type='number'
                                                step={0.001}
                                                name='shear'
                                                value={casingData[index]?.shear || ''}
                                                onChange={(e) => handleChangeMud(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type='number'
                                                step={0.001}
                                                name='flowrate'
                                                value={casingData[index]?.flowrate || ''}
                                                onChange={(e) => handleChangeMud(e, index)}
                                            />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>
                    {/* <Form className='row'>
                        <div className="group col-4 shadow p-4">
                            <div className=""><h5>อัตราการไหล (GPM)</h5></div>
                            <Form.Group className=''>
                                <Form.Label>Enter Flow rate</Form.Label>
                                <Form.Control
                                    type='number'
                                    step={0.001}
                                    name='flowrate'
                                    defaultValue={Flowrate.value}
                                    onChange={(e) => handleChange('Flow rate', 'value', e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                        </div>

                        <div className="group col-4 shadow p-4">
                            <div className=""><h5>Plastic Vicosity (cP)</h5></div>
                            <Form.Group className=''>
                                <Form.Label>Enter Vicosity</Form.Label>
                                <Form.Control
                                    type='number'
                                    step={0.001}
                                    name='Vicosity'
                                    defaultValue={Vicosity.value}
                                    onChange={(e) => handleChange('Vicosity', 'value', e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                        </div>

                        <div className="group col-4 shadow p-4">
                            <div className=""><h5>Sheer Rate (psi/100 sq.ft)</h5></div>
                            <Form.Group className=''>
                                <Form.Label>Enter Sheer rate</Form.Label>
                                <Form.Control
                                    type='number'
                                    step={0.001}
                                    name='SheerRate'
                                    defaultValue={SheerRate.value}
                                    onChange={(e) => handleChange('SheerRate', 'value', e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </Form> */}
                    <div className="row d-flex justify-content-between w-75">
                        <Button style={{ width: '100px', height: '40px' }} variant='success' onClick={handleSubmit}>Save</Button>
                        <Button style={{ width: '200px', height: '40px' }} variant='primary' onClick={HandleCopy}>Copy ชั้นบนสุด</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PressureLost
