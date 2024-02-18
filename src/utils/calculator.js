// src/utils/calculator.js

export function PressureCal(data) {
    let total_layers =10;
    let total_pressure =0; //psi
    let total_thickness = 0;
    let pore_pressure = 0 ;
    let fracture_pressure = 0 ;
    let pressure =0;
    let result = [];
    for (let i of data) {
        pressure = 0.433 * parseFloat(i.sg) * parseFloat(i.thickness);
        total_pressure += pressure ;
        total_thickness += parseFloat(i.thickness);
        pore_pressure = total_pressure / total_thickness; //psi/ft
        fracture_pressure = (1/3)*(1+2*pore_pressure); 
        result.push({
            litho: i.litho,
            thickness: i.thickness,
            sg: i.sg,
            pressure: pressure,
            total_pressure: total_pressure,
            total_thickness: total_thickness,
            pore_pressure: pore_pressure,
            fracture_pressure: fracture_pressure
        });
    }
    return result;
   
}

export function subtractNumbers(a, b) {
  return a - b;
}


export function isTurbulentPipe(density, viscosity, velocity, diameter, tow) {
    // แปลงหน่วย
    

    // คำนวณ Reynolds number
    const reynoldsNumber = (928*density * velocity * diameter) /  viscosity;
    console.log("reynoldsNumber",reynoldsNumber);
    // ตรวจสอบลักษณะการไหล
    if (reynoldsNumber < 2300) {
        return "laminar";
    } else {
        return "turbulent";
    }
}


export function isTurbulentAnular(density, viscosity, velocity, diameter2,diameter1, tow) {
    // แปลงหน่วย
  
    let diameter = (diameter2-diameter1)

    // คำนวณ Reynolds number
    const reynoldsNumber = ( 757*density * velocity * diameter) / viscosity;
    console.log(velocity,reynoldsNumber);
    // ตรวจสอบลักษณะการไหล
    if (reynoldsNumber < 2300) {
        return "laminar";
    } else {
        return "turbulent";
    }
}
export function pipeVelocity(q, d) {


    // คำนวณความเร็วการไหล
    const v = q / (2.448*Math.pow(d,2));

    return v ; // m/s to ft/s
    }
export function annulusVelocity(q, d2, d1) {

// คำนวณความเร็วการไหล
const v = q / (2.448 * (Math.pow(d2 , 2) - Math.pow(d1 , 2)));

return v ; // m/s to ft/s
}

// คำนวน Pressure Lost
export function pipeLoss (density,  viscosity ,flowrate , diameter,tow) {
    let velocity  = pipeVelocity(flowrate,diameter);
    
    if (isTurbulentPipe(density,viscosity,velocity,diameter,tow) == 'turbulent') {
        let type = 'turbulent';
        let loss = (Math.pow(density,0.75)*Math.pow(velocity,1.75)*Math.pow(viscosity,0.25))/(1800*Math.pow(diameter,1.25));
         return {
            type:type,
            lossRate:loss
        };
    }else {
        let type = 'laminar';
        let loss = ((viscosity*velocity)/(1500*Math.pow(diameter,2))) + ((tow)/(225*diameter));
        return {
            type:type,
            lossRate:loss
        };
    }
}

export function anulasLoss (density,  viscosity ,flowrate , diameter2,diameter1,tow) {

    let velocity  = annulusVelocity(flowrate,diameter2,diameter1);
   
    if (isTurbulentAnular(density,  viscosity ,velocity , diameter2,diameter1,tow) == 'turbulent'){
        let type = 'turbulent';
     
        let loss = (Math.pow(density,0.75)*Math.pow(velocity,1.75)*Math.pow(viscosity,0.25))/(1396*(Math.pow(diameter2-diameter1,1.25)));
           return {
            type:type,
            lossRate:loss
        };
    }else {
        let type = 'laminar';
        let loss =((viscosity*velocity)/(1000*Math.pow(diameter2-diameter1,2))) + ((tow)/(200*(diameter2-diameter1)));
           return {
            type:type,
            lossRate:loss
        };
    }
}

