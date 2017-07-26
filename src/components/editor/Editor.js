import React from 'react'
import EditorNav from './EditorNav'
import Paper from 'material-ui/Paper'
import CodeMirror from 'react-codemirror'
import {sql} from 'codemirror/mode/sql/sql'
import {js} from 'codemirror/mode/javascript/javascript'
import {commonlisp} from 'codemirror/mode/commonlisp/commonlisp'
import {connect} from 'react-redux'
import {vim} from 'codemirror/keymap/vim'


/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            query: "list(tuple(plot=scatter, x=array(1,2,3), y=array(13,34,15)),tuple(plot=scatter, x=array(1,2,3), y=array(23,14,25)))",
            docs : [],
        };
    }

    updateQuery(newQuery) {
        this.setState({ query: newQuery})
    }

    render(){
        function checkMode(mode){
            if(mode === "sql")
            {
                return "sql"
            }
            return "commonlisp"
        }
        const options = {
            lineNumbers: true,
            mode: checkMode(this.props.mode),
            vimMode : true
        }

        return(
            <div id="EditorView">
                <div>
                    <Paper>
                        <CodeMirror value={this.state.query}
                            onChange={this.updateQuery.bind(this)}
                            options={options} />
                    </Paper>
                </div>

                <EditorNav
                           query={this.state.query}
                           editorMode={this.props.mode}
                           data={this.props.data}/>
            </div>
      );
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.queryResponse.state,
    }
}

export default connect(mapStateToProps)(Editor)
