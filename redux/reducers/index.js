// RootReducer中存放的是各个页面的Reducer，推荐的做法是
// 一个页面公用一个Reducer，便于之后的管理
// Reducer是纯函数，里面不应该有过多的逻辑
import {combineReducers} from 'redux';
import CityInfo from './cityInfoReduce';

// 取决于这里加入了多少 reducer
const RootReducer = combineReducers({
    CityInfo
});

export default RootReducer;
