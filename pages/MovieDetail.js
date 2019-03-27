import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList
} from 'react-native';
import axios from "../axios";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video';
import Utils from "../utils";

let {width} = Dimensions.get('window');


export default class MovieDetail extends Component {
    static navigationOptions = {
        headerTitle: '11',
        headerBackTitle: '返回',  // 设置返回按钮文案，长度有限制，
        header:null,
    }
    constructor(props) {
        super(props);


        this.state = {
            numberOfLines: 2,
            movieInfo:{
                titles:'',
                nameEn:'',
                mins:'',
                img:'',
                type:'',
                director:'',
                overallRating:'',
                story:'',
                video:'',
            },
            actors:[],
            images:[],
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,

        };
    }

    componentDidMount() {
        let movie_id = this.props.navigation.state.params.movie_id
        let actorsArr=[];
        axios.get(`https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=${movie_id}`)
            .then((response) => {
                response.data.data.basic.actors.map((item, index) => {
                    if(index<8){
                        actorsArr.push(item)
                    }
                });
                this.setState({
                    movieInfo:{
                        titles:response.data.data.basic.name,
                        nameEn:response.data.data.basic.nameEn,
                        mins:response.data.data.basic.mins,
                        type:response.data.data.basic.type.join('|'),
                        director:response.data.data.basic.director.name,
                        img:response.data.data.basic.img,
                        overallRating:response.data.data.basic.overallRating,
                        story:response.data.data.basic.story,
                        video:response.data.data.basic.video.url,
                    },
                    actors:actorsArr
                })
            });
        let imagesArr=[]
        axios.get(`https://api-m.mtime.cn/Movie/ImageAll.api?movieId=${movie_id}`)
            .then((response) => {
                let arr=[]
                response.data.images.map((item, index) => {
                    if(item.type===6){
                        arr.push(item)
                    }
                });
                imagesArr = arr.filter((item, index) => {
                    return index < 6;
                });
                this.setState({
                    images:imagesArr
                })
            });
    }

    _horizontalScrollItem(data) {
        const {navigation} = this.props;
        return (data.map((item, index) => {
                return (
                    <View
                        key={index}
                        style={{margin: 10, justifyContent: 'center',height:146}}
                    >
                        <Image
                            style={{width: 100, height: 142,}}
                            source={{uri: item.img}}
                        />
                        <Text numberOfLines={1}
                              style={{textAlign: 'center', fontSize:12,paddingVertical: 10,color:'#333'}}>{item.name}</Text>
                    </View>
                )
            })
        )
    };

    _keyExtractor = (item, index) => "index" + index + item;

    _renderItem = ({item, index}) => {
        return (
            <View style={{ justifyContent: 'center',alignItems:'center',width:width,marginTop:3}}>
                <Image
                    style={{width: width/10*9.6,height:width/1.5}}
                    source={{uri: item.image}}

                />
            </View>

        );
    };

    onLoad = (data) => {
        this.setState({duration: data.duration});
        console.log(data.duration + "xxx");
    };


