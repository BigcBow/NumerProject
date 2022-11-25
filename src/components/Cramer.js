import React, { useState } from "react"
import { Table } from "react-bootstrap"
import "./Cramer.css"

function Cramer(){
    const [Isinputs, setIsinput] = useState([])
    const [Ismatrix, setIsmatrix] = useState([])
    const [A, setA] = useState([[]])
    const [X,setX] = useState([])
    const [ans, setAns] = useState(0)
    let calcarmer = (event) => {
        setIsinput(event.target.value)
        var array=[[]]
        var array2=[[]]
        for(let i = 0;i<Number(event.target.value) ;i++){
            array[i] = []
            for(let j = 0; j<Number(event.target.value)+1;j++){
                array[i][j] = `${i}${j}`
            }
            setIsmatrix(array)
        }
        for(let i = 0;i<Number(event.target.value) ;i++){
            array2[i] = []
            for(let j = 0; j<Number(event.target.value);j++){
                array2[i][j] = `${i}${j}`
            }
            setA(array2)
        }
    }
    const calcarmerChange = (Isrow,Iscol,event) => {
        Ismatrix[Isrow][Iscol] = Number(event.target.value)
        A[Isrow][Iscol] = Number(event.target.value)
    }
    let calcarmerCal = () => {
        var array=[[]]
        var array2=[[]]
        for(let i = 0;i<Number(Isinputs) ;i++){
            array[i] = []
            for(let j = 0; j<Number(Isinputs)+1;j++){
                array[i][j] = Number(document.getElementById(""+i+j).value)
            }
        }
        let i=0,j=0
        let x = []
                let k=0
                for(k=0;k<Number(Isinputs);k++){
                    for(i=k+1;i<Number(Isinputs);i++){
                        let temp = array[i][k]/array[k][k]
                        for(j=k+1;j<=Number(Isinputs);j++){
                            array[i][j] = array[i][j] - temp*array[k][j]
                        }
                    }
                }
                for(i=Number(Isinputs)-1;i>=0;i--){
                    x[i] = array[i][Number(Isinputs)]
                    for(j=i+1;j<Number(Isinputs);j++){
                        x[i] = x[i]-array[i][j]*x[j]
                    }
                    x[i] = x[i]/array[i][i]
                }
                let ans = []
                for(i=0;i<Number(Isinputs);i++){
                    console.log(x[i])
                    ans.push(<div>x{i+1}={x[i].toFixed(6)}</div>)
                }    
                setAns(ans)
                setX(x)
                console.log(ans)
        console.log(array)
    }

    return(
        <div className="appc">
            <div className="containerc">
                <h2 className="center">Cramer's Rule</h2>
                    <form>
                        <div>
                            <label>Input Number</label>
                            <input value={Isinputs} onChange={calcarmer}></input>
                            {Ismatrix.map((row , Isrow) => (
                            <tr>
                            {row.map((col,Iscol) => (
                                <td>
                                    <h3>{Isrow}{Iscol}</h3>
                                    <input id={""+Isrow+Iscol} onChange={(event) => calcarmerChange(Isrow,Iscol,event)}></input>
                                </td>
                                
                                )
                            )
                            }
                            </tr>
                            )
                        )}
                            
                        </div>
                    </form>
                    <div className="center">
                        <h3>Answer : {Isinputs}</h3>
                        <button className="btn" type="submit" onClick={calcarmerCal}>Submit</button>  
                        <div>{ans}</div>
                        <Table>
                            {A.map((e,index)=>{
                               var arr=0
                                return(
                                    <tr>
                                        {X.map((e2,index2)=>{
                                            arr+=e2*A[index][index2]
                                        return(<td>
                                        
                                        <h3>({e2}){A[index][index2]}={e2*A[index][index2]}</h3>
                                        </td> 
                                        )
                                     
                            })}
                                <h3>={arr}</h3>
                                    </tr>
                                )
                            
                                })}
                        </Table>
                    </div>
            </div>
        </div>       
    );
}

export default Cramer