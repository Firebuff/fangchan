import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import pt from '../utils/px2dp/Px2dp';

//tabbar对应的页面
//import MainScreen from './main';
import MainScreen from '../pages/mainPull';
import RentScreen from '../pages/rent';
import HouseScreen from '../pages/house';
import HouseDetailScreen from '../pages/houseDetail';
import NewsDetailScreen from '../pages/newsDetail';
import PhoneLoginScreen from '../pages/phoneLogin';
import CountLoginScreen from '../pages/countLogin';
import WalletScreen from '../pages/wallet';
import PaymentScreen from '../pages/payment';
import ShareScreen from '../pages/share';

// 引进tabbar
import TabbarNavigate from './tabbar';

// 根据tabbar 的激活状态，动态改变导航标题
function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '首页';
    switch (routeName) {
        case '首页':
            //headerShown 隐藏顶部导航栏
            return ({headerShown:false})
        case '新房':
            return '新房资源';
        case 'MemberCenterScreen':
            return '个人中心';
    }
}

// 创建 stack navigator
const Stack = createStackNavigator();

const StackComponent = function () {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f04531',
                    borderBottomWidth: 0,
                    elevation: 0,
                },
                headerTintColor: '#fff',

                //标题样式
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: pt(18),
                },
                //标题居中
                headerTitleAlign: 'center',
                //页面左右切换动画
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen
                name="首页"
                component={TabbarNavigate}
                options={({route}) => (getHeaderTitle(route))}
            />
            <Stack.Screen
                name="HouseDetailScreen"
                component={HouseDetailScreen}
                //设置标题
                options={{
                    title: '新房详情',
                }}
            />
            <Stack.Screen
                name="NewsDetailScreen"
                component={NewsDetailScreen}
                //设置标题
                options={{
                    title: '资讯详情',
                }}
            />
            <Stack.Screen
                name="PhoneLoginScreen"
                component={PhoneLoginScreen}
                //设置标题
                options={{
                    title: '手机登录',
                }}
            />
            <Stack.Screen
                name="CountLoginScreen"
                component={CountLoginScreen}
                //设置标题
                options={{
                    title: '账号登录',
                }}
            />
            <Stack.Screen
                name="WalletScreen"
                component={WalletScreen}
                //设置标题
                options={{
                    title: '我的钱包',
                }}
            />
            <Stack.Screen
                name="PaymentScreen"
                component={PaymentScreen}
                //设置标题
                options={{
                    title: '充值余额',
                }}
            />
            <Stack.Screen
                name="ShareScreen"
                component={ShareScreen}
                //设置标题
                options={{
                    title: '分享',
                }}
            />
        </Stack.Navigator>
    );
};

export default StackComponent;
