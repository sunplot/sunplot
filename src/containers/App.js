import React from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {blueGrey900, blueGrey500, grey900,grey200} from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import Sidebar from '../components/Sidebar'
import FlareSubNav from '../components/FlareSubNav'
import Editor from '../components/editor/EditorView'
import muiThemeable from 'material-ui/styles/muiThemeable'
import classnames from 'classnames'
import {Footer} from '../components/Footer'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
const myTheme = getMuiTheme({
    palette: {
        textColor: blueGrey500  ,
    },
    bottomNavigation:{
        backgroundColor: grey200
    }
});
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuOpen : false,
            editorMode : props.location.pathname.slice(1)
        }
        //Bind the function.
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }
    handleTouchTap(){
        this.setState({ menuOpen: !this.state.menuOpen});
    }

    render(){
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}>
                <div>
                    <div className={classnames('app-bar', {'expanded': this.state.menuOpen})}>
                        <AppBar
                            title="Flare"
                            onLeftIconButtonTouchTap={this.handleTouchTap}
                            // style={{backgroundColor:blueGrey900}}
                            iconClassNameRight="muidocs-icon-navigation-expand-more">

                        </AppBar>
                    </div>
                    <Editor mode={this.state.editorMode}/>
                    <div>
                        <Sidebar handleTouchTap={this.handleTouchTap.bind(this)} menuOpen={this.state.menuOpen} solrs={this.props.solrs}></Sidebar>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        solrs: state.solrs,
        commands: state.commands,
    }
}

export default connect(mapStateToProps)(App)
