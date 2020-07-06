import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

//tabbar对应的页面
import MainScreen from './main';
import SaleScreen from './sale';
import RentScreen from './rent';
import HouseScreen from './house';


// 引进tabbar
import TabbarNavigate from './tabbar';



// 根据tabbar 的激活状态，动态改变导航标题
function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '首页';
    switch (routeName) {
        case '首页':
            return '首页';
        case '新房':
            return '新房';
        case '二手房':
            return '二手房';
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
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    flexDirection: 'row',
                    alignSelf: 'center',
                },
            }}
        >
            <Stack.Screen
                name="首页"
                component={TabbarNavigate}
                options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                })}
            />
            <Stack.Screen name="新房" component={HouseScreen} />
            <Stack.Screen name="二手房" component={SaleScreen} />
        </Stack.Navigator>
    );
};

export default StackComponent;
