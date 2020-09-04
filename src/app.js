import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View} from 'react-native';

// redux
import Store from './redux/store';

import pt from './utils/px2dp/Px2dp';

// stack navigator 组件
import StackComponent from './router/stack';

const MainComponent = function () {
    return (
        <Provider store={Store}>
            <StatusBar backgroundColor="#F04531"></StatusBar>
            <NavigationContainer>
                <StackComponent></StackComponent>
            </NavigationContainer>
        </Provider>
    );
};

export default MainComponent;
