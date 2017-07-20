import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import classnames from 'classnames'

class SettingsForm extends React.Component {

    state = {
        host:'',
        port:'9191',
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

        if(this.state.host === '' ) errors.host = "Host is required"
        if(this.state.port === '' ) errors.port = "Port number is required"
        if(this.state.collection === '' ) errors.collection = "Collection is required"
        this.setState({errors})
    }


    render(){
        return(
            <div>
            <h1> Settings </h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <TextField name="host"
                           hintText="URL"
                           floatingLabelText="Host"
                           value={this.state.host}
                           onChange={this.handleChange}/>
                <span>{this.state.errors.host}</span>
                <br />
                <TextField name="port"
                           hintText="Port number"
                           floatingLabelText="Port"
                           value={this.state.port}
                           onChange={this.handleChange}/>
                <span>{this.state.errors.port}</span>
                <br />
                <TextField name="collection"
                           hintText="Collection name"
                           floatingLabelText="Collection"
                           value={this.state.collection}
                           onChange={this.handleChange}/>
                <span>{this.state.errors.collection}</span>
                <br />
                <br />
                <button className="ui primary button"> Save</button>
            </form>
            </div>
        )
    }
}
export default SettingsForm;
