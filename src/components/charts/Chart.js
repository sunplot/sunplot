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
    getLow(item){
        let val = 0
        item.map((x) => {
            x.data.map((value)=>{
                if(value[1] < val){
                    val = value[1]
                }
            })
        })
        return val
    }
    getMax(item){
        let val = 0
        item.map((x) => {
            x.data.map((value)=>{
                if(value[1] > val){
                    val = value[1]
                }
            })
        })
        return val
    }

    updateChart(props) {
        if(props.data){
            let lowestVal = this.getLow(props.data)
            let maxVal = this.getMax(props.data)
            let options =  {
                fullWidth: true,
                height:400,
                axisY: {
                    low: lowestVal,
                    high: maxVal,
                    showLabel: false,
                    showGrid: false,
                }
            }
            if(props.data){
                if(this.isLinearOnly(props.data)){
                    //We only need on chart that plots multiple series
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
                    this.buildChart(props.data.plot, data, options)
                } else {
                    //We need mulitple charts
                    props.data.map((result, index) => {
                        let data = {
                            labels: [],
                            series: [[]]
                        }
                        let docs = []
                        if(result.data){
                            result.data.map(doc => {
                                data.labels.push(Object.values(doc)[0]),
                                data.series[0].push(Object.values(doc)[1])
                            })
                        }
                        if(index > 0){
                            options.axisX = {
                                showLabel: false,
                                showGrid: false
                            }

                        }
                        this.buildChart(result.plot, data, options)
                    })
                }
            }
        }
    }
    buildChart(type, data, options){

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
