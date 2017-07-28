import React from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {cyan500,orange400,blueGrey500,grey200} from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import Sidebar from '../components/Sidebar'
import Editor from '../components/editor/Editor'
import muiThemeable from 'material-ui/styles/muiThemeable'
import classnames from 'classnames'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
// import Logo from 'material-ui/svg-icons/image/wb-sunny'
import {Logo} from           '../components/Logo'
import SettingsDialog from '../components/dialogs/SettingDialog'


const sunplotTheme = getMuiTheme({

    palette: {
        textColor: blueGrey500  ,
        primary1Color: orange400,
        accent1Color: cyan500,
    },
    bottomNavigation:{
        backgroundColor: grey200
    },
    appBar: {
        height: 50,
      },


});
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editorMode : props.location.pathname.slice(1)
        }

    }

    render(){
        return (
            <MuiThemeProvider muiTheme={sunplotTheme}>
                <div>
                    <div className={classnames('app-bar', {'expanded': this.state.menuOpen})}>
                        <AppBar title="Sunplot"
                            style={{backgroundColor:"white"}}
                            iconElementLeft={<IconButton><Logo /></IconButton>}
                            iconElementRight={<SettingsDialog />}>
                        </AppBar>
                    </div>
                    <Editor mode={this.state.editorMode}/>
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
