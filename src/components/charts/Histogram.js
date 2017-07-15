import React from 'react'
import {d3,max,range} from "d3";
import {scaleLinear,scaleTime,scaleOrdinal} from "d3-scale"
import XAxis from './XAxis'
import YAxis from './YAxis'
import Bar from './Bar'

export default class Histogram extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        let data = []
        if(this.props.data!== undefined && this.props.data['result-set']!== undefined){
            data = this.props.data['result-set'].docs
        }
        let margin = {top: 20, right: 20, bottom: 30, left: 45},
        width = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;
        let categories = data.map((d) => Object.values(d)[0])
        //D3 mathy bits
        let ticks = range(0, width, (width / data.length))
        let x = scaleOrdinal().domain(categories).range(ticks)
        let y = scaleLinear().domain([0, max(data, (d) => Object.values(d)[1])]).range([height, 0])
        let bars = []
        let bottom = 450

        data.forEach((datum, index) => {
            bars.push(
                <Bar key={index}
                     x={x(Object.values(datum)[0])}
                     y={bottom - 6 - (height - y(Object.values(datum)[1]))}
                     width={25}
                     height={height - y(Object.values(datum)[1])} />)
        })

        return (
               <svg width="1000" height="800">
                   <YAxis y={40} labels={y.ticks().reverse()} start={15} end={height} />
                   <g className="chart" transform={`translate(${margin.left},${margin.top})`}>
                       { bars }
                       <XAxis x={ bottom } labels={categories} start={0} end={width} />
                   </g>
               </svg>
        )
    }
}
