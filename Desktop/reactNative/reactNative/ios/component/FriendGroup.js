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
    this.state={
      leftNavBottomWidth:3,
      leftNavBottomColor:"#1d8ae7",
      RightNavBottomWidth:1,
      RightNavBottomColor:"#e5e5e5",
      selectAll:true,
      dataSource:[],
      rightDataSource:[],
      pageNo:1,
      pageNumber:1
    }
  }

  componentWillMount(){
    let self = this;

      Util.fetchFunGet(`http://cloud.siui.com:8070/api/Forum?pageNumber=1&pageSize=5&sortName=ForumID&sortOrder=desc&where=`,
      (data)=>{
        self.setState({dataSource:data.Rows});
      });
        Util.fetchFunGet(`http://cloud.siui.com:8070/api/Forum/GetByFollowing?pageNumber=1&pageSize=5&sortName=ForumID&sortOrder=desc&where=`,
      (data)=>{
        self.setState({rightDataSource:data.Rows});
      });
  }


  //上方导航切换
  _onPressLeftNav(){
    this.setState({
      leftNavBottomWidth:3,
      leftNavBottomColor:"#1d8ae7",
      RightNavBottomWidth:1,
      RightNavBottomColor:"#e5e5e5",
      selectAll:true
    });
  }

  _onPressRightNav(){
    this.setState({
      leftNavBottomWidth:1,
      leftNavBottomColor:"#e5e5e5",
      RightNavBottomWidth:3,
      RightNavBottomColor:"#1d8ae7",
      selectAll:false
    });
  }

  //拿组件返回的pageNum
  updatePage(params){

    if(this.state.selectAll){
      //超人圈
      this.setState({pageNo:params});
    }else{
      //好友圈
      this.setState({pageNumber:params});
    }
  }

  //下啦刷新
  updateList(params){
    if(this.state.selectAll){
      //超人圈
      this.setState({dataSource:params});
    }else{
      //好友圈
      this.setState({rightDataSource:params});
    }
  }
  //点赞
  checkLike(params){

    let array=[];
    let liked=false;
    let self = this;
    let num=0;
    let forumID="";
    if(this.state.selectAll){
      //超人圈
       array = this.state.dataSource;
    }else{
      //好友圈
       array = this.state.rightDataSource;
    }
    for(let i in array){
      if(params == i){
        liked=array[i].liked;
        forumID=array[i].vForum.ForumID;

      }
    }
    Util.fetchFun(`http://cloud.siui.com:8070/api/ForumLiker`,{forumID:forumID+"",likeType:!liked},(data)=>{
      if(data.errorType==0){
        array[params].liked=!liked;
        if(self.state.selectAll){
          self.setState({dataSource:array});
        }else{
          self.setState({rightDataSource:array});
        }

      }
    });
  }


  render(){
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource=ds.cloneWithRows(this.state.dataSource);

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
          {this.state.selectAll?
            <GroupList
            dataSource={this.state.dataSource} pageNo={this.state.pageNo+1}
            updatePage={(params)=>this.updatePage(params)}
            url={`http://cloud.siui.com:8070/api/Forum?pageNumber=${this.state.pageNo+1}&pageSize=5&sortName=ForumID&sortOrder=desc&where=`}
            refeshUrl={`http://cloud.siui.com:8070/api/Forum?pageNumber=1&pageSize=5&sortName=ForumID&sortOrder=desc&where=`}
            updateList={(params)=>this.updateList(params)}
            checkLike={(params)=>this.checkLike(params)}
            />:
            <GroupList dataSource={this.state.rightDataSource} pageNo={this.state.pageNumber+1}
            updatePage={(params)=>this.updatePage(params)}
            url={`http://cloud.siui.com:8070/api/Forum/GetByFollowing?pageNumber=${this.state.pageNumber+1}&pageSize=5&sortName=ForumID&sortOrder=desc&where=`}
            refeshUrl={`http://cloud.siui.com:8070/api/Forum/GetByFollowing?pageNumber=1&pageSize=5&sortName=ForumID&sortOrder=desc&where=`}
            updateList={(params)=>this.updateList(params)}
            checkLike={(params)=>this.checkLike(params)}/>
          }
      </View>

    )
  }
}


