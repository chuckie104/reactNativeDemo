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
  ScrollView
} from 'react-native';

import Util from "../../utils";

export default class FriendGroup extends Component{
  constructor(props){
    super(props);
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      leftNavBottomWidth:3,
      leftNavBottomColor:"#1d8ae7",
      RightNavBottomWidth:1,
      RightNavBottomColor:"#e5e5e5",
      dataSource:ds.cloneWithRows([{name:"aa",title:"22dasd",descrition:"weqweqadsdasdas",imgUrl:[require("../images/aaa.jpg"),require("../images/aaa.jpg")],time:"2016.10.10",isLove:true,loveNum:3,commandNum:4},
      {name:"aa",title:"22dasd",descrition:"weqweqadsdasdas",imgUrl:[require("../images/aaa.jpg"),require("../images/aaa.jpg")],time:"2016.10.10",isLove:true,loveNum:3,commandNum:4},
    {name:"aa",title:"22dasd",descrition:"weqweqadsdasdas",imgUrl:[require("../images/aaa.jpg"),require("../images/aaa.jpg")],time:"2016.10.10",isLove:true,loveNum:3,commandNum:4},
  {name:"aa",title:"22dasd",descrition:"weqweqadsdasdas",imgUrl:[require("../images/aaa.jpg"),require("../images/aaa.jpg")],time:"2016.10.10",isLove:true,loveNum:3,commandNum:4}]),
      isRefreshing: false
    }
  }

  componentWillMount(){

  }

  _onPressLeftNav(){
    this.setState({
      leftNavBottomWidth:3,
      leftNavBottomColor:"#1d8ae7",
      RightNavBottomWidth:1,
      RightNavBottomColor:"#e5e5e5"
    });
  }


  _onPressRightNav(){
    this.setState({
      leftNavBottomWidth:1,
      leftNavBottomColor:"#e5e5e5",
      RightNavBottomWidth:3,
      RightNavBottomColor:"#1d8ae7",

    });
  }
  _onRefresh(){
     this.setState({isRefreshing: true});

  }

  render(){


    return(
      <View style={styles.contain}>
          <View style={styles.flex}>
            <Text style={styles.headerText}>超人圈</Text>
            <Image
           style={styles.logo}
           source={require('../images/ic_menu_public_forum.png')}
           />
          </View>
          <View style={styles.nav}>
              <TouchableOpacity
              style={[styles.leftNav,{
                borderBottomWidth:this.state.leftNavBottomWidth,
              borderBottomColor:this.state.leftNavBottomColor}]}
              onPress={()=>this._onPressLeftNav()}
              >
                  <Text>广场</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.rightNav,{
                borderBottomWidth:this.state.RightNavBottomWidth,
              borderBottomColor:this.state.RightNavBottomColor}]}
                onPress={()=>this._onPressRightNav()}
              >
                <Text>好友圈</Text>
              </TouchableOpacity>
          </View>
          <ScrollView
          style={{height:1000*Util.size.rem}}
          showsVerticalScrollIndicator={true}
          automaticallyAdjustContentInsets={false}
          scrollToEnd={{animated: true}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={()=>this._onRefresh}
              tintColor="#333"
              title="Loading..."
              titleColor="#333"
            />
           }
           onContentSizeChange={(contentWidth, contentHeight)=>{this.setState({contentHeight:contentHeight})}}
           onScroll={(event)=>{
             let json = event.nativeEvent;
             let contentOffset =json.contentOffset.y;
             let layoutMeasurement=json.layoutMeasurement.height;
             if(contentOffset+layoutMeasurement==this.state.contentHeight){
               //到了底部调用接口
             }
           }}>
          <ListView
            dataSource={this.state.dataSource}

            renderRow={(rowData) =>
              {
                  let list =rowData.imgUrl.map((item,key)=>{
                  return  <Image key={key} style={[styles.imgShow,{marginRight:Util.size.rem*10}]} source={item}/>
                   }

                 )
                  let imgShow = !rowData.isLove?<Image style={styles.loveGrey}source={require('../images/maopao_extra_like.png')}/>:<Image style={styles.loveGrey} source={require('../images/maopao_extra_liked.png')}/>;
                  return (<View style={styles.list}>
                          <Image
                          style={styles.userAvater}
                          source={require('../images/user-img.png')}/>
                          <View
                          style={styles.listAside}>
                              <Text style={styles.name}>{rowData.name}</Text>
                              <Text style={styles.title}>{rowData.title}</Text>
                              <Text style={styles.descrition}>{rowData.descrition}</Text>
                              <View style={styles.imgList}>
                                  {list}
                              </View>
                              <View style={styles.botCss}>
                                  <Text style={styles.time}>{rowData.time}</Text>
                                  <Text style={styles.delete}>{rowData.delete}</Text>
                                  {imgShow}
                                  <Text style={{lineHeight:Util.size.rem*50,marginRight:10}}>{rowData.loveNum}</Text>
                                  <Image style={styles.loveGrey}
                                          source={require('../images/maopao_extra_commentopy.png')}/>
                                  <Text style={{lineHeight:Util.size.rem*50,marginRight:10}}>{rowData.commandNum}</Text>
                              </View>
                          </View>
                    </View>);
              }

            }
          />
          </ScrollView>

      </View>

    )
  }
}

