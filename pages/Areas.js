import React, {Component} from 'react'
import {SectionList, Text, View, StyleSheet, Platform, StatusBar, PixelRatio, Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import CitySectionList from './CitySectionList'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import {connect} from "react-redux";
import {cityInfoAction,test} from "../redux/actions/cityInfoAction";

const ITEM_HEIGHT = 50; //item的高度
const HEADER_HEIGHT = 24;  //分组头部的高度
const SEPARATOR_HEIGHT = 0;  //分割线的高度

let {width,height} = Dimensions.get('window');


class Areas extends Component {
    static navigationOptions={
        headerTitle:'选择城市',
        headerBackTitle:'返回'   // 设置返回按钮文案，长度有限制
    }
    async getCityInfos() {
        let data = await require('../asset/city.json');
        let jsonData = data;
        //每组的开头在列表中的位置
        let totalSize = 0;
        //SectionList的数据源
        let cityInfos = [];
        //分组头的数据源
        let citySection = [];
        //分组头在列表中的位置
        let citySectionSize = [];
        for (let i = 0; i < jsonData.length; i++) {
            citySectionSize[i] = totalSize;
            //给右侧的滚动条进行使用的
            citySection[i] = jsonData[i].title;
            let section = {}
            section.key = jsonData[i].title;
            section.data = jsonData[i].data;
            for (let j = 0; j < section.data.length; j++) {
                section.data[j].key = j
            }
            cityInfos[i] = section;
            //每一项的header的index
            totalSize += section.data.length + 1
        }
        this.setState({data: cityInfos, sections: citySection, sectionSize: citySectionSize})
    }


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sections: [],
            sectionSize: []
        }
        this.getCityInfos();
        this.getItemLayout = sectionListGetItemLayout({
            // The height of the row with rowData at the given sectionIndex and rowIndex
            getItemHeight: (rowData, sectionIndex, rowIndex) => sectionIndex === 0 ? 100 : 50,

            // These four properties are optional
            getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
            getSectionHeaderHeight: () => 20, // The height of your section headers
            getSectionFooterHeight: () => 10, // The height of your section footers
            listHeaderHeight: 40, // The height of your list header
        })
    }


    componentWillReceiveProps(){
        console.log(this.props.navigation)
        // this.setState({
        //     city_info:{
        //         city_name:this.props.navigation.getParam('params').city_name,
        //         city_id:this.props.navigation.getParam('params').city_id,
        //     }
        // })
    }
    componentDidMount(){
        console.log(this.props.navigation.state.params.city_id)
    }
    //这边返回的是A,0这样的数据
    _onSectionselect = (section, index) => {
        //跳转到某一项
        this.refs.list.scrollToLocation({itemIndex: 0,sectionIndex: index, viewOffset:0,})

    }

    _getItemLayout(data, index) {
        let [length, separator, header] = [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER_HEIGHT];
        return {length, offset: (length + separator) * index + header, index};
    }
    _getCity_id=(city_id,city_name)=>{
        this.props.navigation.state.params.callback({city_id,city_name});
        this.props.navigation.goBack();
        // this.props.navigation.state.params.callback('返回的数据');
        let { dispatch } = this.props;
        console.log(dispatch)
        console.log(3333333333333+'city_id'+'city_name')
        dispatch(cityInfoAction({city_id,city_name}))
        dispatch(test('这是测试'))
    }

    _renderItem = (item) => {
        return (
            <View style={styles.itemView}>
                {item.item.map((e,i)=>{
                    return (
                        <TouchableOpacity
                            key={i}
                            style={{padding:10}}
                            onPress={
                                () => this._getCity_id(e.city_id,e.name)}
                        >
                            <Text style={{fontSize: 16, color: '#333'}}>
                                {e.name}
                            </Text>
                        </TouchableOpacity>

                    )
                })}
            </View>
        )
    }

    _renderSectionHeader = (section) => {
        return (
            <View style={styles.headerView}>
                <Text style={styles.headerText}>{section.section.key}</Text>
            </View>
        )
    }

    render() {
        if (this.state.data.length > 0) {
            return (
                <View style={{paddingTop: Platform.OS === 'android' ? 0 : 0,height:height}}>
                    <StatusBar  barStyle="dark-content"/>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={{flexDirection:"row",paddingVertical:15}}>
                        <Text style={{marginLeft:20,color:'#999'}}>当前城市</Text>
                        <Text style={{marginLeft:20}}>{this.props.navigation.state.params.city_name}</Text>
                    </TouchableOpacity>
                    <View style={{height:height-100,paddingBottom:40}}>

                        <SectionList
                            ref='list'
                            enableEmptySections
                            renderItem={this._renderItem}
                            renderSectionHeader={this._renderSectionHeader}
                            sections={this.state.data}
                            getItemLayout={this._getItemLayout}
                            refreshing={true}
                    />

                        <CitySectionList
                            sections={ this.state.sections}
                            onSectionSelect={this._onSectionselect}
                        />
                    </View>
                </View>
            )
        } else {
            return <View/>
        }
    }


}



function getCityInfo(state) {
    console.log(748239748239)
    console.log(state)
    return cityInfo = state;
}


export default connect(getCityInfo)(Areas)



const styles = StyleSheet.create({

    headerView: {
        justifyContent: 'center',
        height: HEADER_HEIGHT,
        paddingLeft: 20,
        backgroundColor: '#eee'
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3cb775'
    },
    itemView: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        flexWrap:'wrap',
        width:width,
    }
});