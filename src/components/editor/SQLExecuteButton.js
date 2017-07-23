import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { bindActionCreators } from 'redux'
import {sqlCommand} from '../../actions/CommandAction'
import {connect} from 'react-redux'

class SQLExecuteButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const btnStyle = {
            margin: 12,
            textAlign: 'right'
        }
        return (
                <RaisedButton id="execute-sql"
                              label="Execute"
                              primary={true}
                              style={btnStyle}
                              onTouchTap={()=> this.props.sqlCommand(this.props.query,this.props.setting)} />
    )
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({sqlCommand:sqlCommand}, dispatch)
}
const mapStateToProps = (state) => {
    return {
        setting: state.setting,
        sqlCommand:sqlCommand
    }
}
export default connect(mapStateToProps,matchDispatchToProps)(SQLExecuteButton)
