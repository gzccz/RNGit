import React from 'react'
import {
    createStackNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createDrawerNavigator,
    DrawerItems,
    createSwitchNavigator
} from 'react-navigation'
import {Button, Platform, ScrollView, SafeAreaView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import HomePage from '../pages/HomePage'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'
import Page4 from '../pages/Page4'
import Page5 from '../pages/Page5'
import Page6 from '../pages/Page6'
import Login from '../pages/Login'
import Areas from '../pages/Areas'

const DrawerNav = createDrawerNavigator({
        Page4: {
            screen: Page4,
            navigationOptions: {
                drawerLabel: 'Page4',
                drawerIcon: ({tintColor}) => {
                    return <MaterialIcons
                        name={'drafts'}
                        size={24}
                        style={{color: tintColor}}
                    />
                }
            }
        },
        Page5: {
            screen: Page5,
            navigationOptions: {
                drawerLabel: 'Page5',
                drawerIcon: ({tintColor}) => {
                    return <MaterialIcons
                        name={'move-to-inbox'}
                        size={24}
                        style={{color: tintColor}}
                    />
                }
            }
        }
    }, {
        initialRouteName: 'Page4',
        contentOptions: {
            activeOptions: {
                activeTintColor: '#e91e63'
            }
        },
        contentComponent: (props) => {
            return (
                <ScrollView
                    style={{backgroundColor: '678', flex: 1}}
                >
                    <SafeAreaView
                        forceInset={{top: 'always', horizontal: 'never'}}
                    >
                        <DrawerItems
                            {...props}
                        ></DrawerItems>
                    </SafeAreaView>
                </ScrollView>
            )
        }
    }
)

const AppTopNavigator = createMaterialTopTabNavigator({
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: 'All'
            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                tabBarLabel: 'IOS'
            }
        },
        Page3: {
            screen: Page3,
            navigationOptions: {
                tabBarLabel: 'React'
            }
        },
        Page4: {
            screen: Page4,
            navigationOptions: {
                tabBarLabel: 'ReactNative'
            }
        },
        Page5: {
            screen: Page5,
            navigationOptions: {
                tabBarLabel: 'Vue'
            }
        }
    }, {
        tabBarOptions: {
            tabStyle: {minWidth: 50},
            upperCaseLabel: false, // 是否使标签大写，默认为true
            scrollEnabled: true, // 是否支持 选项卡滚动，默认为false
            style: {
                backgroundColor: '#678'
            },
            indicatorStyle: {     // 标签显示器
                height: 2,
                backgroundColor: '#fff'
            },
            labelStyle: {         // 文字的样式
                fontSize: 14,
                marginTop: 6,
                marginBottom: 6,
            }
        }
    }
)

let homePageTitle;

const AppBottomNavigator = createBottomTabNavigator({
    Page1: {
        screen: Page1,
        navigationOptions: {
            showLabel: false,
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-home'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            // tabBarOnPress: (navigation) => { // 使用tabBarOnPress点击事件
            //     // navigation.navigation.state.params = '最热'
            //     homePageTitle = '最热'
            //     // console.log(navigation.navigation.getParam.name)
            //     navigation.navigation.navigate('Page1')
            // }

        }
    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-people'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            tabBarOnPress: (navigation) => { // 使用tabBarOnPress点击事件
                // navigation.navigation.state.params = '趋势';
                homePageTitle = '趋势';
                // console.log(navigation.navigation.getParam.name)
                navigation.navigation.navigate('Page2')
            }
        },
    },
    Page3: {
        screen: Page3,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-chatboxes'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            tabBarOnPress: (navigation) => { // 使用tabBarOnPress点击事件
                // navigation.navigation.state.params = '收藏';
                homePageTitle = '收藏';
                // console.log(navigation.navigation.getParam.name)
                navigation.navigation.navigate('Page3')
            },
        }
    },
    Page4: {
        screen: Page4,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-aperture'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            tabBarOnPress: (navigation) => { // 使用tabBarOnPress点击事件
                // navigation.navigation.state.params = '我的';
                homePageTitle = '我的';
                // console.log(navigation.navigation.getParam.name)
                navigation.navigation.navigate('Page4')
            }
        }
    },
}, {
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#e93d12'
    },
});
const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const {scene} = sceneProps;
        const {route} = scene;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        return CardStackStyleInterpolator[transition](sceneProps);
    },
});

const AppStackNavigator = createStackNavigator({
        HomePage: {
            screen: AppBottomNavigator,
            // navigationOptions: (props) => {    // 可修改title
            //     const {navigation} = props;
            //     const {state, setParams} = navigation;
            //     const {routes} = state;
            //     console.log(props)
            //     return {
            //         // title: routes[state.index].params ? routes[state.index].params : '最热',
            //         // title: homePageTitle ? homePageTitle : '最热',
            //         // headerBackTitle:'返回'
            //     }
            //
            // }
            navigationOptions: {   // 在这里定义每个页面的导航数据   静态配置
                header:null
            }
        },
        // Page2: {
        //     screen: Page2,
        //     navigationOptions: ({navigation}) => ({
        //         title: `页面名`     // 动态配置
        //     }),
        // },
        Page5: {
            screen: Page5,
            // navigationOptions: {   // 在这里定义每个页面的导航数据   静态配置
            //     // title: 'this is page5'
            // }
        },
        Page6: {
            screen: Page6,
            // navigationOptions: {   // 在这里定义每个页面的导航数据   静态配置
            //     // title: 'this is page5'
            // }
        },
        Areas: {
        screen: Areas,
        // navigationOptions: {   // 在这里定义每个页面的导航数据   静态配置
        //     // title: 'this is page5'
        // }
    },
        // Page3: {
        //     screen: Page3,
        //     navigationOptions: (props) => {    // 可修改title
        //         const {navigation} = props;
        //         const {state, setParams} = navigation;
        //         const {params} = state;
        //         return {
        //             title: params.title ? params.title : 'this is page3',
        //             headerRight: (
        //                 <Button
        //                     title={params.mode === 'edit' ? '保存' : '编辑'}
        //                     onPress={() => setParams({mode: params.mode === 'edit' ? '' : 'edit'})}
        //                 />
        //             )
        //         }
        //     }
        // },
        // Page4: {
        //     screen: Page4,
        //     // navigationOptions:{
        //     //     title:'this is page4'
        //     // },
        //     navigationOptions: ({navigation}) => ({
        //         title: `${navigation.state.params.name}`     // 动态配置
        //     }),
        // },
        Bottom: {
            screen: AppBottomNavigator,
            navigationOptions: {
                title: 'BottomNavigator'
            }
        },
        Top: {
            screen: AppTopNavigator,
            navigationOptions: {
                title: 'TopNavigator'
            }
        },
        DrawerNav: {
            screen: DrawerNav,
            navigationOptions: {
                title: 'DrawerNavigator'
            }
        }
    }, {
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        }),
        defaultNavigationOptions: {
            headerBackTitle: '返回'
        }
    }
);

const AppStack = createStackNavigator({
    Home: {
        screen: AppStackNavigator,
        navigationOptions: {
            // header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
            // title:'112222'
        }
    },
    // Page1: {
    //     screen: Page1
    // },
    // Page2: {
    //     screen: Page2,
    //     navigationOptions: {   // 在这里定义每个页面的导航数据   静态配置
    //         title: 'this is page2'
    //     }
    // },
    initialRouteName: 'Home'
});
const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        }
    },
}, {});

export default createSwitchNavigator(
    {
        Auth: AuthStack,
        App: AppStackNavigator,
    },
    {
        initialRouteName: 'Auth',
    }
);

