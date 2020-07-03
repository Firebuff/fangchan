/**
 * @format
 */

import React from 'react'

import {AppRegistry} from 'react-native';

import App from './src/app';

//import App from './containers/redux-example';

import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => App);
