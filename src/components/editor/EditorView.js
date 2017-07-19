import React from 'react'
import EditorNav from './EditorNav'
import Paper from 'material-ui/Paper'
import FlareSubNav from '../FlareSubNav'
import CodeMirror from 'react-codemirror'
import {sql} from 'codemirror/mode/sql/sql'
import {js} from 'codemirror/mode/javascript/javascript'
import {commonlisp} from 'codemirror/mode/commonlisp/commonlisp'
import {connect} from 'react-redux'
import {vim} from 'codemirror/keymap/vim'


/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class EditorView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            query: "select title_year,count(*) from films group by title_year order by title_year desc limit 20",
            docs : []
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
            // mode:"commonlisp"
            mode: checkMode(this.props.mode),
            vimMode : true
        }
        const simpleLineChartData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            series: [

                [1, 3, 4, 5, 6]
              ]
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
        data: state.docs,
    }
}

export default connect(mapStateToProps)(EditorView)
