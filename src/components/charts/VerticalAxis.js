import React from 'react'
import {d3,extent,max} from "d3";
import {scaleLinear,scaleTime} from "d3-scale"
import {line} from "d3-shape"
import { axisBottom, axisLeft } from 'd3-axis'

class VerticalAxis extends React.Component {
  static propTypes = {
    labelFn: React.PropTypes.func.isRequired,
    orientation: React.PropTypes.string.isRequired,
    scale: React.PropTypes.func.isRequired,
    tickValues: React.PropTypes.array.isRequired,
    trbl: React.PropTypes.array.isRequired,
    view: React.PropTypes.array.isRequired
  };

  static orientation = {
    LEFT: 'horizontal-axis-left',
    RIGHT: 'horizontal-axis-right'
  };

  buildTicks (tickValues, scale, labelFn, trbl, view, orientation) {
    return tickValues.map((tickValue, key) => {
      const tickLength = view[0] / 6;
      const yPos = scale(tickValue);
      let x2 = view[0];
      let x1 = x2 - tickLength;
      let anchorPosition = 'end';
      let textXPos = x1 - tickLength;
      if (orientation === VerticalAxis.orientation.RIGHT) {
        x1 = 0;
        x2 = tickLength;
        anchorPosition = 'start';
      }
      const transform = `translate(0, ${yPos})`;
      return (
        <g {...{transform, key}}>
          <line
              {...{x1, x2}}
              className="line-chart__axis-tick line-chart__axis-tick--vertical"
              y1={0}
              y2={0}
          />
          <text
              dy={3}
              className="line-chart__axis-text line-chart__axis-text--vertical"
              textAnchor={anchorPosition}
              x={textXPos}
              y={0}
          >{labelFn(tickValue)}</text>
        </g>
      );
    });
  }

  render () {
    const {scale, view, trbl, labelFn, tickValues, orientation} = this.props;
    let x1 = view[0];
    if (orientation === VerticalAxis.orientation.RIGHT) {
      x1 = 0;
    }
    const x2 = x1;
    const transform = `translate(${trbl[3]}, ${trbl[0]})`;
    return (
      <g {...{transform}}>
        <line
            {...{x1, x2}}
            className="line-chart__axis-line line-chart__axis-line--vertical"
            y1={0}
            y2={view[1]}
        />
        {this.buildTicks(tickValues, scale, labelFn, trbl, view, orientation)}
      </g>
    );
  }
}
