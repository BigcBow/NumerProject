import { useState } from "react"
import { Container,Table,Col,Row, Button } from "react-bootstrap"
import { evaluate } from "mathjs";
import { Line } from "react-chartjs-2";

const TestRe=()=>{
    const[X,setX] = useState([])
    const[N,setN] = useState(0)
    const[equation,setEquation] = useState("x^2")
    const[gx,setgx] = useState(0)
    const[A1,setA1] = useState(0)

    const cal=(X)=>{
        var fx , scope ;
        scope={
            X:X,
            x:X,
            y:X,
            Y:X
        }
        fx = evaluate(equation,scope) ;
        return fx;
    }
    const calregression=(X, a0, a1)=>{
        var gx , scope ;
        gx = a0+a1*X;
        return gx;
    }
    const[state,setstate] = useState({labels: X.map((element,index)=>{return index+1;}),
    datasets: [
      {
        label: 'Y',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#E9967A',
        borderColor: '#E9967A',
        borderWidth: 2,
        data: X.map((element,index)=>{return cal(index+1);})
      }
    ]
});
const[restate,setrestate] = useState({labels: X.map((element,index)=>{return index+1;}),
    datasets: [
      {
        label: 'Y',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#E9967A',
        borderColor: '#E9967A',
        borderWidth: 2,
        data: X.map((element,index)=>{return cal(index+1);})
      }
    ]
});

    

    const LinearRegression = () => {
        var i;
        var data = [];
        var obj={};
        for(i=0;i<N;i++){
            obj = {
                X:i+1,
                Y:cal(i+1),
            }
            data.push(obj);
        }
        var n = data.length
        var sumX = 0;
        var sumY = 0;
        var sumXY = 0;
        var sumX2 = 0;
        var st = 0;
        var sr = 0;
        var obj={};
        var A= new Array(N).fill(0) ;

        for(i=0;i<n;i++){
            sumX += data[i].X;
            sumY += data[i].Y;
            sumXY += data[i].X*data[i].Y;
            sumX2 += data[i].X*data[i].X;
        }
    
        var xm = sumX/n;
        var ym = sumY/n;
        var a1 = (n*sumXY-sumX*sumY)/(n*sumX2-sumX*sumX)
        var a0 = ym - a1*xm;
        var a = new Array(2).fill(0);
        a[0] = a0;
        a[1] = a1;
        
        for(i =0;i<n;i++){
            st += Math.pow((data[i].Y-ym),2);
            sr += Math.pow((data[i].Y-a1*data[i].X-a0),2);
        }
    
        var syx = Math.pow((sr/(n-2)),0.5);
        var r2 = (st-sr)/st;
        return a;
    }
    
    
    const e=(even)=>{
        setN(even.target.value);
        setX(new Array(parseInt(even.target.value)).fill(0)) ;
        var A= new Array(parseInt(even.target.value)).fill(0) ;
        setstate({labels: A.map((element,index)=>{return index+1;}),
    })        
    }

    const click=()=>{
        var a = LinearRegression();
        console.log("a0 = "+a[0]+" a1 = "+a[1])
        setgx(a[0]+a[1])
        var A= new Array(parseInt(N)).fill(0) ;
        setrestate({labels: A.map((element,index)=>{return index+1;}),
        datasets: [
            {
                label: 'Y',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#E9967A',
                borderColor: '#E9967A',
                borderWidth: 2,
                data: A.map((element,index)=>{return cal(index+1);})
              },
      {
        label: 'YRegression',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#52BE80 ',
        borderColor: '#52BE80 ',
        borderWidth: 2,
        data: A.map((element,index)=>{return calregression(index+1, a[0], a[1]);})


        
      }
    ]
    })
    }
    const a=(even)=>{
        console.log(even.target.value);
        setEquation(even.target.value);
    }
    return(
        <Container>
           <Row>
            <Col>
            <h1>Linear</h1>
            <input type="number" id="X" value={N} onChange={e} ></input>
            </Col>
           </Row>
           <Button onClick={click}>Calculate</Button>
           <h3>G(x)={gx}</h3>
           <Table striped bordered hover variant="light">
                <thead>
                 <tr>
                     <th width="30%">X</th>
                     <th width="30%">Y</th>
                </tr>
                </thead>
                <tbody>
                        {X.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{cal((index+1))}</td>
                            </tr>)
                        })}
                </tbody>
           </Table>
           <Row>
           <Col>
           <Line
                data={restate}
                options={{
                title:{
                    display:true,
                    text:'Test',
                    fontSize:20
                    },
                legend:{
                display:true,
                position:'right'
                }
            }}
            />
           </Col>
           </Row>
          
        </Container>
        
    )
}

export default TestRe