import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { bindActionCreators } from 'redux'
import {streamingCommand} from '../../actions/CommandAction'
import {connect} from 'react-redux'

class StreamExecuteButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const btnStyle = {
            margin: 12,
            textAlign: 'right'
        }
        return (
                <RaisedButton id="execute-stream"
                              label="Execute"
                              primary={true}
                              style={btnStyle}
                              onTouchTap={()=> this.props.streamingCommand(this.props.query)} />
    )
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({streamingCommand:streamingCommand}, dispatch)
}
export default connect(null,matchDispatchToProps)(StreamExecuteButton)
