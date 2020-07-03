import * as React from 'react';
import {View, Button, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// redux

import {connect} from 'react-redux';

import {plusTotal, minusTotal, asyncPlus} from '../redux/actions';




import {getFocusedRouteNameFromRoute } from '@react-navigation/native';

import {TransitionPresets} from '@react-navigation/stack';


// 图标的使用
import Icon from 'react-native-vector-icons/AntDesign';

import Icons from '../android/app/src/main/assets/iconmoon';

import SvgUri from 'react-native-svg-uri';

// 获取svg
import getSvg from '../svg'




// console.log(Icon)

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

    switch (routeName) {
        case 'Feed':
            return 'News feed';
        case 'Profile':
            return 'My profile';
        case 'Account':
            return 'My account';
        case 'AcountDetail':
            return 'haha';
    }
}

const FeedScreen = function (props) {
    console.log(props);
    const navigation = props.navigation;
    let {minusTotal, plusTotal, asyncPlus} = props;
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
            <View style={{marginTop: 10, fontSize: 20, flexDirection: 'row'}}>
                <Button
                    title="加"
                    onPress={() => {
                        asyncPlus(10)
                    }}></Button>

                <Text
                    style={{
                        marginTop: 10,
                        fontSize: 20,
                        alignItems: 'center',
                        lineHeight: 20,
                        marginLeft: 10,
                        marginRight: 10,
                    }}>
                    {props.product.total}
                </Text>

                <Button
                    title="减"
                    onPress={() => {
                        minusTotal(6);
                    }}></Button>
            </View>
        </View>
    );
};

const FeedScreenConnect = connect((state) => ({...state}), {
    minusTotal,
    plusTotal,
    asyncPlus
})(FeedScreen);

function ProfileScreen() {
    return <View />;
}

function AccountScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View>
                <Button
                    onPress={() => {
                        navigation.navigate('AccountDetail');
                    }}
                    title="去详情页"
                />
            </View>
        </View>
    );
}

function AccountDetailScreen() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Text>Acount detail</Text>
            <Icon name="forward" size={40} color="red" />
            <Icon name="upcircle" size={40} color="red" />
            <Icons name="iconbodadianhua" size={20} color="blue" />
            <Icons name="iconda" size={20} color="blue" />
            <Icons name="icondianhua" size={40} color="red"/>
            <Icons name="icondiscount" size={40} color="blue"/>
            <Icons name="iconfangchanwenda" size={40} color="blue"/>
            <Icons name="iconjiazaizhong" size={40} color="blue"/>
            <Icons name="iconjubao" size={40} color="blue"/>
            <Icons name="iconkaipan" size={40} color="blue"/>
            <Icons name="iconyizan" size={40} color="green"/>
            <Icons name="iconzhifubaozhifu" size={40} color="blue"/>
            <View >
                
                {<SvgUri width="20" height="20" svgXmlData={getSvg('iconbiaoqing')} />}
                {<SvgUri width="20" height="20" svgXmlData={getSvg('iconchuang')} fill="pink" />}
                {<SvgUri width="50" height="50" svgXmlData={getSvg('iconda')}  />}
                {<SvgUri width="50" height="50" svgXmlData={getSvg('iconweizhizhaofang')}  />}
                {<SvgUri width="50" height="50" svgXmlData={getSvg('iconweixinzhifu')}  />}
                {<SvgUri width="50" height="50" svgXmlData={getSvg('iconzhaojingjiren')}  />}
             </View>
        </View>
    );
}

function SettingsScreen(props) {
    console.log(props)
    return (
        <View>
            <Text>{props.product.total}</Text>
        </View>
    )
}


let SettingsScreenConnect = connect(state=>({...state}))(SettingsScreen)

const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Feed" component={FeedScreenConnect} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

export default function App() {
    return (
        <Stack.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen
                name="Home"
                component={HomeTabs}
                options={({route}) => ({
                    headerTitle: getHeaderTitle(route),
                })}
            />
            <Stack.Screen name="Settings" component={SettingsScreenConnect} />
            <Stack.Screen
                name="AccountDetail"
                component={AccountDetailScreen}
            />
        </Stack.Navigator>
    );
}
