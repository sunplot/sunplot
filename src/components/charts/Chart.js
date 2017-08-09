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
    isManyPlotTypes(data){
        let isTrue = false
        let plot  = data[0].plot
        data.map((x) => {
            if(x.plot !== plot){
                isTrue = true
            }
        })
        return isTrue
    }
    getLow(item){
        let val = 0
        item.map((x) => {
            x.data.map((value) => {
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
            let chartData = props.data
            if(!Array.isArray(chartData[0].data)){
                let formattedData = []
                chartData.map((item) => {
                    formattedData.push(
                    [Object.values(item)[0],
                    Object.values(item)[1]])
                })
                chartData = [{
                    plot : "line",
                    data : formattedData
                }]
            }
            let lowestVal = this.getLow(chartData)
            let maxVal = this.getMax(chartData)
            let options =  {
                fullWidth: true,
                height:400,
                fullWidth: true,
                axisY: {
                    low: lowestVal,
                    high: maxVal
                },
                axisX:{
                    low: 0,
                    high: 10
                }
            }
            var barOptions = {
                axisY: {
                    low: lowestVal,
                    high: maxVal
                }
            }

            if(!this.isManyPlotTypes(chartData)){
                //We only need on chart that plots multiple series
                let data = {
                    labels: [],
                    series: [[]]
                }

                chartData.map((result, index) => {
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

                this.buildChart(chartData[0].plot, data, options)


            } else {
                //We need mulitple charts
                chartData.map((result, index) => {
                    let data = {
                        labels: [],
                        series: [[]]
                    }

                    if(result.data){
                        result.data.map(doc => {
                            data.labels.push(Object.values(doc)[0]),
                            data.series[0].push(Object.values(doc)[1])
                        })
                    }
                    if(index > 0){
                        options.axisY = {
                            low: lowestVal,
                            high: maxVal,
                            showLabel: false,
                            showGrid: false,
                        }
                        options.axisX = {
                            showLabel: false,
                            showGrid: false
                        }
                    }

                    if(chartData[0].plot==='bar'){
                        options.axisY = barOptions
                    }
                    this.buildChart(result.plot, data, options)
                })
            }

        }
    }
    buildChart(type, data, options){

        let chart = {}
        switch (type) {
            case "pie":
            let pieData = {series:data.series[0]}
            chart = new Chartist.Pie('#PieChart', pieData, {
              height:400,
              donut: true,
              showLabel: false
            });
            break
            case "scatter":
                options.showLine = false
                chart = new Chartist['Line']('#ScatterChart', data, options);
                break
            case "bar":
                chart = new Chartist['Bar']('#BarChart', data, options);
                break
            default:
                options.showLine = true
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
