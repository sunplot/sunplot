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
    updateChart(props) {
        if(props.data.docs){
            const docs = props.data.docs
            const data = {
                labels: [],
                series: [[]]
            }
            docs.map(doc=>(
                data.labels.push(Object.values(doc)[0]),
                data.series[0].push(Object.values(doc)[1])
            ))

            const options =  {
                fullWidth: true,
                height:400,
                chartPadding: {
                    right: 40
                }
            }
            return new Chartist[props.type]('#' + props.type + 'Chart', data, options);
        }
    }

    render() {
        return (
            <div id={this.props.type + 'Chart'} className="chart" ></div>
        )
    }
}
