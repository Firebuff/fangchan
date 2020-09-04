import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    TextInput,
    Button,
} from 'react-native';

import pt from '../utils/px2dp/Px2dp';

import LineText from '../components/line-text';

import Svg from '../components/svg';

import {CheckBox} from 'react-native-elements';

import {getUserInfo, loginByCount} from '../api';

import {setUserInfo, setCSRF, setLogin} from '../redux/actions';

import {connect} from 'react-redux';

import Spinkiter from 'react-native-spinkit';

import Toast, {DURATION} from 'react-native-easy-toast';

class CountLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            userName: '',
            passWord: '',
            buttonActive: false,
            loading: false,
        };
    }
    // input事件
    inputHandle(res, key) {
        this.setState(
            {
                [key]: res,
            },
            () => {
                if (this.state.userName && this.state.passWord) {
                    this.setState({buttonActive: true});
                    return;
                }
                this.setState({buttonActive: false});
            },
        );
    }
    //提示
    alertHandle(tips) {
        Alert.alert('', tips, [
            {
                text: '确定',
                onPress: () => {},
                style: {
                    color: 'red',
                },
            },
        ]);
    }
    // 表单验证
    checkHandle() {
        if (this.state.userName && this.state.passWord && this.state.checked)
            return true;
        if (!this.state.userName) {
            this.alertHandle('请输入登录账号');
            return false;
        }
        if (!this.state.passWord) {
            this.alertHandle('请输入登录密码');
            return false;
        }
        if (!this.state.checked) {
            this.alertHandle('请阅读并同意协议');
            return false;
        }
    }
    // 登录
    loginHandle() {
        if (!this.checkHandle()) return;
        let params = {
            userName: this.state.userName,
            passWord: this.state.passWord,
        };
        console.log(params);

        this.setState({loading: true});

        loginByCount(params)
            .then((res) => {
                this.setState({loading: false});
                console.log(res);
                if (res.status == 1) {
                    getUserInfo().then((userRes) => {
                        this.setState({loading: false});
                        if (userRes.status == 1) {
                            this.props.dispatch(setUserInfo(userRes));
                            this.props.dispatch(setCSRF(userRes.csrf_token));
                            this.props.dispatch(setLogin(true));
                            console.log(this.props);
                            //跳转到会员中心
                            this.props.navigation.navigate(
                                'MemberCenterScreen',
                            );
                        } else {
                            this.alertHandle('获取用户信息失败');
                        }
                    });
                } else {
                    this.alertHandle(res.info);
                }
            })
            .catch((err) => {
                this.alertHandleo(err);
                this.setState({loading: false});
            });

        //loginByPhone(params).then((res) => {
        //    //console.log(res)
        //    if (res.status == 1) {
        //        this.alertHandle(res.info)
        //        getUserInfo().then(userRes => {
        //            //console.log(userRes)
        //            if (userRes.status == 1) {
        //                this.props.dispatch(setUserInfo(userRes))
        //                this.props.dispatch(setCSRF(userRes.csrf_token))
        //                this.props.dispatch(setLogin(true))
        //                //跳转到会员中心
        //                this.props.navigation.navigate('MemberCenterScreen')
        //            }
        //        })
        //    } else {
        //        this.alertHandle(res.info)
        //    }
        //})
    }

    componentDidMount() {}

    sendMessage() {
        if (!this.state.phone) {
            this.alertHandle('手机号码不能为空');
            return;
        }
        getMessageType({tpl: 'login'})
            .then((tplRes) => {
                if (tplRes.status == 1) {
                    let params = {
                        tel: this.state.phone,
                        tpl: tplRes.tpl,
                        id: 'smscode',
                        checked: 1,
                    };
                    getMessageCode(params)
                        .then((loginRes) => {
                            if (loginRes.status == 1) {
                                this.alertHandle(loginRes.info);
                            } else {
                                this.alertHandle('获取验证码失败');
                            }
                        })
                        .catch((err) => {
                            this.alertHandle('获取验证码失败');
                        });
                } else {
                    this.alertHandle('获取验证码失败');
                }
            })
            .catch((err) => {
                this.alertHandle('获取验证码失败');
            });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        console.log(global)
        return (
            <View style={styles.wrapper}>
                {/*<Toast
                    ref="toast"
                    style={{backgroundColor:'#000'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'#fff'}}
                />*/}
                <TextInput
                    style={styles.input}
                    placeholder={'请输入您的账号'}
                    placeholderTextColor={'#CCCCCC'}
                    onChangeText={(res) => {
                        this.inputHandle(res, 'userName');
                    }}></TextInput>
                <View>
                    <TextInput
                        style={[styles.input, styles.codeInput]}
                        placeholder={'请输入登录密码'}
                        placeholderTextColor={'#CCCCCC'}
                        onChangeText={(res) => {
                            this.inputHandle(res, 'passWord');
                        }}></TextInput>
                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                this.state.buttonActive && this.state.checked
                                    ? '#F04531'
                                    : '#F7A197',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        },
                    ]}
                    activeOpacity={0.2}
                    onPress={() => {
                        this.loginHandle();
                    }}>
                    {this.state.loading ? (
                        <Spinkiter
                            type={'FadingCircleAlt'}
                            color={'#fff'}
                            size={pt(20)}
                            style={{alignSelf: 'center', marginRight: pt(10)}}
                        />
                    ) : null}

                    <Text style={styles.buttonText}>
                        {this.state.loading ? '正在登录...' : '立即登录'}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: pt(15),
                    }}>
                    <CheckBox
                        center={true}
                        title="我已阅读并同意"
                        textStyle={{
                            color: '#CCCCCC',
                            padding: 0,
                            margin: 0,
                            fontSize: pt(12),
                            fontWeight: '400',
                        }}
                        checked={this.state.checked}
                        size={pt(16)}
                        checked={this.state.checked}
                        checkedColor={'#F04531'}
                        containerStyle={{
                            backgroundColor: '#fff',
                            borderWidth: 0,
                            padding: 0,
                            margin: 0,
                        }}
                        onPress={() => {
                            this.setState({
                                checked: !this.state.checked,
                            });
                        }}
                    />
                    <Text style={styles.contract}>《用户访问协议》</Text>
                </View>
                <View style={styles.lineField}>
                    <View style={styles.lineWrapper}>
                        <Text style={styles.line}></Text>
                    </View>

                    <Text style={styles.LineText}>更多登录方式</Text>
                    <View style={styles.lineWrapper}>
                        <Text style={styles.line}></Text>
                    </View>
                </View>
                <View style={styles.loginField}>
                    <View style={styles.loginItem}>
                        <TouchableOpacity
                            onPress={ () => {
                                this.props.navigation.navigate('PhoneLoginScreen')
                            }}
                        >
                            <Svg
                                name="iconbodadianhua"
                                height={pt(20)}
                                width={pt(20)}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingRight: pt(15),
        paddingLeft: pt(15),
        backgroundColor: '#fff',
        height: '100%',
        paddingTop: pt(15),
    },
    input: {
        height: pt(48),
        borderColor: 'rgba(249,249,249,1)',
        borderWidth: pt(1),
        paddingLeft: pt(15),
        marginBottom: pt(15),
        fontSize: pt(14),
    },
    codeInput: {
        paddingRight: pt(100),
    },
    button: {
        height: pt(48),
        lineHeight: pt(48),
        backgroundColor: '#F7A197',
        borderRadius: pt(4),
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        lineHeight: pt(48),
        fontSize: pt(18),
    },
    codeBtn: {
        paddingLeft: pt(10),
        borderColor: '#F9F9F9',
        borderLeftWidth: pt(1),
        position: 'absolute',
        lineHeight: pt(48),
        right: pt(15),
        top: pt(16),
    },
    contract: {
        alignSelf: 'center',
        fontSize: pt(12),
        color: '#F04531',
    },
    lineWrapper: {
        flex: 1,
        height: pt(20),
        justifyContent: 'center',
    },
    line: {
        borderBottomColor: '#F7A197',
        borderBottomWidth: pt(1),
        borderStyle: 'dotted',
        height: pt(1),
    },
    LineText: {
        lineHeight: pt(20),
        height: pt(20),
        fontSize: pt(12),
        alignItems: 'center',
        color: '#CCCCCC',
        paddingLeft: pt(10),
        paddingRight: pt(10),
    },
    lineField: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: pt(50),
    },
    loginItem: {
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        padding: pt(10),
        borderRadius: pt(30),
    },
    loginField: {
        alignItems: 'center',
        marginTop: pt(20),
    },
});

export default connect(() => ({}))(CountLogin);
