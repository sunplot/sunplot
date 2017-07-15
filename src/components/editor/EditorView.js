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
import Histogram from '../charts/Histogram'
/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class EditorView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            query: "select director_name,sum(gross) from films group by director_name order by sum(gross) desc limit 10",
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
                <EditorNav query={this.state.query} editorMode={this.props.mode} url={this.props.data.url}/>
                <Tabs>
                    <Tab label="Table" >
                        <div>
                            <EditorTable data={this.props.data} />
                        </div>
                    </Tab>
                    <Tab label="JSON" >
                        <div><pre>{JSON.stringify(this.props.data.docs, null, 2) }</pre></div>;
                    </Tab>
                    <Tab label="Charts" >
                        <Tabs>
                            <Tab label="Line" >
                                <div id="histogram"><Histogram data={this.props.data} width={900} height={500}/></div>
                            </Tab>
                            <Tab label="Pie" >
                                <div id="pieChart"><PieChart data={this.props.data}/></div>
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
        data: state.docs,
    }
}

export default connect(mapStateToProps)(EditorView)
