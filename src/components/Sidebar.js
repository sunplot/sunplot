import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

export default class Sidebar extends React.Component{

    constructor(props) {
        super(props);
    }
    renderSolrList(){
        return this.props.solrs.map((solr,index)=>{
            return <MenuItem key={"solrcol" + index} onTouchTap={this.props.handleTouchTap}  value={"/streaming"} primaryText={solr.name} />
        })
    }
    render() {
        const styles = {
            headline: {
                fontSize: 24,
                paddingTop: 16,
                marginBottom: 12,
                fontWeight: 400,
            },
        };
        const tabHeader = {
            height:"64px"
        }
        return (
            <Drawer
                  open={this.props.menuOpen}
                  onRequestChange={open => this.setState({menuOpen: open})}
                  docked={true}>
                  <Tabs  id="moo">
                      <Tab label="Collections" >
                        <div>

                          <Menu>
                            {this.renderSolrList()}
                        </Menu>
                        </div>
                      </Tab>
                      <Tab label="History" style={tabHeader}>
                        <div>
                          <h2 style={styles.headline}>Previous commands</h2>
                          <p>
                            You can put any sort of HTML or react component in here. It even keeps the component state!
                          </p>
                          <Slider name="slider0" defaultValue={0.5} />
                        </div>
                      </Tab>

                  </Tabs>
            </Drawer>
        );
    }
}
