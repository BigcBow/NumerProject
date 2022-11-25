import React, { useState } from "react"
import "./Bisection.css"
import * as math from "mathjs";
import { Line } from "react-chartjs-2"
import axios from "axios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {faker} from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const i_array = []
const x0_array = []
const x1_array = []
const ans_array = []  



function calbis_method(l,r,equation){
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

function Bisection(){

    const [equation, setEquation] = useState('')
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [ans, setAns] = useState('')
    const [api, setApi] = useState([])

    async function dataapi(e){
        e.preventDefault()
        //axios.get("http://localhost:3000/data").then((response)=>{console.log(response)})
        var da = await axios.get("http://localhost:3000/data")
        setApi(da.data)
    }
    
    function dataapito(e){
        var dataa = null;
        for(let i=0;i<api.length;i++){
            if(api[i].id == e.target.value){
                dataa = api[i]
                break
            }
        }
        if(dataa){
            setEquation(dataa.eqution)
            console.log(equation)
            setLeft(dataa.xL)
            console.log(left)
            setRight(dataa.xR)
            console.log(right)
        }
    }

    let calbis = (event) => {
        event.preventDefault()

        setAns(calbis_method(left,right,equation));
        
          
        //let ans1 = calbis_method(left,right,equation);
        //console.log(ans1);
        //setAns(ans1.toFixed(6));
        /*let ans = (parseInt(left) + parseInt(right))
        setAns(ans)*/
    }
    const labelArr1 = Object.values(i_array)
    const labelArr2 = Object.values(x1_array)
    const labelArr3 = Object.values(ans_array)
    console.log(labelArr1)
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      
    const labels = labelArr1
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labelArr3,
            //data: labels.map(() => faker.datatype.number({ labelArr1 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
    let reload = () => {
        window.location.reload()
    }

    return(
        <div className="app">
            <div className="container">
                <h2 className="center">Bisection</h2>
                    <form onSubmit={calbis}>
                    <div>
                            <select onChange={dataapito}>
                                {(() => {
                                    var postss = []
                                    for(let i=0;i<api.length;i++){
                                        postss.push(<option>{api[i].id}</option>)
                                    }
                                    return postss
                                })()}
                            </select>
                        </div>
                        <div>
                            <label>Input Equation</label>
                            <input value={equation} onChange={(event) => setEquation(event.target.value)}></input>
                        </div>
                        <div>
                            <label>Input Number Left</label>
                            <input value={left} onChange={(event) => setLeft(event.target.value)}></input>
                        </div>
                        <div>
                            <label>Input Number Right</label>
                            <input value={right} onChange={(event) => setRight(event.target.value)}></input>
                        </div>
                        <div>
                            <button className="btn" type="submit">Submit</button>
                            <button className="btn btn-outline" type="submit" onClick={reload}>Reload</button>
                        </div>
                        <div>
                            <button className="btn btn-outline" onClick={dataapi}>API</button>
                        </div>
                    </form>

                    <div className="center">
                        <h3>Equation : {equation}</h3>
                        <h3>Answer : {ans}</h3>
                        
                    </div>
                    
            </div>
            <Line options={options} data={data}/>
        </div>
        
        
    );
}

export default Bisection