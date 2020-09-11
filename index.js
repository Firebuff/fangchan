/**
 * @format
 */

import React from 'react'

import {AppRegistry} from 'react-native';


import App from './src/app';
// import App from './test';


//import App from './containers/redux-example';
import {name as appName} from './app.json';


import CodePush from 'react-native-code-push'; // 引入code-push


let codePushOptions = {
    //设置检查更新的频率
    //ON_APP_RESUME APP恢复到前台的时候
    //ON_APP_START APP开启的时候
    //MANUAL 手动检查
    checkFrequency: CodePush.CheckFrequency.MANUAL,
};


// 这一行必须要写
CodePushApp = CodePush(codePushOptions)(App);




AppRegistry.registerComponent(appName, () => CodePushApp);
