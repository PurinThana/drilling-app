import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { pipeLoss } from '../../utils/calculator';
import Table from 'react-bootstrap/Table';
function SubpressureCal() {
    const [data, setData] = useState({
        density: 0,
        viscosity: 0,
        sheer: 0,
        flowrate: 0,
        diameter1: 0,
        diameter2: 0,
    });

    const [FlowBehav, setFlowBehav] = useState('pipe');

    const [result, setResult] = useState({
        type: '',
        lossRate: 0,
    });

    useEffect(() => {


    }, [data]);



    const handleonChang = (e) => {
        const update = data;

        update[e.target.name] = e.target.value;
        setData(update);
        console.log(e.target.name, data);
    }

    const handleRadioChange = (event) => {
        setFlowBehav(event.target.value);
    };

    const handleCal = () => {
        setResult(pipeLoss(data.density, data.viscosity, data.flowrate, data.diameter1, data.sheer));
        console.log(result);
    }
    return (
        <div>
            {/* Pipe */}
            <Form.Check
                inline
                label="Anular"
                name="group1"
                type='radio'
                value='anular'
                checked={FlowBehav === 'anular'}
                onChange={handleRadioChange}
            />
            <Form.Check
                inline
                label="Pipe"
                name="group1"
                type='radio'
                value='pipe'
                checked={FlowBehav === 'pipe'}
                onChange={handleRadioChange}
            />
            {FlowBehav === 'pipe' ? (
                <Form className='row'>
                    <Form.Group className='col-2'>
                        <Form.Label>Mud dendity (ppg) </Form.Label>
                        <Form.Control
                            type='number'
                            step={0.001}
                            name='density'
                            onChange={(e) => { handleonChang(e) }}
                        />
                    </Form.Group>

                    <Form.Group className='col-2'>
                        <Form.Label>Viscosity (cP) </Form.Label>
                        <Form.Control
                            type='number'
                            step={0.001}
                            name='viscosity'
                            onChange={(e) => { handleonChang(e) }}
                        />
                    </Form.Group>

                    <Form.Group className='col-2'>
                        <Form.Label>SheerRate (lb / 100ft2) </Form.Label>
                        <Form.Control
                            type='number'
                            step={0.001}
                            name='sheer'
                            onChange={(e) => { handleonChang(e) }}
                        />
                    </Form.Group>

                    <Form.Group className='col-2'>
                        <Form.Label>Flowrate (GPM) </Form.Label>
                        <Form.Control
                            type='number'
                            step={0.001}
                            name='flowrate'
                            onChange={(e) => { handleonChang(e) }}
                        />
                    </Form.Group>

                    <Form.Group className='col-2'>
                        <Form.Label>Diameter (inch) </Form.Label>
                        <Form.Control
                            type='number'
                            step={0.001}
                            name='diameter1'
                            onChange={(e) => { handleonChang(e) }}
                        />
                    </Form.Group>
                </Form>
            ) : (
                /* Annular form fields */
                <Form className='row'>
                    <Form.Group className='col-2'>
                        <Form.Label>Mud dendity (ppg) </Form.Label>
                        <Form.Control
                            type='number'
                            step={0.001}
                            name='density'
                            onChange={(e) => { handleonChang(e) }}
                        />
                    </Form.Group>

                    <Form.Group className='col-2'>
                        <Form.Label>Viscosity (cP) </Form.Label>
                        <Form.Control
                            type='number'
                            step={0.001}
                            name='viscosity'
                            onChange={(e) => { handleonChang(e) }}
                        />
                    </Form.Group>

                    <Form.Group className='col-2'>
                        <Form.Label>SheerRate (lb / 100ft2) </Form.Label>
                        <Form.Control
                            type='number'
                            step={0.001}
                            name='sheer'
                            onChange={(e) => { handleonChang(e) }}
                        />
                    </Form.Group>

                    <Form.Group className='col-2'>
                        <Form.Label>Flowrate (GPM) </Form.Label>
                        <Form.Control
                            type='number'
                            step={0.001}
                            name='flowrate'
                            onChange={(e) => { handleonChang(e) }}
                        />
                    </Form.Group>

                    <Form.Group className='col-2'>
                        <Form.Label>Diameter (inch) </Form.Label>
                        <Form.Control
                            type='number'
                            step={0.001}
                            name='diameter1'
                            onChange={(e) => { handleonChang(e) }}
                        />
                    </Form.Group>

                    <Form.Group className='col-2'>
                        <Form.Label>Diameter (inch)  (out)</Form.Label>
                        <Form.Control
                            type='number'
                            step={0.001}
                            name='diameter2'
                            onChange={(e) => { handleonChang(e) }}
                        />
                    </Form.Group>
                </Form>
            )}

            <Button variant='primary' onClick={handleCal} className='mt-1'>คำนวณ</Button>

            <Table striped bordered hover className='w-75'>
                <thead>
                    <tr>
                        <th>Flow type</th>
                        <th>Pressure Loss (psi/ft)</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{result.type == '' ? ('No data yet') : (result.type)}</td>
                        <td>{result.loss == 0 ? ('No data yet') : (result.lossRate)}</td>

                    </tr>

                </tbody>
            </Table>

        </div >
    )
}

export default SubpressureCal
