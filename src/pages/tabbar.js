import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {TransitionPresets} from '@react-navigation/stack';

import {Image, Text} from 'react-native';

//tabbar对应的页面
import MainScreen from './mainPull';
import MemberCenterScreen from './memberCenter';
import RentScreen from './rent';
import HouseScreen from './house';

const Tabbar = createBottomTabNavigator();

const TabbarNavigate = function () {
    return (
        <Tabbar.Navigator
            screenOptions={setIcon}
            tabBarOptions={{
                activeTintColor: 'red',
            }}
        >
            <Tabbar.Screen name="首页" component={MainScreen} />
            <Tabbar.Screen name="新房" component={HouseScreen} />
            <Tabbar.Screen name="MemberCenterScreen" component={MemberCenterScreen} 
                options={{
                    title: '我的'
                }}
            />
        </Tabbar.Navigator>
    );
};

function setIcon({route}) {
    return {
        tabBarIcon: ({focused, color, size}) => {
            let url;
            if (route.name == '首页') {
                url = focused
                    ? require('../static/images/tab/11.png')
                    : require('../static/images/tab/1.png');
            } else if (route.name == '新房') {
                url = focused
                    ? require('../static/images/tab/22.png')
                    : require('../static/images/tab/2.png');
            } else if (route.name == 'MemberCenterScreen') {
                url = focused
                    ? require('../static/images/tab/55.png')
                    : require('../static/images/tab/5.png');
            }
            return <Image height="20" width="20" source={url} />;
        },
    };
}

export default TabbarNavigate;
