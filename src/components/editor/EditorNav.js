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
import ActionHome from 'material-ui/svg-icons/content/link';

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
    render(){

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                    </ToolbarGroup>
                    <ToolbarGroup>

                        <a href={this.props.url}>
                            <IconButton tooltip="SVG Icon"
                                tooltip={this.props.url}
                                tooltipPosition="top-left"
                                iconStyle={{width: 48,height: 48}}
                                style={{ width: 96, height: 96,padding: 24}}>
                                <ActionHome style={{ marginRight: 24}} />
                            </IconButton>
                            </a>
                        <ToolbarSeparator />
                        {this.getButton(this.props)}
                        <IconMenu iconButtonElement={<IconButton touch={true}></IconButton>}></IconMenu>
                    </ToolbarGroup>
                </Toolbar>

            </div>
    )
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({sqlCommand:sqlCommand}, dispatch)
}
export default connect(null,matchDispatchToProps)(EditorNav)