//超人圈数据list组件
class GroupList extends Component{
  constructor(props){
    super(props);
    this.state={
      isRefreshing: false
    }
  }



  //下啦刷新
  _onRefresh(){
    let self = this;
    let pageNo  = this.state.pageNo+1;

    self.setState({isRefreshing: true});
    Util.fetchFunGet(this.props.refeshUrl,
    (data)=>{
      var newArray = data.Rows;
      this.props.updateList(newArray);
      this.props.updatePage(1);
      self.setState({isRefreshing: false});
    });
  }
  //滑动加载
  _updateList(event){
    let self = this;
    let json = event.nativeEvent;
    let contentOffset =json.contentOffset.y;
    let contentSize = json.contentSize.height;

    let layoutMeasurement=json.layoutMeasurement.height;
    if(contentOffset+layoutMeasurement==contentSize){

      let pageNo = this.props.pageNo;
      //到了底部调用接口
      Util.fetchFunGet(this.props.url,
      (data)=>{
        var newArray = this.props.dataSource.concat(data.Rows);
        this.props.updateList(newArray);
        this.props.updatePage(pageNo);
      });

    }
  }

  //点赞功能
  checkLike(ForumID){

    this.props.checkLike(ForumID);

    }
      //每个行加下划线
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {

     return (
       <View key={`{sectionID}-${rowID}`}
         style={{height:Util.size.rem*10,
         backgroundColor:"#f4f5f7"}}>
       </View>
     );
   }

  render(){

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource=ds.cloneWithRows(this.props.dataSource);
    return(
      <View>
            <ScrollView
                style={{height:1000*Util.size.rem}}
                showsVerticalScrollIndicator={true}
                automaticallyAdjustContentInsets={false}
                scrollToEnd={{animated: true}}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={()=>this._onRefresh()}
                    tintColor="#333"
                    title="Loading..."
                    titleColor="#333"
                  />
             }
             onContentSizeChange={(contentWidth, contentHeight)=>{this.setState({contentHeight:contentHeight})}}
             onScroll={(event)=>this._updateList(event)}>
            <ListView
              dataSource={dataSource}
              renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this._renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
              renderRow={(rowData, sectionID, rowID, highlightRow) =>
                {
                    let {vForum,forumFilesURL,commentCount,likerCount,liked}=rowData;

                    let {ForumID,CustomTitle,CustomDescription,CreateTime,Nickname,Avatar,CreateUserID}=vForum;

                    //转换下格式
                    CreateTime=CreateTime.replace(/T/g, ' ');
                    CreateTime=CreateTime.substring(0,19);

                    let list =forumFilesURL.map((item,key)=>{
                    return  <Image key={key} style={[styles.imgShow,{marginRight:Util.size.rem*10}]} source={{uri:item}}/>
                     }
                   );
                    let imgShow = liked?
                    <Image style={styles.loveGrey}source={require('../images/maopao_extra_liked.png')}/>:
                    <Image style={styles.loveGrey} source={require('../images/maopao_extra_like.png')}/>;
                    return (<View style={styles.list}>
                            <Image
                            style={styles.userAvater}
                            source={{uri:"http://cloud.siui.com/"+Avatar}}/>
                            <View
                            style={styles.listAside}>
                                <Text style={styles.name}>{Nickname}</Text>
                                <Text style={styles.title}>{CustomTitle}</Text>
                                <Text style={styles.descrition}>{CustomDescription}</Text>
                                <View style={styles.imgList}>
                                    {list}
                                </View>
                                <View style={styles.botCss}>
                                    <Text style={styles.time}>{CreateTime}</Text>
                                    {CreateUserID==2000000?<Text style={styles.delete}>删除</Text>:<Text style={styles.delete}></Text>}
                                    <TouchableOpacity onPress={()=>this.checkLike(rowID)}>
                                    {imgShow}
                                    </TouchableOpacity>
                                    <Text style={{lineHeight:Util.size.rem*50,marginRight:10}}>{likerCount}</Text>
                                    <Image style={styles.loveGrey}
                                            source={require('../images/maopao_extra_commentopy.png')}/>
                                    <Text style={{lineHeight:Util.size.rem*50,marginRight:10}}>{commentCount}</Text>
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
    }

})
