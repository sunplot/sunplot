import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import {white} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import SettingsForm from '../form/SettingsForm'

export default class SettingDialog extends React.Component {
    state = {
        open: false,
    }

    handler = () => {
        if(this.state.open === true){
            this.setState({open: false});
        } else {
            this.setState({open: true});
        }
    }


    render() {
        const customContentStyle = {
            width: 400,
            maxWidth: 'none',
        }
        return (
            <IconButton label="Modal Dialog" onTouchTap={this.handler} style={{paddingTop:"20px"}} >
                <SettingsIcon id="setting-cog" />
                <Dialog id="settings-form"
                        title="Settings"
                        modal={true}
                        open={this.state.open}
                        contentStyle={customContentStyle}>
                        <SettingsForm handler={this.handler.bind(this)}/>
                </Dialog>
            </ IconButton>
        )
    }
}
