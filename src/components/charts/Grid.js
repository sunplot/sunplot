import React from 'react'
import {d3} from 'd3';

export default class Grid extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const translate = "translate(0,"+(this.props.h)+")";
        return (
            <g className="y-grid" transform={this.props.gridType=='x'?translate:""}></g>
        )
    }

}
