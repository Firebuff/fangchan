import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Alert }  from 'react-native';

import CodePush from 'react-native-code-push'; // 引入code-push

import pt from '../utils/px2dp/Px2dp';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    updateHandle() {
        CodePush.checkForUpdate('FiUtn39ZeX8EY1Z31tp-YLXTqAR_r4YjL3zKA').then((update) => {
            console.log(update)
            if (!update) {
                Alert.alert('提示', '已是最新版本--', [
                    {
                        text: 'Ok',
                        onPress: () => {
                            console.log('点了OK');
                        },
                    },
                ]);
            } else {
                CodePush.sync({
                        deploymentKey: 'FiUtn39ZeX8EY1Z31tp-YLXTqAR_r4YjL3zKA',
                        updateDialog: {
                            optionalIgnoreButtonLabel: '稍后',
                            optionalInstallButtonLabel: '立即更新',
                            optionalUpdateMessage: '有新版本了，是否更新？',
                            title: '更新提示',
                        },
                        installMode: CodePush.InstallMode.IMMEDIATE,
                    },
                    (status) => {
                        switch (status) {
                            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                                console.log('DOWNLOADING_PACKAGE');
                                break;
                            case CodePush.SyncStatus.INSTALLING_UPDATE:
                                console.log(' INSTALLING_UPDATE');
                                break;
                        }
                    },
                    (progress) => {
                        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
                    },
                );
            }
        });
    }

    render() {
        return (
            <View
                style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                
                <View>
                    <Text>百年糊涂</Text>
                </View>
                <TouchableOpacity
                    style={[styles.btnWrapper, {marginTop: pt(20)}]}
                    onPress={() => {
                        this.updateHandle()
                    }}>
                    <Text style={styles.btnText}>检查更新</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default App;

const styles = StyleSheet.create({
    btnText: {
        lineHeight: pt(48),
        height: pt(48),
        alignSelf: 'center',
        color: '#fff',
        fontSize: pt(18),
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: pt(200),
        height: pt(48),
        backgroundColor: '#F04531',
        borderRadius: pt(4),
    },
});
