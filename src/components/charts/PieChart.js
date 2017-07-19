import React from 'react'
import Chartist from 'chartist'

export default class Pie extends React.Component{
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
        if(props.data!== undefined && props.data['result-set']!== undefined){
            const docs = props.data['result-set'].docs
            const data = {
                labels: [],
                series: []
            }
            docs.map(doc=>(
                data.labels.push(Object.values(doc)[0]),
                data.series.push(Object.values(doc)[1])
            ))
            const options = {
              labelInterpolationFnc: function(value) {
                return value[0]
              },
              height:400,
            }

            const responsiveOptions = [
              ['screen and (min-width: 640px)', {
                chartPadding: 30,
                labelOffset: 100,
                labelDirection: 'explode',
                labelInterpolationFnc: function(value) {
                  return value;
                }
              }],
              ['screen and (min-width: 1024px)', {
                labelOffset: 80,
                chartPadding: 20
              }]
            ];
            return new Chartist.Pie('#PieChart', data, options, responsiveOptions)
        }
    }

    render() {
        return (
            <div id="PieChart" className="chart" ></div>
        )
    }
}
