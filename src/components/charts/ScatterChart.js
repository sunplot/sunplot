import React from 'react'
import Chartist from 'chartist'

export default class ScatterChart extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        this.updateChart(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.updateChart(nextProps);
    }
    updateChart(props) {
        if(props.data.docs){
            // const docs = props.data.docs
            // const data = {
            //     labels: [],
            //     series: [[]]
            // }
            // docs.map(doc=>(
            //     data.labels.push(Object.values(doc)[0]),
            //     data.series[0].push(Object.values(doc)[1])
            // ))

            const times = function(n) {
              return Array.apply(null, new Array(n));
            };

            const data = times(52).map(Math.random).reduce(function(data, rnd, index) {
              data.labels.push(index + 1);
              data.series.forEach(function(series) {
                series.push(Math.random() * 100)
              });

              return data;
            }, {
              labels: [],
              series: times(4).map(function() { return new Array() })
            });
            const options = {
                fullWidth: true,
                height:400,
                showLine: false,
                axisX: {
                    labelInterpolationFnc: function(value, index) {
                        return index % 13 === 0 ? 'W' + value : null;
                    }
                }
            }
            console.log("---------",data)
            return new Chartist["Line"]('#' + props.type + 'Chart', data, options);
        }
    }

    render() {
        return (
            <div id={this.props.type + 'Chart'} className="chart" ></div>
        )
    }
}
