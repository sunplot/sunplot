import React, {Component} from 'react'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import StreamIcon from 'material-ui/svg-icons/action/view-stream'
import SearchIcon from 'material-ui/svg-icons/action/search'
import RaisedButton from 'material-ui/RaisedButton';
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>
const searchIcon = <SearchIcon />
const streamIcon = <StreamIcon />
const nearbyIcon = <IconLocationOn />

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
export default class FlareSubNav extends React.Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});
  query(){

      //Clear existing data
      this.setState({docs: []});
      //TODO call solr
      const dataResp = {"result-set":
          {
              docs: [
                      {
                          movie_title: "Avatar",
                          actor_1_name: "CCH Pounder",
                          plot_keywords: [
                          "avatar|future|marine|native|paraplegic"
                          ],
                          num_user_for_reviews: 3054,
                          _version_: 1570209258313613300,
                          content_rating: "PG-13",
                          director_name: "James Cameron",
                          genres: [
                          "Action|Adventure|Fantasy|Sci-Fi"
                          ]
                      },
                      {
                          EOF: true,
                          RESPONSE_TIME: 67
                      }
                  ]
              }
          }
      this.setState({docs: dataResp});
  }
  render() {
      const btnStyle = {
          margin: 12,
          align:"right",
          width:"10%"
      };
    return (
      <Paper zDepth={1}>

        <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Solr Streams"
              icon={streamIcon}
              onTouchTap={this.query.bind(this)}
            />
            
          <BottomNavigationItem
            label="Solr Streams"
            icon={streamIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="SQL Query"
            icon={searchIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Solr Query"
            icon={searchIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}
