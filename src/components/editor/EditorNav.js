import React from 'react'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import { bindActionCreators } from 'redux'
import {sqlCommand} from '../../actions/CommandAction'
import {connect} from 'react-redux'
import SQLExecuteButton from './SQLExecuteButton'
import StreamExecuteButton from './StreamExecuteButton'
import ActionHome from 'material-ui/svg-icons/content/content-paste'
import ExportData from 'material-ui/svg-icons/file/file-download'
import {CSVDownload, CSVLink} from 'react-csv'
import {Tabs, Tab} from 'material-ui/Tabs'
import PieChart from '../charts/PieChart'
import Chart from '../charts/Chart'
import Divider from 'material-ui/Divider'
import EditorTable from './EditorTable'

class EditorNav extends React.Component {
    constructor(props) {
        super(props);
    }
    getButton(props){
        if(this.props.editorMode === "sql"){
            return <SQLExecuteButton query={props.query}/>
        }
        return <StreamExecuteButton query={props.query}/>
    }
    displayTime(){
        return(
            (this.props.time !== undefined)?
                    <div>
                        <h4 style={{paddingLeft:"10",
                                color:"rgb(96, 125, 139)",
                                fontFamily: "Roboto, sans-serif"}}>{"Response time: " + this.props.time}</h4>
                    </div>:<div></div>
        )
    }
    downloadCSV(){
        return(this.props.data.docs !== undefined && this.props.data.docs.length > 1 ?
            <CSVLink data={this.props.data.docs} >
                <IconButton tooltip="Export as CSV"
                    tooltipPosition="top-left"
                    iconStyle={{width: 48,height: 48}}
                    style={{ width: 96, height: 96,padding: 24}}>
                    <ExportData style={{ marginRight: 24}} />
                </IconButton>
            </CSVLink>
            :<div></div>)
    }




    render(){
        return (

            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        {this.displayTime()}
                    </ToolbarGroup>

                    <ToolbarGroup>
                            {this.downloadCSV()}

                            <IconButton
                                tooltip={this.props.url}
                                tooltipPosition="top-left"
                                iconStyle={{width: 48,height: 48}}
                                style={{ width: 96, height: 96,padding: 24}}>
                                <ActionHome style={{ marginRight: 24}} />
                            </IconButton>

                        <ToolbarSeparator />
                        {this.getButton(this.props)}
                        <IconMenu iconButtonElement={<IconButton touch={true}></IconButton>}></IconMenu>
                    </ToolbarGroup>
                </Toolbar>
                <Tabs>
                    <Tab label="Table" >
                        <div>
                            <EditorTable data={this.props.data} />
                        </div>
                    </Tab>
                    <Tab label="JSON" >
                        <div><pre>{JSON.stringify(this.props.data.docs, null, 2) }</pre></div>;
                    </Tab>
                    <Tab label="Charts" >
                        <Chart type="Bar" data={this.props.data}/>
                        <Divider />
                        <Chart type="Line" data={this.props.data}/>
                        <PieChart type="Pie" data={this.props.data}/>
                    </Tab>
                </Tabs>
            </div>
    )
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({sqlCommand:sqlCommand}, dispatch)
}
export default connect(null,matchDispatchToProps)(EditorNav)
