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
                              onTouchTap={()=> this.props.streamingCommand(this.props.query, this.props.setting)} />
    )
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({streamingCommand:streamingCommand}, dispatch)
}
const mapStateToProps = (state) => {
    return {
        setting: state.setting,
        streamingCommand:streamingCommand
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(StreamExecuteButton)
