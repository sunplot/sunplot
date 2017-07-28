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
            const size = props.data.length
            const myseries = new Array(size)
            const data = {
                labels: [],
                series: [[]]
            }
            let docs = []
            console.log(Object.keys(props.data[0]))
            if(Object.keys(props.data[0]).length === 2){
                docs = props.data[0].data ?props.data[0].data : props.data
                docs.map(doc=>{
                    data.labels.push(Object.values(doc)[0]),
                    data.series[0].push(Object.values(doc)[1])
                })
            } else{
                props.data.map((chartdoc,index) => {
                    let val = Object.values(chartdoc)[2]
                    myseries[index] = val
                    if(index === 0 ){
                        data.labels = (Object.values(chartdoc)[1])
                    }
                })
                data.series = myseries
            }

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
                chart = new Chartist.Pie('#Chart', pieData, {
                  height:400,
                  donut: true,
                  showLabel: false
                });
                break
                case "Scatter":
                    chart = new Chartist['Line']('#Chart', data, this.buildScatter());
                    break
                case "Bar":
                    chart = new Chartist['Bar']('#Chart', data, options);
                    break
                default:
                    chart = new Chartist['Line']('#Chart', data, options);
                    break
            }

            return chart
        }
    }

    render() {
        return (
            <div id="Chart" className="chart" ></div>
        )
    }
}
