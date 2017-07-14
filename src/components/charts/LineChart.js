import React from 'react'
import {d3,extent,max} from "d3";
import {scaleLinear,scaleTime} from "d3-scale"
import {line} from "d3-shape"
import { axisBottom, axisLeft } from 'd3-axis';

export default class LineChart extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        var data=[
           {label:'michael',count:180},
           {label:'joe',count:250},
           {label:'gethin',count:150},
           {label:'andy',count:496},
           {label:'rita',count:140}
       ];

       const margin = {top: 20, right: 20, bottom: 50, left: 70}
       const width = 960 - margin.left - margin.right
       const height = 500 - margin.top - margin.bottom

       const x = scaleTime().range([0, width]);
       const y = scaleLinear().range([height, 0]);
       const valueline = line()
                            .x(function(d) { return x(d.label); })
                            .y(function(d) { return y(d.count); })

        x.domain(extent(data, function(d) { return d.label; }))
        y.domain([0, max(data, function(d) { return d.count; })])

        const xTicks = scaleTime().ticks()
        const xTickElements = xTicks.map((tick, index) => {
            const position = x(tick)
            const translate =`translate(0, ${position})`
            return (
              <g key={`${tick}+${index}`} className="tick" transform={translate}>
                <text>{tick}</text>
              </g>
            )
        })
        const a = ["hello","good"]

        const mytest = a.map((msg,index) => {
            console.log(msg,index)
            return(
                <h1 key={"h"+index}>{msg}</h1>
            )
        })
       return (

           <div>
               <svg id="lineChartMain" width={width} height={height}>
                   <g transform = {`translate(${margin.left},${margin.top})`}>
                       <path className="line" d={valueline(data)} strokeLinecap="round"/>
                       <g transform = {`translate(0, ${height})`} >
                           <g>

                           </g>
                           <text transform = {`translate(${(width/2)},${height + margin.top + 20})`} style={{textAnchor: "middle"}}>Date</text>
                       </g>
                       <text transform = "rotate(-90)" y={0 - margin.left} x={0 - (height / 2)} dy="1em" style={{textAnchor: "middle"}}>Value</text>
                   </g>

               </svg>
           </div>
       )
{/*return(
<svg width="960" height="500">
<g transform="translate(70,20)">
<path class="line" d="M870,390.71247819184885L845.8333333333334,393.517281486255L773.3333333333333,384.7176335601905L749.1666666666667,369.3756974678968L725,363.09023466356507L700.8333333333334,341.9494522421137L676.6666666666666,317.3347688728919L604.1666666666666,271.18730647721736L580,196.53222891092847L555.8333333333333,130.36590541156505L531.6666666666667,62.536975622023476L507.50000000000006,37.9155336906465L435,20.951542681105934L410.8333333333333,9.097024660893112L386.66666666666663,6.778837841661016L362.5,5.264919918897249L338.3333333333333,0L241.66666666666669,1.7234333495748615L217.5,8.056206088993008L193.33333333333331,4.670166449240014L169.16666666666666,11.895069393143956L96.66666666666666,24.79040598525694L72.5,17.822328403250367L48.33333333333333,12.57768417081877L24.166666666666664,14.699872687550112L0,19.76879430394672">
</path>

<g transform="translate(0,430)" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
<path class="domain" stroke="#000" d="M0.5,6V0.5H870.5V6"></path>

<g class="tick" opacity="1" transform="translate(24.666666666666664,0)">
<line stroke="#000" y2="6"></line>
<text fill="#000" y="9" dy="0.71em">Tue 27</text></g>

<g class="tick" opacity="1" transform="translate(870.5,0)">
<line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">May</text>
</g>
</g>

<text transform="translate(435 ,470)" style={{textAnchor: "middle"}}>Date</text>

<g fill="none" font-size="10" font-family="sans-serif" text-anchor="end">
<path class="domain" stroke="#000" d="M-6,430.5H0.5V0.5H-6"></path>
<g class="tick" opacity="1" transform="translate(0,430.5)">
<line stroke="#000" x2="-6"></line>
<text fill="#000" x="-9" dy="0.32em">0</text></g><g class="tick" opacity="1" transform="translate(0,396.7071892240227)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">50</text></g><g class="tick" opacity="1" transform="translate(0,362.9143784480455)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">100</text></g><g class="tick" opacity="1" transform="translate(0,329.1215676720683)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">150</text></g><g class="tick" opacity="1" transform="translate(0,295.328756896091)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">200</text></g><g class="tick" opacity="1" transform="translate(0,261.5359461201138)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">250</text></g><g class="tick" opacity="1" transform="translate(0,227.74313534413656)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">300</text></g><g class="tick" opacity="1" transform="translate(0,193.95032456815932)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">350</text></g><g class="tick" opacity="1" transform="translate(0,160.15751379218204)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">400</text></g><g class="tick" opacity="1" transform="translate(0,126.36470301620488)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">450</text></g><g class="tick" opacity="1" transform="translate(0,92.57189224022761)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">500</text></g><g class="tick" opacity="1" transform="translate(0,58.77908146425034)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">550</text></g><g class="tick" opacity="1" transform="translate(0,24.986270688273123)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">600</text></g></g>
<text transform="rotate(-90)" y="-70" x="-215" dy="1em" style={{textAnchor: "middle"}}>Value</text>

</g></svg>
)*/}
}
}
