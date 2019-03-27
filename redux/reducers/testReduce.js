import {
    TEST
} from '../actions/actionTypes';

// 原始默认state
const defaultState = {
    message: 'test',
    info:'默认测试',
};

export default cityInfoReduce =(state=defaultState, action)=> {
    switch(action.type) {
        case TEST:
            return {...state, message: '测试成功',test: action.info};
        default:
            return state;
    }
}