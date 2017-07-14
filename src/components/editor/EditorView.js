import React from 'react'
import EditorNav from './EditorNav'
import Paper from 'material-ui/Paper'
import FlareSubNav from '../FlareSubNav'
import CodeMirror from 'react-codemirror'
import {sql} from 'codemirror/mode/sql/sql'
import {js} from 'codemirror/mode/javascript/javascript'
import {commonlisp} from 'codemirror/mode/commonlisp/commonlisp'
import EditorTable from './EditorTable'
import {Tabs, Tab} from 'material-ui/Tabs'
import {connect} from 'react-redux'
import {vim} from 'codemirror/keymap/vim'
import PieChart from '../charts/PieChart'
import LineChart from '../charts/LineChart'
/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class EditorView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            query: "select actor_1_name ,sum(gross) as total from films group by  actor_1_name order by sum(gross) desc limit 10",
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
        };
        const my = [{hi:"hi",count:1}]
        return(
            <div id="EditorView">
                <div>
                    <Paper>
                        <CodeMirror value={this.state.query}
                            onChange={this.updateQuery.bind(this)}
                            options={options} />
                    </Paper>
                </div>
                <EditorNav query={this.state.query} editorMode={this.props.mode}/>
                <Tabs>
                    <Tab label="Table" >
                        <div>
                            <EditorTable data={this.props.docs} />
                        </div>
                    </Tab>
                    <Tab label="JSON" >
                        <div><pre>{JSON.stringify(this.props.docs, null, 2) }</pre></div>;
                    </Tab>
                    <Tab label="Charts" >
                        <Tabs>
                            <Tab label="Line" >
                                <div><LineChart data={this.props.docs}/></div>
                                <div id="line-user"></div>
                            </Tab>
                            <Tab label="Pie" >
                                <div><PieChart data={this.props.docs}/></div>
                                <div id="line-user"></div>
                            </Tab>
                        </Tabs>
                    </Tab>
                </Tabs>
            </div>
      );
    }
}
const mapStateToProps = (state) => {
    return {
        docs: state.docs,
    }
}

export default connect(mapStateToProps)(EditorView)
