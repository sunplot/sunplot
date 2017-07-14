import React from 'react'
import {d3} from 'd3';

export default class XAxis extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const translate = "translate(0,"+(this.props.height)+")";

        return (
            <g className="axis" transform={this.props.axisType=='x'?translate:{translate}} >
                <text transform="rotate(90)" y="-70" x="-215" dy="1em">{this.props.label}</text>
            </g>

        )
    }
}
