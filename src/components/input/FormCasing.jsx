import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Sidebar from '../Sidebar';
function FormCasing() {

    // variant here .....
    const [casingData, setCasingData] = useState(() => {
        if (localStorage.getItem('casingData') !== '' && localStorage.getItem('casingData') !== '""') {
            let SaveCasingData = localStorage.getItem('casingData');
            SaveCasingData = JSON.parse(SaveCasingData);
            console.log(SaveCasingData);
            return SaveCasingData;
        } else {
            return [{
                type: '',
                id: 0,
                od: 0,
                hd: 0,
                dd: 0,
                sd: 0,
                flowrate: 0,
                mudweight: 0,
                shear: 0,
                viscosity: 0

            }];
        }

    });
    console.log(casingData);
    const [casingName, setCasingName] = useState([casingData[0].type]);
    const [casingCount, setCasingCount] = useState(casingData.length);

    // variant end .....

    //Function here ..... 
    const handleAddClick = () => {
        setCasingData([...casingData, {
            type: '',
            id: 0,
            od: 0,
            hd: 0,
            dd: 0,
            sd: 0,
            flowrate: 0,
            mudweight: 0,
            shear: 0,
            viscosity: 0

        }]);
        setCasingCount(casingCount + 1);
        setCasingName([...casingName, ''])

    };

    const handleChange = (index, fieldName, value) => {
        const updatedCasingData = [...casingData];
        const updateCasingName = [...casingName];

        updatedCasingData[index][fieldName] = value;
        updateCasingName[index] = casingData[index].type;


        console.log(casingData[index].type);
        setCasingData(updatedCasingData);


        setCasingName(updateCasingName);

    };

    const handleOnSubmit = () => {
        localStorage.setItem('casingData', JSON.stringify(casingData));
    }

    const handleDelete = (index) => {
        const deleteCasingData = [...casingData];
        deleteCasingData.splice(index, 1);
        setCasingData(deleteCasingData);


        console.log(deleteCasingData);
    }
    // function end .....
    return (
        <div className='container mt-2 main-component'>
            <div className="d-flex">
                <div className="">
                    <Sidebar />
                </div>
                <div className="w-75">
                    <h2 className='title'>ข้อมูลท่อกรุ</h2>
                    <Form className='row'>
                        {casingData.map((data, index) => (
                            <div className="row " key={index} >
                                <div className="row">
                                    <h4>Casing Type : {data.type} No : {index + 1}</h4>
                                </div>
                                <Form.Group className='col-4 mb-3'>
                                    <Form.Label> <h6>ประเภทท่อกรุ</h6></Form.Label >
                                    <Form.Select aria-label="Default select example"
                                        name='type'
                                        defaultValue={data.type === '' ? 'เลือกประเภทท่อกรุ (Casing)' : data.type}
                                        onChange={(e) => handleChange(index, 'type', e.target.value)}>
                                        <option>เลือกประเภทท่อกรุ (Casing)</option>
                                        <option value="Conductor">Conductor</option>
                                        <option value="Surface">Surface</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Production">Production</option>
                                        <option value="Injection">Injection</option>
                                    </Form.Select>
                                </Form.Group >

                                <Form.Group className="col-4  mb-3" >
                                    <Form.Label> <h6>Inside Diameter (inch)</h6></Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.001"
                                        name='id'
                                        defaultValue={data.id === '' ? '' : data.id}
                                        onChange={(e) => handleChange(index, 'id', e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="col-4  mb-3" >
                                    <Form.Label> <h6>Outside Diameter (inch)</h6></Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.001"
                                        name='od'
                                        defaultValue={data.od === '' ? '' : data.od}
                                        onChange={(e) => handleChange(index, 'od', e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="col-4  mb-3" >
                                    <Form.Label> <h6>Hole Diameter (inch)</h6></Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.001"
                                        name='hd'
                                        defaultValue={data.hd === '' ? '' : data.hd}
                                        onChange={(e) => handleChange(index, 'hd', e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="col-4  mb-3" >
                                    <Form.Label> <h6>Drilling Depth (ft)</h6></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='dd'
                                        defaultValue={data.dd === '' ? '' : data.dd}
                                        onChange={(e) => handleChange(index, 'dd', e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="col-4  mb-3" >
                                    <Form.Label> <h6>Setting Depth (ft)</h6></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='sd'
                                        defaultValue={data.sd === '' ? '' : data.sd}
                                        onChange={(e) => handleChange(index, 'sd', e.target.value)}
                                    />
                                </Form.Group>
                                <div className="col-12 d-flex justify-content-end">
                                    <Button style={{ width: '100px' }} variant='danger' onClick={() => handleDelete(index)}>Delete</Button>
                                </div>


                            </div>

                        ))}

                    </Form >
                    <div className="d-flex justify-content-between mt-2">
                        <Button variant='primary' onClick={handleAddClick}>add</Button>
                        <Button variant='success' className='me-4' onClick={handleOnSubmit}>Save</Button>
                    </div>

                    <div className="foot mt-5">
                    </div>
                </div>
            </div>

        </div >
    )
}

export default FormCasing


