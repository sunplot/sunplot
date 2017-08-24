import React from 'react'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import { bindActionCreators } from 'redux'
import {executeCommand} from '../../actions/CommandAction'
import {connect} from 'react-redux'
import ExecuteQueryButton from './ExecuteQueryButton'
import EditorResultsView from './EditorResultsView'
import ActionHome from 'material-ui/svg-icons/content/content-paste'
import ExportData from 'material-ui/svg-icons/file/file-download'
import {CSVDownload, CSVLink} from 'react-csv'
import {Tabs, Tab} from 'material-ui/Tabs'
import Chart from '../charts/Chart'
import Divider from 'material-ui/Divider'
import EditorTable from './EditorTable'
import ReactCopyButtonWrapper from 'react-copy-button-wrapper'
import ErrorIcon from 'material-ui/svg-icons/alert/error-outline'

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  }
};
class EditorNav extends React.Component {
    constructor(props) {
        super(props);
    }

    displayTime(){
        if(this.props.data){
            return(
                (this.props.data.responsetime && this.props.data.responsetime > 0 )?
                        <div>
                            <h4 style={{paddingLeft:10,
                                    color:"rgb(96, 125, 139)",
                                    fontFamily: "Roboto, sans-serif"}}>{"Response time: " + this.props.data.responsetime}</h4>
                        </div>:<div></div>
            )
        }
    }
    downloadCSV(){
        if(this.props.data){
            return(this.props.data.docs && this.props.data.docs.length > 1 ?
                <CSVLink data={this.props.data.docs} >
                    <IconButton tooltip="Export as CSV"
                        tooltipPosition="top-left"
                        iconStyle={styles.smallIcon}
                         style={styles.small}>
                        <ExportData style={{ marginRight: 24}} />
                    </IconButton>
                </CSVLink>
                :<div></div>)
        }
    }
    displayResults(){
        let isPlotable =
        this.props.query.trim().toLowerCase().includes("plot") ||
        this.props.query.trim().toLowerCase().startsWith("select")
        if(this.props.data){
            if(this.props.data.error){
                return(
                <Tabs>
                    <Tab id="error-tab"
                         icon={<ErrorIcon />}
                         style={{backgroundColor:"red"}} >
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
                                        color:"red",
                                        marginLeft:20}}>{this.props.data.error}</p>
                    </Tab>
                </Tabs>)
            }
            return <EditorResultsView data={this.props.data} isPlotable={isPlotable}/>
        }
    }
    displayCopyUrl(){
        if(this.props.data){
            return(
                <ReactCopyButtonWrapper text={encodeURI(this.props.data.url)}>
                    <IconButton
                        tooltip={this.props.url}
                        tooltipPosition="top-left"
                        onTouchTap={this.copyToClipboard}
                        iconStyle={styles.smallIcon}
                        style={styles.small}>
                        <ActionHome style={{ marginRight: 24}} />
                        <input id="copyurl"
                            hidden="true" onCopy={this.handleCopy}
                             />
                    </IconButton>

                </ReactCopyButtonWrapper>)
        }
    }
    displaySeparator(){
        if(this.props.data){
            return (<ToolbarSeparator />)
        }
    }
    render(){
        return (
            <div >
                <Toolbar style={{backgroundColor:"#fff"}}>
                    <ToolbarGroup firstChild={true}>
                        {this.displayTime()}
                    </ToolbarGroup>

                    <ToolbarGroup>
                            {this.downloadCSV()}
                            {this.displayCopyUrl()}
                            {this.displaySeparator()}
                        <ExecuteQueryButton query={this.props.query}/>
                        <IconMenu iconButtonElement={<IconButton touch={true}></IconButton>}></IconMenu>
                    </ToolbarGroup>
                </Toolbar>
                {this.displayResults()}

            </div>
    )
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({executeCommand:executeCommand}, dispatch)
}
export default connect(null, matchDispatchToProps)(EditorNav)
