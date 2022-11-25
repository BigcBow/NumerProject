
import React, { useState } from "react"
import LineChart from "./LineChart"
import { Line } from "react-chartjs-2"
/*import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, 
    ategoryScale, LinearScale, PointElement, Chart, CategoryScale, Filler} from 'chart.js'
ChartJS.register(
    Title, Tooltip, LineElement, Legend, CategoryScale,
    LinearScale, PointElement, Filler
)*/


  
const i_array = []
const x0_array = []
const x1_array = []
const ans_array = []

export default function calbis_method(l,r,equation){
    //console.log("l"+l);
    //console.log("equation"+ equation);
    
    let Error_rate = 0.0000001
    function func(x){
        const eq2 = math.parse(equation)
        const eq3 = eq2.compile()
        let scope = {x}
        return eq3.evaluate(scope) 
    }
    function mid(l,r){
        let mids = (l+r)/2;
        return mids;
    }
    let i = 0
    let xm = l;

    while((math.abs(r-l)/r)*100 >= Error_rate){
        
        x0_array.push(l);
        x1_array.push(r);
        
        xm = mid(l,r);
        if(func(xm)===0.0){
            break;
        }
        else if(func(xm)*func(l)<0){
            r = xm;
        }
        else{
            l = xm;
        }
        i++
        i_array.push(i);
        ans_array.push(xm);
    }
    return xm;
    
}




