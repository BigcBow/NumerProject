import { Line } from "react-chartjs-2"
import React from "react"
import {Chart as ChartJS} from 'chart.js/auto'

function LineChart({chartdata}){
    return <Line data={chartdata}></Line>;
}
export default LineChart;
