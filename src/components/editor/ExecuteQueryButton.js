import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { bindActionCreators } from 'redux'
import {executeCommand} from '../../actions/CommandAction'
import {connect} from 'react-redux'

class ExecuteQueryButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const btnStyle = {
            margin: 12,
            textAlign: 'right'
        }
        return (
                <RaisedButton id="execute-command"
                              label="Execute"
                              primary={true}
                              style={btnStyle}
                              onTouchTap={()=> this.props.executeCommand(this.props.query, this.props.setting)} />
    )
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({executeCommand:executeCommand}, dispatch)
}
const mapStateToProps = (state) => {
    return {
        setting: state.setting
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(ExecuteQueryButton)
