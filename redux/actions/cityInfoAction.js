
import {
    CITY_INFO,
    TEST
} from './actionTypes'

export const cityInfoAction=(cityInfo)=> {
    return {
        type: CITY_INFO,
        message: '获取成功',
        cityInfo
    }
}
export const test=(info)=> {
    return {
        type: TEST,
        message: '测试',
        info
    }
}