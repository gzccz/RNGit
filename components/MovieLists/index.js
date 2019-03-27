import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, FlatList, Dimensions, Image,TouchableOpacity} from 'react-native';


let {width, height} = Dimensions.get('window');

export default class MovieLists extends Component {

    constructor(props) {
        super(props);
        let data = this.props.getListsData
        this.state = {
            getEnd: false,
            listData:data,
        }
    }

    _listFooterComponent = () => {
        return (
            <View style={{height: 40, justifyContent: 'center', alignItems: "center",paddingVertical:10,width:width}}>
                {
                    this.state.getEnd?<Text>已加载完毕</Text>:<Image style={{height: 20, width: 20}}
                                                                   source={require('../../asset/images/common/loading.gif')}/>
                }
            </View>
        );
    }
    _keyExtractor = (item, index) => "index" + index + item;

    _renderItem = ({item, index}) => {
        const {navigation:navigation} = this.props;
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('MovieDetail', {
                        movie_id: item.movie_id,
                        callback: (backdata) => {
                        }
                    });
                }}
                style={{ justifyContent: 'center',alignItems:'center'}}
            >
                <View style={{
                    width: width / 10 * 9,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingVertical: 20,
                    borderStyle: 'solid',
                    borderBottomWidth: 1,
                    borderColor: '#ededed'
                }}
                      key={index}
                >
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start',
                        width: 220,
                    }}>
                        <Text numberOfLines={2} style={{fontSize: 22}}>{item.title}</Text>
                        <View style={{flexDirection: 'row'}}><Text
                            style={{marginRight: 10, color: '#999'}}>标签: </Text><Text>{item.type}</Text></View>
                        <View style={{flexDirection: 'row'}}><Text style={{
                            marginRight: 10,
                            color: '#999'
                        }}>领衔主演: </Text>
                            <View>
                                <Text>{item.actor1} </Text><Text>{item.actor2}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Image
                            style={{width: 100 * 2 / 2.2, height: 142 * 2 / 2.2}}
                            source={{uri: item.image}}
                        />
                    </View>
                </View>
            </TouchableOpacity>

        );
    };

    _reached = ()=>{
        if(this.refs.list.props.data.length>=this.state.listData.data.length){
            this.setState({
                getEnd:true
            })
        }
    }

    render() {
        return (
            <View>
                <FlatList
                    ref={'list'}
                    data={this.props.getListsData.data}//获取列表数据源
                    renderItem={this._renderItem.bind(this)}//渲染列表
                    onEndReachedThreshold={1}
                    keyExtractor={this._keyExtractor}
                    onEndReached={this._reached}
                    ListFooterComponent={this._listFooterComponent}
                    style={{flex: 1, arguments: 'center'}}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 50,
        borderWidth: 2,
        borderColor: '#FFC780',
        width: 200
    }
});
