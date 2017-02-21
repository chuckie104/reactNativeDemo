import React, { Component } from 'react';
import {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Video from 'react-native-video';
export default class HelloWorld extends Component{
  constructor(props){
    super(props);
    this.state={
      rate: 0,
     volume: 1,
     muted: false,
     resizeMode: 'contain',
     duration: 0.0,
     currentTime: 0.0,
     controls: false,
     paused: true,
     skin: 'custom',
     isBuffering: false
    }
  }
  componentWillMount(){
      console.log(456);
  }
  load(data){
    //获得总时间
    this.setState({duration: data.duration});
  }
  setTime(data){
    this.setState({currentTime: data.currentTime});
  }
  pause(){
    
    this.setState({rate:1});
  }
  //进度条函数
  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }
  render(){
    return(
      <View>
      <Video
        style={{width:400,height:400}}
        source={{uri: "http://cloud.siui.com/UploadFiles/1266819/CaseFiles/16082301_MYVDU15825006281/001/20160831_114237.mp4"}}
        onLoad={(data)=>this.load(data)}
        onProgress={(data)=>this.setTime(data)}
        rate={this.state.rate}  >
      </Video>
      <TouchableOpacity
      style={styles.pause}
      onPress={()=>this.pause()}>
          <Text>播放</Text>
          <Text>视频</Text>
      </TouchableOpacity>
      <Text>Hello world!</Text>
      </View>
    )

  }
}


const styles = StyleSheet.create({
  pause:{
    width:50,
    height:50,
    borderRadius:25,
    borderWidth:1,
    borderColor:"#e5e5e5",
    justifyContent:"center",
    alignItems:"center"
  }
})
// AppRegistry.registerComponent('chuckie',()=>HelloWorld);
