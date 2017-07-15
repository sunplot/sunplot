import React from 'react'
import {d3,range} from 'd3';

export default class YAxis extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    //D3 mathy bits
    let ticks = range(0, this.props.end, (this.props.end / this.props.labels.length))

    let lines = []
        ticks.forEach((tick, index) => {
        lines.push(<line key={"line"+index} style={{stroke: "00BCD4",strokeWidth: "1px"}} y1={tick} x1={this.props.y} y2={tick} x2={this.props.y - 4}  />)
    })

    let columnLables = []
    ticks.forEach((tick, index) => {
      columnLables.push(<text
          key={"tick"+index}
          style={{ fontSize: "0.8em",fill: "#00BCD4", textAnchor: "end"}}
          y={tick + 6}
          x={this.props.y - 6}
          fontFamily="Verdana" >{this.props.labels[index]}</text>)
    })
    return(
      <g>
	      <g className="y_labels" transform={`translate(${-5},${17})`}>
              //y-axis
              <line x1={this.props.y} y1={this.props.start} y2={this.props.end} x2={this.props.y} style={{stroke: "00BCD4",strokeWidth: "1px"}} />
              <g className="y_labels" transform={`translate(${-5},${51})`}></g>
              
              { lines }
          </g>
      </g>
    )
  }
}