export  function mudvolCal (CasingData , EquipmentData ) {

    let dpVol = 0;
    let dcVol = 0;
    let dcAhVol = 0;
    let dpAhVOl = 0;
    let dpAcVol = 0;
    let i =0;
    let beforeID = 0;
    let beforeH = 0;
    let mudVol = [];
    CasingData.forEach(element => {

        //  หน่วย gal/ft

        if (element.type === 'Conductor'){
        dpVol = Vol(EquipmentData[0].id,1,0.051612);
        dcVol = Vol(EquipmentData[1].id,1,0.051612);
        dcAhVol = anularVol(element.hd,EquipmentData[1].od,1,0.051612);
        dpAhVOl = anularVol(element.hd,EquipmentData[0].od,1,0.051612);
        dpAcVol =  0;

        }else{
        dpVol = Vol(EquipmentData[0].id,1,0.051612);
        dcVol = Vol(EquipmentData[1].id,1,0.051612);
        dcAhVol = anularVol(element.hd,EquipmentData[1].od,1,0.051612);
        dpAhVOl = anularVol(element.hd,EquipmentData[0].od,1,0.051612);
        dpAcVol =  anularVol(beforeID,EquipmentData[0].od,1,0.051612);
        }
        beforeID = element.id;
        mudVol.push({
        dpVol ,
        dcVol ,
        dcAhVol ,
        dpAhVOl ,
        dpAcVol ,
        });
      
    }
    
    );

    return mudVol;
}

export function anularVol(outside,inside,length,tran) {
    return (Math.PI * 0.25 * ( Math.pow(outside,2) - Math.pow(inside,2)) * length * tran);
}



export function Vol(inside,length,tran) {
    return (Math.PI * 0.25 * ( Math.pow(inside,2)) * length * tran) ;
}

export function CementvolCal (CasingData,CementGrede) {

    let CementData = [];
    let beforeSD = 0;
    let beforeID =0;
    let v1 =0;
    let v2 = 0;
    let v3  =0 ;
    let v4 = 0;
    let vt =0;
    let totalSack = 0;
    let waterVol = 0;
    let bentoniteWeight= 0;
    let weight=0;

    CasingData.forEach(row => {
        
        v1 = anularVol(beforeID,row.od,beforeSD,0.00694);
        v2 = anularVol(row.hd,row.od,row.dd-beforeSD,0.00694);
        v3 = Vol(row.od,row.dd-row.sd,0.00694);
        v4 = Vol(row.od,40,0.00694)
        vt = v1 + v2 +v3 +v4 ;
        totalSack = vt / CementGrede.vol;
        weight = vt*CementGrede.weight*7.48;
        waterVol = totalSack*CementGrede.waterRatio;
        bentoniteWeight = vt*CementGrede.weight*7.48*CementGrede.bentoniteRatio*0.01;
        
        CementData.push({
            type:row.type,
            Volume:vt,
            weight:weight,
            totalSack:totalSack,
            waterVol:waterVol,
            bentoniteWeight:bentoniteWeight
        });
        beforeSD = row.sd;
        beforeID = row.id; 
    });
    return CementData;
    
}

export function PressureAssembly (CasingData,EquipmentData) {
        let casingSize_before = 0;
        let i = 0;
        let result = [];
        let drill_pipe = 0;
        let drill_collar = 0;
        let drill_collar_and_hole = 0;
        let drill_pipe_and_hole = 0;
        let drill_pipe_and_casing = 0;
        CasingData.forEach(element => {
         
            if (i == 0){
             drill_pipe = pipeLoss(element.mudweight,element.viscosity,element.flowrate,EquipmentData[0].id,element.shear);
             drill_collar = pipeLoss(element.mudweight,element.viscosity,element.flowrate,EquipmentData[1].id,element.shear);
             drill_collar_and_hole = anulasLoss(element.mudweight,element.viscosity,element.flowrate,element.hd,EquipmentData[1].od,element.shear);
             drill_pipe_and_hole = anulasLoss(element.mudweight,element.viscosity,element.flowrate,element.hd,EquipmentData[0].od,element.shear);
             drill_pipe_and_casing = 0;
            }else{
             drill_pipe = pipeLoss(element.mudweight,element.viscosity,element.flowrate,EquipmentData[0].id,element.shear);
             drill_collar = pipeLoss(element.mudweight,element.viscosity,element.flowrate,EquipmentData[1].id,element.shear);
             drill_collar_and_hole = anulasLoss(element.mudweight,element.viscosity,element.flowrate,element.hd,EquipmentData[1].od,element.shear);
             drill_pipe_and_hole = anulasLoss(element.mudweight,element.viscosity,element.flowrate,element.hd,EquipmentData[0].od,element.shear);
             drill_pipe_and_casing = anulasLoss(element.mudweight,element.viscosity,element.flowrate,casingSize_before,EquipmentData[0].od,element.shear);
            }
               i = i+1;
               casingSize_before=element.id;
            result.push({
                type:element.type,
                drill_pipe:drill_pipe,
                drill_collar:drill_collar,
                drill_collar_and_hole:drill_collar_and_hole,
                drill_pipe_and_hole:drill_pipe_and_hole,
                drill_pipe_and_casing:drill_pipe_and_casing,
                
            })
        });
        return result;
}


