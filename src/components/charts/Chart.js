import React from 'react'
import Chartist from 'chartist'

export default class Chart extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        this.updateChart(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.updateChart(nextProps);
    }

    buildScatter(){
        return  {
            fullWidth: true,
            height:400,
            showLine: false,
            axisX: {
                labelInterpolationFnc: function(value, index) {
                    return index % 13 === 0 ? 'W' + value : null;
                }
            }
        }
    }


    updateChart(props) {
        if(props.data){
            const docs = props.data
            const data = {
                labels: [],
                series: [[]]
            }
            docs.map(doc=>(
                data.labels.push(Object.values(doc)[0]),
                data.series[0].push(Object.values(doc)[1])
            ))

            let options =  {
                fullWidth: true,
                height:400,
                chartPadding: {
                    right: 40
                }
            }
            let chart = {}
            switch (props.type) {
                case "Pie":
                let pieData = {series:data.series[0]}
                chart = new Chartist.Pie('#PieChart', pieData, {
                  height:400,
                  donut: true,
                  showLabel: false
                });
                break
                case "Scatter":
                    chart = new Chartist['Line']('#' + props.type + 'Chart', data, this.buildScatter());
                    break
                case "Bar":
                    chart = new Chartist['Bar']('#' + props.type + 'Chart', data, options);
                    break
                default:
                    chart = new Chartist['Line']('#' + props.type + 'Chart', data, options);
                    break
            }

            return chart
        }
    }

    render() {
        return (
            <div id={this.props.type + 'Chart'} className="chart" ></div>
        )
    }
}
