import React, {Component} from 'react';
import {
    Text,
    View,
    StatusBar, StyleSheet, Dimensions, Button, FlatList, Image, ScrollView
} from 'react-native';

import {connect} from 'react-redux'
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import MovieLists from '../components/MovieLists'
import Test from './My'
import {cityInfoAction} from '../redux/actions/cityInfoAction'

let {width, height} = Dimensions.get('window');

import axios from '../axios/index';
let _tab_index;

export default class Hot extends Component {

    constructor(props) {
        super(props);
        let {state} = this.props.navigation;
        let {params} = state;

        if(state.params){
            _tab_index = state.params.tabIndex
        }else{
            _tab_index = 0
        }
        console.log(_tab_index)
        this.state = {
            getEnd: false,
            testValue: {
                city_name: 'beijing',
                city_id: '111'
            },
            locationMoviesLists:{data:[]},
            movieComingNewLists:{data:[]},
            tabIndex:_tab_index,
        }
    }

    componentWillMount() {
        console.log(_tab_index===0)
        _tab_index===0?this._getLocationMovies():this._getMovieComingNewLists();
    }
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        let index = nextProps.navigation.state.params.tabIndex;
        if(index!=this.state.tabIndex){
            this.setState({
                tabIndex:index
            });
            if(index===0 && this.state.locationMoviesLists.data.length===0){
                this._getLocationMoviesLists()
            }else if(index===1 && this.state.movieComingNewLists.data.length===0){
                this._getMovieComingNewLists()
            }
        }
    }

    _getLocationMovies = () => {
        let arr = [];
        axios.get('https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=974')
            .then((response) => {
                console.log(response)
                response.data.ms.map((item, index) => {
                    arr.push({
                        title: item.t,
                        type: item.movieType,
                        image: item.img.replace(/2.jpg/, '1.jpg'),
                        actor1: item.aN1,
                        actor2: item.aN2
                    })
                });
                this.setState({
                    locationMoviesLists: {
                        data: arr,
                    },
                    showLocation: true
                })

            });
    };
    _getMovieComingNewLists = () => {
        let arr = [];
        axios.get('https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=974')
            .then((response) => {
                response.data.moviecomings.map((item, index) => {
                    arr.push({
                        title: item.title,
                        type: item.type,
                        image: item.image.replace(/2.jpg/,'1.jpg'),
                        actor1: item.actor1,
                        actor2: item.actor2
                    })
                });
                this.setState({
                        movieComingNewLists: {
                        data: arr,
                    },
                    showComingNew: true
                })

            });
    };

    _changeTab=(obj)=>{
        if(obj.i===0 && this.state.locationMoviesLists.data.length===0){
            this._getLocationMovies()
        }else if(obj.i===1 && this.state.movieComingNewLists.data.length===0){
            this._getMovieComingNewLists()
        }
    }
    render() {
        let {dispatch} = this.props;
        let cityInfo = this.props.cityInfo;
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} barStyle="light-content"/>
                <ScrollableTabView
                    style={{marginTop: 20}}
                    initialPage={this.state.tabIndex}
                    renderTabBar={() => <ScrollableTabBar
                        style={{borderWidth: 0, backgroundColor: '#333944'}}

                    />}
                    prerenderingSiblingsNumber={1}
                    tabBarActiveTextColor='#fff'
                    tabBarUnderlineStyle={{backgroundColor: '#fff', height: 2, marginBottom: 2}}
                    tabBarInactiveTextColor="#d2d2d2"
                    onChangeTab={this._changeTab}
                >
                    <View tabLabel='正在热映'>

                        <ScrollView
                            style={{backgroundColor: '#fff', width: width,height:height-118}}
                        >
                            {
                                this.state.showLocation ?
                                    <MovieLists
                                        navigation={this.props.navigation}
                                        getListsData={this.state.locationMoviesLists}
                                    /> :
                                    <View style={{
                                        height: 20,
                                        justifyContent: 'center',
                                        alignItems: "center",
                                        paddingVertical: 10
                                    }}>
                                        <Image style={{height: 20, width: 20}}
                                               source={require('../asset/images/common/loading.gif')}/>
                                    </View>
                            }
                        </ScrollView>

                    </View>
                    <View tabLabel='即将上映'>
                        <ScrollView
                            style={{backgroundColor: '#fff', width: width,height:height-118}}
                        >
                            {
                                this.state.showComingNew ?
                                    <MovieLists
                                        navigation={this.props.navigation}
                                        getListsData={this.state.movieComingNewLists}
                                    /> :
                                    <View style={{
                                        height: 20,
                                        justifyContent: 'center',
                                        alignItems: "center",
                                        paddingVertical: 10
                                    }}>
                                        <Image style={{height: 20, width: 20}}
                                               source={require('../asset/images/common/loading.gif')}/>
                                    </View>
                            }
                        </ScrollView>

                    </View>
                </ScrollableTabView>
            </View>)

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333944',
    },
});