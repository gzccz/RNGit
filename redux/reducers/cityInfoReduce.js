import {
    CITY_INFO
} from '../actions/actionTypes';

// 原始默认state
const defaultState = {
    message: 'test',
    cityInfo:{
        city_name: '杭州',
        city_id:'974'
    }
};

export default cityInfoReduce =(state=defaultState, action)=> {
    switch(action.type) {
        case CITY_INFO:
            return {...state, message: '获取成功',cityInfo: action.cityInfo};
        default:
            return state;
    }
}