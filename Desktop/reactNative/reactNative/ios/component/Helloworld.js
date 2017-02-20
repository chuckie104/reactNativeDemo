import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class HelloWorld extends Component{
  componentWillMount(){
      console.log(456);
  }
  render(){
    return(
      <Text>Hello world!</Text>
    )

  }
}

// AppRegistry.registerComponent('chuckie',()=>HelloWorld);
