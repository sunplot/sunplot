import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import classnames from 'classnames'


class SettingsForm extends React.Component {

    state = {
        host:'',
        port:'',
        collection:'',
        errors:{}
    }
    handleChange = (e) => {
        if(!!this.state.errors[e.target.name]){
            let errors = Object.assign({},this.state.errors)
            delete errors[e.target.name]
            this.setState(
                {
                    [e.target.name]:e.target.value,
                    errors
                })
        }else{
            this.setState({[e.target.name]:e.target.value})
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        //validate here
        let errors = {}

        if(this.state.host === '' || !this.state.host.startsWith('http')) errors.host = "Host is required"
        if(this.state.port === '' || this.state.port < 2) errors.port = "Port number is required"
        if(this.state.collection === '' ) errors.collection = "Collection is required"
        this.setState({errors})
    }


    render(){
        return(
            <div>
            <form >
                <TextField name="host"
                           hintText="http://localhost"
                           floatingLabelText="Host"
                           value={this.state.host}
                           onChange={this.handleChange}
                           errorText={this.state.errors.host}/>
                <br />
                <TextField name="port"
                           hintText="Port number"
                           floatingLabelText="Port"
                           value={this.state.port}
                           onChange={this.handleChange}
                           errorText={this.state.errors.port}/>
                <br />
                <TextField name="collection"
                           hintText="Collection name"
                           floatingLabelText="Collection"
                           value={this.state.collection}
                           onChange={this.handleChange}
                           errorText={this.state.errors.collection}/>
                <br />
                <br />
                <FlatButton
                  label="Save"
                  primary={true}
                  onTouchTap={this.handleSubmit.bind(this)}
                />
                <FlatButton
                  label="Cancel"
                  primary={true}
                  disabled={true}
                  onTouchTap={this.props.handleClose}
                />,
            </form>
            </div>
        )
    }
}
export default SettingsForm;
