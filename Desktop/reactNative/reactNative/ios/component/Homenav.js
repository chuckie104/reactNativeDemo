import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  RefreshControl,
  TouchableHighlight,
  TabBarIOS
} from 'react-native';

import Util from "../../utils";
import FriendGroup from "./FriendGroup";

export default class Homenav extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
    }
  }

  _renderContent(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  }

  render(){
    return(<TabBarIOS
        style={{height:Util.size.rem*100}}
        unselectedTintColor="#7e7e7e"
        tintColor="#35b5e6"
        barTintColor="#fcfcfc">
        <TabBarIOS.Item
        icon={require('../images/ic_nav_cases_normal.png')}
         selectedIcon={require('../images/ic_nav_cases_actived.png')}
          title="档案"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
                      {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
        icon={require('../images/ic_nav_discover_normal.png')}
         selectedIcon={require('../images/ic_nav_discover_actived_copy.png')}
         
          title="超人圈"
          // badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          <FriendGroup></FriendGroup>

        </TabBarIOS.Item>
        <TabBarIOS.Item
        icon={require('../images/icon_tab_live_default.png')}
         selectedIcon={require('../images/icon_tab_live_actived.png')}
          title="在线直播"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
        icon={require('../images/ic_nav_my_normal.png')}
         selectedIcon={require('../images/ic_nav_my_pressed.png')}
          title="个人中心"
          selected={this.state.selectedTab === 'blue Tab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blue Tab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#1d8ae7', 'blue Tab', this.state.presses)}
        </TabBarIOS.Item>
      </TabBarIOS>)
  }


}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});