    render() {
        const {navigation} = this.props;
        const horizontalScrollItem = this._horizontalScrollItem(this.state.actors);

        return (
            <View style={styles.container}>
                <View style={{backgroundColor:'#fff,',width:width,alignItems:'center'}}>
                    <StatusBar barStyle="dark-content"/>
                    <View
                        style={styles.navBar}
                    >
                        <TouchableOpacity
                            onPress={()=>{
                                navigation.goBack()
                            }}
                        >
                        <Ionicons
                            name={'ios-arrow-back'}
                            size={26}
                            style={{color: '#0B7CA0'}}
                        />
                        </TouchableOpacity>
                        <Text style={{fontSize:20}}>{this.state.movieInfo.titles}</Text>
                        <Text> </Text>
                    </View>
                </View>

                <ScrollView style={{backgroundColor:'#ededed'}}>
                    <View style={{backgroundColor: '#fff', width: width, alignItems: 'center',marginTop:10}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            width: width / 10 * 9,
                            paddingVertical: 10
                        }}>
                            <View style={{flex: 4}}>
                                <Image
                                    style={{width: 120, height: 172}}
                                    source={{uri:this.state.movieInfo.img}}
                                />
                            </View>
                            <View style={{
                                flex: 6,
                                alignItems: 'flex-start',
                                justifyContent: 'space-around',
                                height: 170
                            }}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.state.movieInfo.titles}</Text>
                                <Text style={{color: '#666'}}>{this.state.movieInfo.nameEn}</Text>
                                <Text>{this.state.movieInfo.mins}</Text>
                                <Text>{this.state.movieInfo.type}</Text>
                                <Text>导演: {this.state.movieInfo.director}  </Text>
                                <Text style={styles.rate}>
                                    {this.state.movieInfo.overallRating<0?'N':this.state.movieInfo.overallRating}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{marginTop: 10, backgroundColor: '#fff', alignItems: 'center'}}>
                        <Text
                            numberOfLines={this.state.numberOfLines}
                            style={{padding: 12, color: '#333', letterSpacing: 2}}
                        >
                            剧情:
                            {this.state.movieInfo.story}
                            </Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    numberOfLines: this.state.numberOfLines ? null : 2
                                })
                            }}
                        >
                            {this.state.numberOfLines ?
                                <Ionicons
                                    name={'ios-arrow-down'}
                                    size={20}
                                    style={{color: '#666'}}
                                /> : <Ionicons
                                    name={'ios-arrow-up'}
                                    size={20}
                                    style={{color: '#666'}}
                                />
                            }

                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:10,backgroundColor:'#fff'}}>
                        <Text style={{marginLeft:10,paddingVertical:10}}>演员表:</Text>
                        <ScrollView
                            horizontal={true}
                        >
                            {horizontalScrollItem}
                        </ScrollView>

                    </View>

                    <View style={{marginTop:10,backgroundColor:'#fff',width:width,paddingBottom:20}}>
                        <Text style={{marginLeft:10,paddingVertical:10,}}>预告片:</Text>
                        <TouchableOpacity
                            onPress={() => this.setState({paused: !this.state.paused})}>
                            <Video
                                style={{height:210,paddingVertical:20,width:width,}}
                                ref={(ref) => {
                                    this.video = ref
                                }}
                                // source={{ uri: 'https://gslb.miaopai.com/stream/HNkFfNMuhjRzDd-q6j9qycf54OaKqInVMu0YhQ__.mp4?ssig=bbabfd7684cae53660dc2d4c2103984e&time_stamp=1533631567740&cookie_id=&vend=1&os=3&partner=1&platform=2&cookie_id=&refer=miaopai&scid=HNkFfNMuhjRzDd-q6j9qycf54OaKqInVMu0YhQ__', type: 'mpd' }}
                                source={{uri:this.state.movieInfo.video}}//设置视频源
                                // style={styles.fullScreen}//组件样式
                                rate={this.state.rate}//播放速率
                                paused={this.state.paused}//暂停
                                volume={this.state.volume}//调节音量
                                muted={this.state.muted}//控制音频是否静音
                                resizeMode={this.state.resizeMode}//缩放模式
                                onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                                // onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                                // onEnd={this.onEnd}//视频播放结束时的回调函数
                                // onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
                                // onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
                                repeat={false}//确定在到达结尾时是否重复播放视频。
                            />
                            <View style={styles.playIcon}>
                                {this.state.paused ?
                                    <Ionicons
                                        name={'ios-play-circle'}
                                        size={100}
                                        style={{color: '#fff'}}
                                    /> :null
                                }
                            </View>

                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10,backgroundColor:'#fff',width:width}}>
                        <Text style={{marginLeft:10,paddingVertical:10}}>剧照:</Text>
                        <FlatList
                            ref={'test'}
                            data={this.state.images}//获取列表数据源
                            renderItem={this._renderItem}//渲染列表
                            onEndReachedThreshold={1}
                            keyExtractor={this._keyExtractor}
                            style={{arguments: 'center'}}
                        />
                    </View>


                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    rate: {
        backgroundColor: '#50A04A',
        color: '#fff',
        fontSize: 16,
        position: 'absolute',
        right: 10,
        bottom: 40,
        paddingVertical: 6,
        paddingHorizontal: 4,
        textAlign: 'center',
    },
    playIcon:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:[{translateX: -40},{translateY: -50} ]
    },
    navBar: {
        paddingVertical:10,
        width: width/10*9,
        marginTop: Utils.isIphoneX() || Utils.isIphoneXR() ? 34 : 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row',
        backgroundColor:'#fff'
    },
});