const styles =StyleSheet.create({

    flex:{
      marginTop:20,
      height:Util.size.rem*80,
      backgroundColor:"#1d8ae7",
      position:"relative"
    },
    headerText:{
      textAlign:"center",
      lineHeight: Util.size.rem*80,
      fontSize: Util.size.rem*34,
      color:"#fff"
    },
    logo:{
      position:"absolute",
      right:14,
      top:Util.size.rem*20,
      width:Util.size.rem*40,
      height:Util.size.rem*40
    },
    nav:{

      flexDirection:"row",
      height:Util.size.rem*80,
    },
    leftNav:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      height:Util.size.rem*80,
      backgroundColor:"#f4f5f7",
      borderBottomWidth:1,
      borderBottomColor:"#e5e5e5",
      borderStyle: "solid"
    },
    leftNavActive:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      height:Util.size.rem*80,
      backgroundColor:"#f4f5f7",
      borderBottomWidth:5,
      borderBottomColor:"#e5e5e5",
      borderStyle: "solid"
    },
    rightNav:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      height:Util.size.rem*80,
      backgroundColor:"#f4f5f7",
      borderBottomWidth:1,
      borderBottomColor:"#e5e5e5",
      borderStyle: "solid"
    },
    list:{
      paddingTop:10,
      paddingBottom:10,
      flexDirection:"row",
      paddingLeft:Util.size.rem*20,
      paddingRight:Util.size.rem*20,
      borderBottomWidth:Util.size.rem*20,
      borderBottomColor:"#e5e5e5",
      borderStyle: "solid"
    },
    userAvater:{
      width:Util.size.rem*80,
      height:Util.size.rem*80,
      borderRadius:Util.size.rem*40,
      marginRight:Util.size.rem*20
    },
    listAside:{
      width:Util.size.rem*600
    },
    name:{
      lineHeight:Util.size.rem*80
    },
    title:{
      lineHeight:Util.size.rem*40
    },
    descrition:{
      marginTop:10,
      lineHeight:Util.size.rem*40,
      backgroundColor:"#f3f3f3"
    },
    imgList:{
        flexDirection:"row",
        marginTop:10,
        flexWrap:"wrap"
    }
    ,imgShow:{
      width:Util.size.rem*190,
      height:Util.size.rem*190,
      marginBottom:10
    },
    botCss:{
      marginTop:10,
      flexDirection:"row",
      height:Util.size.rem*50
    }
    ,time:{
      lineHeight:Util.size.rem*50,
      width:Util.size.rem*350,
      color:"#a3a3a3"
    }
    ,delete:{
      lineHeight:Util.size.rem*50,
      width:Util.size.rem*90,
      color:"#4eaf7c"
    },
    loveGrey:{
      marginTop:Util.size.rem*5,
      width:Util.size.rem*40,
      height:Util.size.rem*40,
      marginRight:Util.size.rem*14
    },
    line:{
      height:Util.size.rem*10,
      backgroundColor:"#f4f5f7"
    }

})
