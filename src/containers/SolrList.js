import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import AddToQueue from 'material-ui/svg-icons/content/add'
import {connect} from 'react-redux';
import SettingsForm from '../components/form/SettingsForm'

const addIcon = <AddToQueue />;
const nearbyIcon = <IconLocationOn />;

class SolrList extends React.Component{
    renderSolrList(){
        return this.props.solrs.map((solr)=>{
            return <li key={solr.id}>{solr.name} {solr.url}</li>
        })
    }
    render(){

        return(
            <MuiThemeProvider>
                <div>
                    <SettingsForm />
                    <ul>
                        {this.renderSolrList()}
                    </ul>
                </div>
        </ MuiThemeProvider>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        solrs: state.solrs,
        commands: state.commands,
    }
}

export default connect(mapStateToProps)(SolrList)
