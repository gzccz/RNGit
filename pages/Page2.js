import React, {Component} from 'react';
import {
    Text,
    View,
    StatusBar, StyleSheet, Dimensions,Button
} from 'react-native';

import {connect} from 'react-redux'
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import MovieLists from '../components/MovieLists'
import {cityInfoAction} from '../redux/actions/cityInfoAction'

let {width, height} = Dimensions.get('window');

import axios from '../axios/index';

class Page2 extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            taskList: [
                {
                    title: "西游伏妖篇",
                    subtitle: "奇幻 / 动作 / 喜剧",
                    illustration: "http://img5.mtime.cn/mt/2017/01/27/114649.37790398_1280X720X2.jpg",
                    ratingFinal: "6.7",
                    commonSpecial: '唐僧\"重色轻友\"与悟空反目',
                    actorName1: '吴亦凡',
                    actorName2: '林更新'
                },
                {
                    title: "西游伏妖篇",
                    subtitle: "奇幻",
                    illustration: "http://img5.mtime.cn/mt/2017/01/27/114649.37790398_1280X720X2.jpg",
                    ratingFinal: "6.7",
                    commonSpecial: '唐僧\"重色轻友\"与悟空反目',
                    actorName1: '吴亦凡',
                    actorName2: '林更新'
                },
                {
                    title: "西游伏妖篇",
                    subtitle: "奇幻",
                    illustration: "http://img5.mtime.cn/mt/2017/01/27/114649.37790398_1280X720X2.jpg",
                    ratingFinal: "6.7",
                    commonSpecial: '唐僧\"重色轻友\"与悟空反目',
                    actorName1: '吴亦凡',
                    actorName2: '林更新'
                },
                {
                    title: "西游伏妖篇",
                    subtitle: "奇幻",
                    illustration: "http://img5.mtime.cn/mt/2017/01/27/114649.37790398_1280X720X2.jpg",
                    ratingFinal: "6.7",
                    commonSpecial: '唐僧\"重色轻友\"与悟空反目',
                    actorName1: '吴亦凡',
                    actorName2: '林更新'
                }
            ],
            getEnd: false,
            testValue:{
                city_name:'beijing',
                city_id:'111'
            },
        }
    }

    componentWillMount(){
        axios.get('https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=974')
                .then((response) => {
                    // response.data.movies
                    // response.data.movies.map()
                    let newArr =[]
                    console.log(response.data.movies)
                    response.data.movies.map((item,index)=>{
                        if(index<5){
                            newArr.push(item['img'])
                        }
                    })

                    this.setState({
                        swiperItems:newArr
                    });

        })
    }
    componentWillReceiveProps(){

    }
    render() {
        let { dispatch } = this.props;
        let cityInfo = this.props.cityInfo;
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} barStyle="light-content"/>
                <Button title="Add Todo" onPress={() => dispatch(cityInfoAction(this.state.testValue))}/>



                <ScrollableTabView
                    style={{marginTop: 20,}}
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar
                        style={{borderWidth: 0, backgroundColor: '#333944'}}

                    />}
                    tabBarActiveTextColor='#fff'
                    tabBarUnderlineStyle={{backgroundColor: '#fff', height: 2, marginBottom: 2}}
                    tabBarInactiveTextColor="#d2d2d2"
                >
                    <View tabLabel='正在热映'>
                        <View
                            style={{backgroundColor: '#fff', width: width, height: height}}
                        >
                            <MovieLists
                                _getListsData = {this.state.taskList}
                            />
                        </View>
                    </View>
                    <View tabLabel='正在热映'>
                        <View><Text>11</Text></View>
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



function getCityInfo(state) {
    return cityInfo = state.CityInfo;
}


export default connect(getCityInfo)(Page2)
