import React, {Component} from 'react';

import {View, Text, Button, Image} from 'react-native';

import Home from '../components/Home';
import HomeDetail from '../components/HomeDetail';
import Setting from '../components/Setting';
import SettingDetail from '../components/SettingDetail';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TransitionPresets} from '@react-navigation/stack';

let Tab = createBottomTabNavigator();

let Stack = createStackNavigator();

let StackSetting = createStackNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeTabs} />
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen name="SettingDetail" component={SettingDetail} />
                <Stack.Screen name="HomeDetail" component={HomeDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
