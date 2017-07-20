import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import SettingsForm from '../form/SettingsForm'
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class SettingDialog extends React.Component {
  state = {
    open: false,
    url:'http://localhost',
    port:'9191',
    collection:'films'
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];
    const styles = {
              block: {
                maxWidth: 250,
              },
              toggle: {
                marginBottom: 16,
              },
              thumbOff: {
                backgroundColor: '#ffcccc',
              },
              trackOff: {
                backgroundColor: '#ff9d9d',
              },
              thumbSwitched: {
                backgroundColor: 'red',
              },
              trackSwitched: {
                backgroundColor: '#ff9d9d',
              },
              labelStyle: {
                color: 'red',
              },
          }
    return (
            <IconButton label="Modal Dialog" onTouchTap={this.handleOpen} style={{color:"white"}}>
                <SettingsIcon  />
                <Dialog id="settings-form"
                        title="Settings"
                        actions={actions}
                        modal={true}
                        open={this.state.open}>
                        <SettingsForm />
                </Dialog>
            </ IconButton>
    );
  }
}
