import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

// redux
import Store from './redux/store'



// stack navigator 组件
import StackComponent from './pages/index';

const MainComponent = function () {
    return (
        <Provider store={Store}>
            <NavigationContainer>
                <StackComponent></StackComponent>
            </NavigationContainer>
        </Provider>
    );
};

export default MainComponent