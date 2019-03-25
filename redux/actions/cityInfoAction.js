
import {
    CITY_INFO,
} from './actionTypes'

export const cityInfoAction=(cityInfo)=> {
    return {
        type: CITY_INFO,
        message: '获取成功',
        cityInfo
    }
}
