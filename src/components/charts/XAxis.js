import React from 'react'
import {d3, range} from 'd3';

export default class XAxis extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let style = {
            stroke: "00BCD4",
            strokeWidth: "1px"
        }

        let step = (this.props.start + this.props.end / this.props.labels.length)

        //D3 mathy bits
        let ticks = range(this.props.start, this.props.end, step)
        let lines = []
        ticks.forEach((tick, index) => {
            lines.push(
                <line style={style} x1={tick + 10 }
                      y1={this.props.x} x2={tick + 10}
                      y2={this.props.x + 4}
                      key={"xline"+index} />)
        })

        let columnLables = []
        ticks.forEach((tick, index) => {
            columnLables.push(
                <text style={{fill: "00BCD4"}}
                      key={"xtick"+index}
                      x={tick + 5}
                      y={this.props.x + 20}
                      fontFamily="Verdana"
                      fontSize="15"></text>)
        })

        return(
            <g>
                <line x1={this.props.start} y1={this.props.x } x2={this.props.end} y2={this.props.x} style={ style } />
                { columnLables }
                { lines }
            </g>
        )
    }
}
