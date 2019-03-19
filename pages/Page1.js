/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, Dimensions, ScrollView,StatusBar,FlatList} from 'react-native';
import Swiper from 'react-native-swiper'

import Carousel, {Pagination} from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../components/styles/SliderEntry.style';
import styles, {colors} from '../components/styles/index';

import SliderEntry from '../components/SliderEntry';
import axios from '../axios/index';
import Utils from "../utils";

type Props = {};
let {width} = Dimensions.get('window');

const SLIDER_1_FIRST_ITEM = 1;

export default class Page1 extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            swiperItems: [{
                title: "西游伏妖篇",
                subtitle: "奇幻",
                illustration: "http://img5.mtime.cn/mt/2017/01/27/114649.37790398_1280X720X2.jpg"
            },
                {
                    title: "西游伏妖篇",
                    subtitle: "奇幻",
                    illustration: "http://img5.mtime.cn/mt/2017/01/27/114649.37790398_1280X720X2.jpg"
                },
                {
                    title: "西游伏妖篇",
                    subtitle: "奇幻",
                    illustration: "http://img5.mtime.cn/mt/2017/01/27/114649.37790398_1280X720X2.jpg"
                },
                {
                    title: "西游伏妖篇",
                    subtitle: "奇幻",
                    illustration: "http://img5.mtime.cn/mt/2017/01/27/114649.37790398_1280X720X2.jpg"
                }
            ],
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            taskList: [
                {taskId:"9",title:"查看营销推广",integral:"50",status:1},
                {taskId:"10",title:"查看客户管理",integral:"100",status:1},
                {taskId:"11",title:"查看买车线索",integral:"100",status:1},
                {taskId:"12",title:"查看全部功能",integral:"200",status:1}
            ]
        };
    }

    static navigationOptions = {
        Headers: null,
        headerBackTitle: '返回'   // 设置返回按钮文案，长度有限制,
    }

    componentWillMount() {
        // axios.get('https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=974')
        //         .then((response) => {
        //             // response.data.movies
        //             // response.data.movies.map()
        //             let newArr =[]
        //             console.log(response.data.movies)
        //             response.data.movies.map((item,index)=>{
        //                 if(index<5){
        //                     newArr.push(item['img'])
        //                 }
        //             })
        //
        //             this.setState({
        //                 swiperItems:newArr
        //             });
        //
        //
        //
        //         });
        console.log(this.state.swiperItems);
        // this.setState({
        //     swiperItems:[1,2,34]
        // });


    }

    // componentDidMount(){
    //     axios.get('https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=974')
    //         .then((response) => {
    //             // response.data.movies
    //             this.setState({
    //                 swiperItems:[...[response.data.movies[0].img,response.data.movies[1].img,response.data.movies[2].img]]
    //             })
    //         });
    //     console.log(this.state.swiperItems);
    // }
    _renderItemWithParallax({item, index}, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    mainExample(number, title) {
        const {slider1ActiveSlide} = this.state;

        return (
            <View style={styles.exampleContainer}>
                <Text ref={ref => this.headerTitle = ref} style={styles.title}>最热电影</Text>
                <Text style={styles.subtitle}>{title}</Text>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={this.state.swiperItems}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    // inactiveSlideShift={20}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
                />
            </View>
        );
    }


    _renderItem = ({ item, index }) => {
        return (
            <View  key={index}>
                <View >
                    <Text >{item.title}</Text>
                    <Text >
                        任务奖励<Text style={{ color: "#FF552E" }}>+{item.integral}积分</Text>
                    </Text>
                </View>
                <View >
                    <Text>去完成</Text>
                </View>
            </View>
        );
    };
    _onScroll=(event)=>{
        let y = event.nativeEvent.contentOffset.y
        let opacityPercent = y / 64
        if(y < 34) {
            this.navBar.setNativeProps({
                style: {
                    opacity: opacityPercent,
                    height: y/2
                }
            })
            this.headerTitle.setNativeProps({
                style: {
                    opacity: 1-opacityPercent,
                }
            })
        }else if (y < 64) {
            this.navBar.setNativeProps({
                style: {
                    opacity: opacityPercent,
                    height:y/2
                }
            })

        } else {
            this.navBar.setNativeProps({
                style: {
                    opacity: 1,
                    height:32
                }
            })
        }
    }
    render() {
        const {navigation} = this.props;
        const example1 = this.mainExample(1, '');

        return (
            <View style={stylesPage1.container}>
                <StatusBar translucent={true} barStyle="light-content" />
                <View
                    ref={ref => this.navBar = ref}
                    style={stylesPage1.navBar}
                ><Text style={{color:'#fff',fontSize:20}}>最热电影</Text></View>

                <ScrollView
                    onScroll={this._onScroll}
                    scrollEventThrottle={1} // scrollEventThrottle属性值设置比较低时，对位置比较敏感，会多次触发onScroll，该属性默认为0。

                    style={{backgroundColor:'#ededed'}}
                >

                        <View style={{backgroundColor:'#5479a0'}}>
                            {example1}
                        </View>

                        <Text style={stylesPage1.welcome}>Welcome to React Pages1!111</Text>
                        <Button
                            title={'go back'}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />

                        <Button
                            title={'跳转到页面2'}
                            onPress={() => {
                                navigation.navigate('Page2');
                            }}
                        />
                        <Button
                            title={'跳转到页面5'}
                            onPress={() => {
                                navigation.navigate('Page5');
                            }}
                        />
                        <Button
                            title={'go BottomNavigator'}
                            onPress={() => {
                                navigation.navigate('Bottom')
                            }}
                        />
                        <Button
                            title={'go TopNavigator'}
                            onPress={() => {
                                navigation.navigate('Top')
                            }}
                        />
                        <Button
                            title={'go DrawerNav'}
                            onPress={() => {
                                navigation.navigate('DrawerNav')
                            }}
                        />
                    <FlatList
                        data={this.state.taskList}//获取列表数据源
                        renderItem={this._renderItem}//渲染列表
                    />
                    <FlatList
                        data={this.state.taskList}//获取列表数据源
                        renderItem={this._renderItem}//渲染列表
                    />
                    <FlatList
                        data={this.state.taskList}//获取列表数据源
                        renderItem={this._renderItem}//渲染列表
                    />
                    <FlatList
                        data={this.state.taskList}//获取列表数据源
                        renderItem={this._renderItem}//渲染列表
                    />
                    </ScrollView>


            </View>

        );
    }
}

const stylesPage1 = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    container: {
        backgroundColor:'#5479a0'
    },
    swiperContainer: {
        height: width / 1.5 * 1.42
    },
    swiper: {
        // flex:1,
        // alignItems:'center',
        // justifyContent:'center'
        backgroundColor: '#ededed'
    },
    img: {
        width: width / 1.5,
        height: width / 1.5 * 1.42,
        marginLeft: (width - width / 1.5) / 2
    },
    navBar:{
        height:0,
        width:width,
        marginTop:Utils.isIphoneX() || Utils.isIphoneXR()?34:20,
        color:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },

});
