import { Link } from 'react-router-dom';
import React,{ useState } from 'react'

function Taylor() {
const [size, setsize] = useState('')
const [matrix, setmatrix] = useState('')

const submit = e =>{
e.preventDefault()
genarate()
}

function genarate(){
let array = []
for(let i=0 ; i<size ; i++){
array[i] = [] //render jsx arr
let temp = []
for(let j=0 ; j<=size ; j++){
temp.push(
<input
id={"column"+i+"row"+j}
/>
)
}
array[i].push(<div class='matrix a'>{temp}</div>)

}

//setmatrix hook
setmatrix({a:array})
}

const cal = e =>{
e.preventDefault()

let step = []
let calmatrix = []
//setmatrix a&b
for(let i=0 ; i<size ; i++){
calmatrix[i] = []
step[i] = []
for(let j=0 ; j<=size ; j++){
//console.log(Number(document.getElementById('column'+j+'row'+j).value))
calmatrix[i].push(Number(document.getElementById('column'+i+'row'+j).value))
}
}
//console.log(calmatrix)

let tempa = calmatrix.map(a=>a.slice()) //line of deep clone array
//calculator
//Forward Elimination
let calstep = []
for(let i=0 ; i<=size ; i++){
//let calstep = []
for(let j=i+1 ; j<size ; j++){
let temp = calmatrix[j][i]/calmatrix[i][i]
//console.log(temp)
for(let k=0 ; k<=size ; k++){
let sol = temp*calmatrix[i][k]
//console.log(sol)
calmatrix[j][k] = calmatrix[j][k]-sol
//console.log(calmatrix[j][k])
for(let l=0 ; l<2 ; l++){
tempa[j][k] = calmatrix[j][k]
calstep.push(temp[j])
console.log(calstep)
}

}
//console.log(calstep)
}

}
//console.log(calstep)
//console.log(calmatrix)
//console.log(tempa)


let arrans = []
arrans[size] = calmatrix[size-1][size]/calmatrix[size-1][size-1]

//Backward Subsitution
for(let i=size-1 ; i>=1 ; i--){
arrans[i] = calmatrix[i-1][size]
for(let j=i+1 ; j<=size ; j++){
let tempind = calmatrix[i-1][j-1]*arrans[j]
//console.log(tempind)
arrans[i] = arrans[i]-tempind
//console.log(arrans)
}
arrans[i] = arrans[i]/calmatrix[i-1][i-1]
}
//console.log(calmatrix)
//console.log(arrans)

//output on page
let ans = []
for(let i=1 ; i<arrans.length ; i++){
ans.push(<div>x{i+1}={arrans[i].toFixed(6)}</div>)
}
setmatrix({a:matrix.a,b:ans})
}


return (
<div className='gausselimination'>
<h1>GaussElimination</h1>
<form>
<label for="size">Enter size is here {'->'}</label>
<input
name="size"
type="size"
onChange={event => setsize(event.target.value)}
value={size} /><br/><br/>
<button onClick={submit}>create</button><br/><br/>

</form><br/><br/>
<div className='matrix f'>
<div className='a'>
{
matrix.a
}
</div>
</div><br/><br/>
<button onClick={cal}>Cal</button><br/><br/>
<div>
{
matrix.b
}
</div>
<div className='matrix f'>
<div>
{
matrix.c
}
</div>
</div><br/>
</div>
)
}

export default Taylor