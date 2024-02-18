import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function ScatterChart() {
    const [output, setOutput] = useState(null);


    useEffect(() => {

        if (localStorage.getItem('resdata') !== null) {
            let savedresdata = localStorage.getItem('resdata');
            savedresdata = JSON.parse(savedresdata);
            setOutput(savedresdata);
        }

    }, []);

    if (output === null || output.resdata === '') {
        return (
            <div>
                <h4>No data for plot!</h4>
            </div>
        );
    } else {

        const totalThicknessData = output.resdata.map(entry => entry.total_thickness);
        const porePressureData = output.resdata.map(entry => entry.pore_pressure);
        const fracturePressureData = output.resdata.map(entry => entry.fracture_pressure);



        const plotData = [
            {
                x: porePressureData,
                y: totalThicknessData,
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Pore Pressure',
            },
            {
                x: fracturePressureData,
                y: totalThicknessData,
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Fracture Pressure',
            },
        ];

        const layout = {
            title: `Total Thickness vs Pore Pressure and Fracture Pressure for ${output.resname}`,
            xaxis: { title: 'Pressure' },
            yaxis: { title: 'Depth', autorange: 'reversed' },
        };

        return (
            <div className='scatter-plot'>
                <Plot data={plotData} layout={layout} />
            </div>
        );
    }


}

export default ScatterChart;
