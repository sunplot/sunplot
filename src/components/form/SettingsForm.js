import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress';
import classnames from 'classnames'
import {saveSettings, getSetting} from '../../actions/SettingsAction'

class SettingsForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            host: this.props.setting ? this.props.setting.host:'',
            port: this.props.setting ? this.props.setting.port:'',
            collection:this.props.setting ? this.props.setting.collection:'',
            errors:{},
            loading:false
        }
    }
    componentDidMount(){
        this.props.getSetting(this.props.setting);
        this.setState(this.props.setting)
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

        const isValid = Object.keys(errors).length === 0
        if(isValid){
            this.setState({loading:true})
            const {host, port, collection} = this.state
            this.props.saveSettings({host, port, collection})
            .then((res)=>{
                if(res.ok){
                    this.props.handler()
                } else {
                    this.setState({errors:{global:res.errors.message}})
                }
            })
        }
    }

    render(){
        return(
            <div>

                <form
                    className={classnames('ui', 'form', {loading: this.state.loading})}>
                    {
                        !!this.state.errors.global &&
                        <div id="backend-error">
                            <TextField disabled={true} errorText={this.state.errors.global} />
                            <br />
                        </div>

                    }
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
                      disabled={false}
                      onTouchTap={this.props.handler}
                    />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        setting: state.setting,
    }
}

export default connect(mapStateToProps,{saveSettings, getSetting})(SettingsForm);
