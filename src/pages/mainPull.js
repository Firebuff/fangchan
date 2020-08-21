import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
} from 'react-native';

import {PullView} from 'react-native-pull';

import {getIndex, getToken} from '../api';

import Main from './main'

import SplashScreen from 'react-native-splash-screen'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            showComponent: false,
            resData: {}
        }
        this.onPullRelease = this.onPullRelease.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }

    onPullRelease(resolve) {
      
        getIndex().then((res) => {
            this.setState({
                resData: {},
                showComponent: false
            });
            if (res.status == 1) {
                let newRes = {...res};
                newRes.appswiper.forEach((item) => {
                    item.type = 'picture';
                });
                //console.log(newRes);
                this.setState({
                    resData: newRes,
                    showComponent: true
                });

                resolve();
            }
        });
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData () {
        getIndex().then((res) => {
            if (res.status == 1) {
                let newRes = {...res};
                newRes.appswiper.forEach((item) => {
                    item.type = 'picture';
                });
                //console.log(newRes);
                this.setState({
                    resData: newRes,
                    showComponent: true
                });
                SplashScreen.hide()
            }
        });
        // 获取表单token
        getToken().then((res) => {
            this.props.dispatch(setCSRF(res.csrf_token))
        })
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: 10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling &&
                    this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease &&
                    this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling &&
                    this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease &&
                    this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling &&
                    this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease &&
                    this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 60,
                }}>
                <ActivityIndicator size="small" color="gray" />
                <Text
                    ref={(c) => {
                        this.txtPulling = c;
                    }}>
                    下拉刷新
                </Text>
                <Text
                    ref={(c) => {
                        this.txtPullok = c;
                    }}>
                    松开刷新
                </Text>
                <Text
                    ref={(c) => {
                        this.txtPullrelease = c;
                    }}>
                    玩命刷新中......
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.container]}>
                <PullView
                    style={{width: Dimensions.get('window').width}}
                    onPullRelease={this.onPullRelease}
                    topIndicatorRender={this.topIndicatorRender}
                    topIndicatorHeight={60}
                >  

                    {
                        this.state.showComponent? <Main resData = {this.state.resData} navigation={this.props.navigation}></Main> : null
                    }
                    
                </PullView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
