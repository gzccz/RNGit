import {Dimensions, Platform} from 'react-native';

// iPhoneX Xs
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

// screen
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default {
//判断是否为iphoneX或Xs
    isIphoneX() {
        return (
            Platform.OS === 'ios' &&
            ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||
                (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))
        )
    },

//判断是否为iphoneXR或XsMAX
    isIphoneXR() {
        return (
            Platform.OS === 'ios' &&
            ((SCREEN_HEIGHT === XR_HEIGHT && SCREEN_WIDTH === XR_WIDTH) ||
                (SCREEN_HEIGHT === XR_WIDTH && SCREEN_WIDTH === XR_HEIGHT))
        )
    }
}

