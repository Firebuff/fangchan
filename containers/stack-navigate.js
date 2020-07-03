import React, { Component } from 'react'

import Home from '../components/Home'
import HomeDetail from '../components/HomeDetail'
import Setting from '../components/Setting'
import SettingDetail from '../components/SettingDetail'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


let Stack = createStackNavigator()


const App = function () {
    return (
       <NavigationContainer>
           <Stack.Navigator>
               <Stack.Screen name="Home" component={Home}/>
               <Stack.Screen name="HomeDetail" component={HomeDetail}/>
           </Stack.Navigator>
       </NavigationContainer>
    )
}

export default App