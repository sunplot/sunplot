import React from 'react'
import d3 from "d3";
import {scaleOrdinal} from "d3-scale"
import {arc, pie} from "d3-shape"

export default class PieChart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            width: 800,
            height: 600,
        }
    }

    render(){
        let data = []
        if(this.props.data!== undefined && this.props.data['result-set']!== undefined){
            data = this.props.data['result-set'].docs
        }

       const height = 500
       const width = 960
       const radius = Math.min(width, height) / 2
       const color = scaleOrdinal(["#00BCD4","#FFD54F","#00838F","#8BC34A", "#CDDC39", "#40C4FF", "#9FA8DA", "#18FFFF", "#66BB6A", "#FFF176"]);
       const pieChart = pie().sort(null).value(function(d) { return Object.values(d)[1] })
       const path = arc().outerRadius(radius - 10).innerRadius(0)
       const label = arc().outerRadius(radius - 40).innerRadius(radius - 40);
       return (
           <svg width={width} height={height}>
               <g transform={`translate(${width/2},${height/2})`}>
               {pieChart(data).map((d,i) =>(
                   <g key={i} className="arc" >
                        <path d={path(d)} fill={
                            color(i)
                        } />
                        <text transform={`translate(${label.centroid(d)})`} dy="0.35em">{Object.values(d.data)[0]}</text>
                   </g>
               ))}
               </g>
           </svg>
       )
   }

}
