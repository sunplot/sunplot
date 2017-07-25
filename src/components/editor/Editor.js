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
            query: "select title_year,count(*) from films group by title_year order by title_year desc limit 20",
            docs : [],
            error: this.props.data.error
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
                <EditorNav time={this.props.data.responsetime}
                           query={this.state.query}
                           editorMode={this.props.mode}
                           url={this.props.data.url}
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
