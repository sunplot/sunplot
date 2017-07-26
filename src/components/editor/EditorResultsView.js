import React from 'react'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import { bindActionCreators } from 'redux'
import {executeCommand} from '../../actions/CommandAction'
import {connect} from 'react-redux'
import ExecuteQueryButton from './ExecuteQueryButton'
import ActionHome from 'material-ui/svg-icons/content/content-paste'
import ExportData from 'material-ui/svg-icons/file/file-download'
import {CSVDownload, CSVLink} from 'react-csv'
import {Tabs, Tab} from 'material-ui/Tabs'
import Chart from '../charts/Chart'
import Divider from 'material-ui/Divider'
import EditorTable from './EditorTable'
import ReactCopyButtonWrapper from 'react-copy-button-wrapper'

class EditorResultsView extends React.Component {
    constructor(props) {
        super(props);
    }

    displayJSON(){
        if(this.props.data){
            const jsonStyle = this.props.data.error ? {color:"red"} : {color:"black"}
            return(
                <div style={jsonStyle}>
                    {JSON.stringify(this.props.data.docs, null, 2) }
                </div>
            )
        }
    }

    displayError(){
        if(this.props.data){
            if(this.props.data.error){
                return(
                    <p style={{
                                    display: "inline-block",
                                    fontFamily: "Roboto, sans-serif",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    position: "relative",
                                    color: "red",
                                    alignItems:"center",
                                    justifyContent:"center",
                                    color:"red"}}>{this.props.data.error}</p>)
            }
            return
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    displayChart(){
        if(this.props.data && !this.props.data.error && this.props.data.docs){
            if(this.props.data.docs[0].data.length > 1 && this.props.data.docs[0].plot){
                const chartType = this.capitalizeFirstLetter(this.props.data.docs[0].plot)
                return(
                    <Tab label="Charts" >
                        <div style={{alignItems:"center"}}>{this.displayError()}</div>
                        <Chart type={chartType} data={this.props.data.docs[0].data}/>
                        <Divider />
                    </Tab>
                )
            }
        }
    }
    render(){

        return (

            <div>
                <Tabs>
                    <Tab label="JSON" >
                        <div><pre>{this.displayJSON()}</pre></div>;
                    </Tab>
                    <Tab label="Table" >
                        <div>
                            <div style={{alignItems:"center"}}>{this.displayError()}</div>
                            <EditorTable data={this.props.data} />
                        </div>
                    </Tab>
                    {this.displayChart()}
                </Tabs>
            </div>
    )
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({executeCommand:executeCommand}, dispatch)
}
export default connect(null, matchDispatchToProps)(EditorResultsView)
