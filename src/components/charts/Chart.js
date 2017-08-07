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
    isLinearOnly(data){
        let isTrue = true
        data.map((x) => {
            console.log(x.plot)
            if(x.plot !== "line"){
                isTrue =  false
            }
        })
        return isTrue
    }
    updateChart(props) {
        if(props.data){
            const size = props.data.length
            const myseries = new Array(size)
            let charts = []

            if(props.data){
                if(this.isLinearOnly(props.data)){
                    let data = {
                        labels: [],
                        series: [[]]
                    }
                    props.data.map((result, index) => {
                        let docs = []
                        if(result.data){
                            result.data.map(doc => {
                                if(index < 1){
                                    data.labels.push(Object.values(doc)[0])
                                }
                                docs.push(Object.values(doc)[1])
                            })
                            data.series[index] = docs
                        }
                    })
                    this.buildChart(props.data.plot, data)
                }
                else {
                props.data.map((result) => {
                        let data = {
                            labels: [],
                            series: [[]]
                        }
                        let docs = []
                        if(result.data){
                            result.data.map(doc=>{
                                data.labels.push(Object.values(doc)[0]),
                                data.series[0].push(Object.values(doc)[1])
                            })
                        }
                        this.buildChart(result.plot, data)
                    })
                }
            }
        }
    }
    buildChart(type,data){
        let options =  {
            fullWidth: true,
            height:400,
            chartPadding: {
                right: 40
            },

        }

        let chart = {}
        switch (type) {
            case "pie":
            let pieData = {series:data.series[0]}
            chart = new Chartist.Pie('#Chart', pieData, {
              height:400,
              donut: true,
              showLabel: false
            });
            break
            case "scatter":
                chart = new Chartist['Line']('#ScatterChart', data, this.buildScatter());
                break
            case "bar":
                chart = new Chartist['Bar']('#BarChart', data, options);
                break
            default:
                chart = new Chartist['Line']('#LineChart', data, options);
                break
        }
        return chart
    }

    render() {
        return (
            <div id="charts" className="chart-container ct-golden-section">
                <div id="LineChart" className="chart" ></div>
                <div id="ScatterChart" className="chart" ></div>
                <div id="BarChart" className="chart" ></div>
                <div id="PieChart" className="chart" ></div>
            </div>
        )
    }
}
