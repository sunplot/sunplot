import React from 'react'
import {d3,extent,max,range,format} from "d3";
export default class Bar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let style = {
            fill: "00BCD4"
        }
        return(
            <g>
                <rect className="bar" style={style} x={this.props.x} y={this.props.y + 5} width={this.props.width} height={this.props.height} />
            </g>
        )}
}
