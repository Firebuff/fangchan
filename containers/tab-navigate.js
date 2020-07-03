import React, { Component } from 'react'

import { View, Text, Button, Image } from 'react-native'

import Home from '../components/Home'
import HomeDetail from '../components/HomeDetail'
import Setting from '../components/Setting'
import SettingDetail from '../components/SettingDetail'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TransitionPresets } from '@react-navigation/stack';



let HomeStack = createStackNavigator()

let SettingStack = createStackNavigator()

const HomeStackScreen = function() {
    return ( <
        HomeStack.Navigator screenOptions = {
            {
                ...TransitionPresets.SlideFromRightIOS
            }
        } >
        <
        HomeStack.Screen name = "Home"
        component = { Home }
        /> <
        HomeStack.Screen name = "HomeDetail"
        component = { HomeDetail }
        /> <
        /HomeStack.Navigator>

    )
}
const SettingStackScreen = function() {
    return ( <
        SettingStack.Navigator >
        <
        SettingStack.Screen name = "Setting"
        component = { Setting }
        /> <
        SettingStack.Screen name = "SettingDetail"
        component = { SettingDetail }
        /> <
        /SettingStack.Navigator>

    )
}


const Tab = createBottomTabNavigator();


const App = function() {
    return ( <
        NavigationContainer >
        <
        Tab.Navigator tabBarOptions = {
            {
                activeTintColor: 'red',
                inactiveTintColor: '#000',
                labelStyle: {
                    fontSize: 14,
                },
            }
        }
        screenOptions = {
            ({ route }) => {
                return {
                    tabBarIcon: ({ focused, color, size }) => {
                        let tabIcon

                        if (route.name == 'Home') {
                            tabIcon = focused ? require('../images/11.png') : require('../images/1.png')
                        } else if (route.name == 'Setting') {
                            tabIcon = focused ? require('../images/44.png') : require('../images/4.png')
                        }
                        console.log(focused, color, size)
                        return ( <
                            Image height = { size }
                            width = { size }
                            source = { tabIcon }
                            />
                        )
                    },
                    ...TransitionPresets.SlideFromRightIOS
                }
            }
        } >
        <
        Tab.Screen name = "Home"
        component = { HomeStackScreen }
        options = {
            (props) => {

                let index = props.route && props.route.state && props.route.state.index

                let isShowTab = index > 0 ? false : true

                console.log(props)
                return {
                    tabBarVisible: isShowTab
                }
            }
        }
        /> <
        Tab.Screen name = "Setting"
        component = { SettingStackScreen }
        /> <
        /Tab.Navigator> <
        /NavigationContainer>
    )
}

export default App