/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    ScrollView,
    StatusBar,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../components/styles/SliderEntry.style';
import styles, {colors} from '../components/styles/index';

import SliderEntry from '../components/SliderEntry';
import MovieLists from '../components/MovieLists'

import axios from '../axios/index';
import Utils from "../utils";
import {connect} from "react-redux";
import MovieDetail from "./MovieDetail";


let {width} = Dimensions.get('window');

const SLIDER_1_FIRST_ITEM = 1;

const defaultItrem = {
    title: "",
    subtitle: "",
    illustration: "",
};

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city_info: {
                city_id: this.props.CityInfo.cityInfo.city_id,
                city_name: this.props.CityInfo.cityInfo.city_name
            },
            getEnd: false,
            swiperItems: [defaultItrem, defaultItrem, defaultItrem, defaultItrem], // 轮播站位
            horizontalScrollItem: [],
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            locationMoviesLength: 0,
            movieComingNewLength: 0,
            showLoading: true,
            movieComingNewLists: {},
            showMovieLists: false,
        };
    }

    static navigationOptions = {
        Headers: null,
        headerBackTitle: '返回'   // 设置返回按钮文案，长度有限制,
    }

    componentWillMount() {
      this._getLocationMovies();
        this._getMovieComingNew();
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps.CityInfo.cityInfo.city_id!=this.state.city_info.city_id){
            this._getMovieComingNew();
            this._getLocationMovies();
        }


    }
    _getLocationMovies=()=>{
        let swiperMoviesLists = []; // 轮播数据
        let scrollMoviesLists = []; // 水平滑动列表数据

        axios.get(`https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=${this.state.city_info.city_id}`)
            .then((response) => {
                let swiperListsData = response.data.ms.filter((item, index) => {
                    return index < 5;
                });
                let scrollListData = response.data.ms.filter((item, index) => {
                    return index > 4 && index < 15;
                });
                swiperListsData.map((item, index) => {
                    swiperMoviesLists.push({
                        title: item.t,
                        subtitle: item.movieType,
                        illustration: item.img.replace(/2.jpg/, '1.jpg'),
                        movie_id:item.id
                    })
                });
                scrollListData.map((item, index) => {
                    scrollMoviesLists.push({
                        t: item.t,
                        img: item.img.replace(/2.jpg/, '1.jpg'),
                        r: item.r > 0 ? item.r : '预售',
                        movie_id:item.id
                    })
                });
                this.setState({
                    swiperItems: swiperMoviesLists,
                    locationMoviesLength: response.data.ms.length,
                    horizontalScrollItem: scrollMoviesLists
                })
            });
    }
    _renderItemWithParallax({item, index}, parallaxProps) {
        return (
            <SliderEntry
                navigation={this.props.navigation}
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
                    renderItem={this._renderItemWithParallax.bind(this)}
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

    _horizontalScrollItem(data) {
        const {navigation} = this.props;
        return (data.map((item, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('MovieDetail', {
                                movie_id: item.movie_id,
                                callback: (backdata) => {
                                }
                            });
                        }}
                        key={index}
                        style={{margin: 10, justifyContent: 'center'}}
                    >
                        <Image
                            style={{width: 100, height: 142,}}
                            source={{uri: item.img}}
                        />
                        <View style={stylesHome.tag}><Text style={{color: '#fff'}}>{item.r}</Text></View>
                        <Text numberOfLines={1}
                              style={{textAlign: 'center', paddingVertical: 10, width: 100}}>{item.t}</Text>
                    </TouchableOpacity>
                )
            })
        )
    };

    _keyExtractor = (item, index) => "index" + index + item;

    _onScroll = (event) => {
        let y = event.nativeEvent.contentOffset.y
        let opacityPercent = y / 64
        if (y < 20) {
            this.navBar.setNativeProps({
                style: {
                    height: 0
                }
            })
        }
        if (y < 34) {
            this.navBar.setNativeProps({
                style: {
                    opacity: opacityPercent,
                    height: y / 2
                }
            })
            this.headerTitle.setNativeProps({
                style: {
                    opacity: 1 - opacityPercent,
                }
            })
        } else if (y < 64) {
            this.navBar.setNativeProps({
                style: {
                    opacity: opacityPercent,
                    height: y / 2
                }
            })

        } else {
            this.navBar.setNativeProps({
                style: {
                    opacity: 1,
                    height: 32
                }
            })
        }
    }

    _getMovieComingNew = () => {
        let arr = [];
        axios.get(`https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=${this.state.city_info.city_id}`)
            .then((response) => {
                response.data.attention.map((item, index) => {
                    arr.push({
                        title: item.title,
                        type: item.type,
                        image: item.image.replace(/2.jpg/, '1.jpg'),
                        actor1: item.actor1,
                        actor2: item.actor2,
                        movie_id:item.id
                    })
                });

                this.setState({
                    movieComingNewLists: {
                        data: arr,
                    },
                    movieComingNewLength:response.data.moviecomings.length,
                    showLoading: false,
                    showMovieLists: true
                })

            });

    };

    render() {
        const {navigation} = this.props;
        const example1 = this.mainExample(1, '');
        const horizontalScrollItem = this._horizontalScrollItem(this.state.horizontalScrollItem);

        return (
            <View style={stylesHome.container}>
                <StatusBar translucent={true} barStyle="light-content"/>
                <View
                    ref={ref => this.navBar = ref}
                    style={stylesHome.navBar}
                ><Text style={{color: '#fff', fontSize: 20}}>最热电影</Text></View>

                <ScrollView
                    onScroll={this._onScroll}
                    scrollEventThrottle={10} // scrollEventThrottle属性值设置比较低时，对位置比较敏感，会多次触发onScroll，该属性默认为0。

                    style={{backgroundColor: '#ededed'}}
                >

                    <View style={{backgroundColor: '#333944'}}>
                        {example1}
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff'
                    }}>
                        <View style={stylesHome.scrollHeader}>
                            <View
                                style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                            >
                                <Text style={{fontSize: 18}}>正在热映∙</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Areas', {
                                            city_id: this.state.city_info.city_id,
                                            city_name: this.state.city_info.city_name,
                                            callback: (backdata) => {
                                                this.setState({
                                                    city_info: {
                                                        city_id: backdata.city_id,
                                                        city_name: backdata.city_name
                                                    }
                                                })
                                            }
                                        });
                                    }}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        marginLeft: 10
                                    }}
                                >
                                    <Text style={{fontSize: 14, color: '#666'}}>{this.state.city_info.city_name}</Text>
                                    <Ionicons
                                        name={'ios-arrow-down'}
                                        size={16}
                                        style={{color: '#666'}}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Hot', {
                                        tabIndex: 0,
                                    });
                                }}
                                style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                            >
                                <Text>{this.state.locationMoviesLength}部 </Text>
                                <Ionicons
                                    name={'ios-arrow-forward'}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            horizontal={true}
                        >
                            {horizontalScrollItem}
                        </ScrollView>
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 20,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        marginBottom: 40
                    }}>
                        <View style={stylesHome.scrollHeader}>
                            <View
                                style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                            >
                                <Text style={{fontSize: 18}}>即将上映∙</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Hot', {
                                        tabIndex: 1,
                                    });
                                }}
                                style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                            >
                                <Text>{this.state.movieComingNewLength}部 </Text>
                                <Ionicons
                                    name={'ios-arrow-forward'}
                                    size={20}
                                />
                            </TouchableOpacity>

                        </View>
                        <View>
                            {
                                this.state.showMovieLists ? <MovieLists
                                    navigation={this.props.navigation}
                                    getListsData={this.state.movieComingNewLists}
                                /> : <View style={{
                                    height: 20,
                                    justifyContent: 'center',
                                    alignItems: "center",
                                    paddingVertical: 10
                                }}>
                                    <Image style={{height: 20, width: 20}}
                                           source={require('../asset/images/common/loading.gif')}/>
                                </View>
                            }
                        </View>



                    </View>
                </ScrollView>


            </View>

        );
    }
}


function getCityInfo(state) {
    return info = state;
}


export default connect(getCityInfo)(Home)


const stylesHome = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    container: {
        backgroundColor: '#333944'
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
    navBar: {
        height: 0,
        width: width,
        marginTop: Utils.isIphoneX() || Utils.isIphoneXR() ? 34 : 20,
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tag: {
        paddingHorizontal: 5,
        height: 20,
        backgroundColor: '#09A08D',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 37,
        right: 0,
    },
    scrollHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width / 10 * 9,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ededed',
        paddingVertical:10
    }
});
