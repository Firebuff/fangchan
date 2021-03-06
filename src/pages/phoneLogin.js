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

import {getMessageCode, getMessageType, loginByPhone, getUserInfo} from '../api';

import { setUserInfo, setCSRF, setLogin } from '../redux/actions'

import { connect } from 'react-redux'


class PhoneLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            phone: '',
            code: '',
            buttonActive: false,
            timeCount: 0,
            timer: null
        };
    }
    // input事件
    inputHandle(res, key) {
        this.setState(
            {
                [key]: res,
            },
            () => {
                if (this.state.phone && this.state.code) {
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
    // 倒计时
    timeCountHandle() {
        if (!this.state.phone) {
            this.alertHandle('手机号码不能为空')
            return
        }
        this.setState(
            {
                timeCount: 60,
            },
            () => {

                
                let timer = setInterval(() => {
                    if (this.state.timeCount == 0) {
                        clearInterval(this.state.timer);
                        this.setState({
                            timeCount: 0,
                        });
                        return;
                    }
                    this.setState({
                        timeCount: this.state.timeCount - 1,
                    });
                }, 1000);
                this.setState({
                    timer: timer
                })
            },
        );
    }
    // 表单验证
    checkHandle() {
        if (this.state.phone && this.state.code && this.state.checked)
            return true;
        if (!this.state.phone) {
            this.alertHandle('手机号码不能为空');
            return false;
        }
        if (!this.state.code) {
            this.alertHandle('验证码不能为空');
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
            type: 1,
            userName: this.state.phone,
            vcode: this.state.code
        }
        console.log(params)
        loginByPhone(params).then((res) => {
            //console.log(res)
            if (res.status == 1) {
                this.alertHandle(res.info)
                getUserInfo().then(userRes => {
                    //console.log(userRes)
                    if (userRes.status == 1) {
                        this.props.dispatch(setUserInfo(userRes))
                        this.props.dispatch(setCSRF(userRes.csrf_token))
                        this.props.dispatch(setLogin(true))
                        //跳转到会员中心
                        this.props.navigation.navigate('MemberCenterScreen')
                    }
                })
            } else {
                this.alertHandle(res.info)
            }
        })
    }

    sendMessage() {
        if (!this.state.phone) {
            this.alertHandle('手机号码不能为空')
            return
        }
        getMessageType({tpl: 'login'}).then( tplRes => {
            if (tplRes.status == 1) {
                let params = {
                    tel: this.state.phone,
                    tpl: tplRes.tpl,
                    id: 'smscode',
                    checked: 1,
                };
                getMessageCode(params).then( (loginRes) => {
                    if (loginRes.status == 1) {
                        this.alertHandle(loginRes.info)
                    } else {
                        this.alertHandle('获取验证码失败')
                    }
                }).catch (err => {
                    this.alertHandle('获取验证码失败')
                }) 
            } else {
                this.alertHandle('获取验证码失败')
            }
        }).catch (err => {
            this.alertHandle('获取验证码失败')
        }) 
    }

    componentWillUnmount () {
        clearInterval(this.state.timer)
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={'请输入您的手机号'}
                    placeholderTextColor={'#CCCCCC'}
                    keyboardType={'numeric'}
                    onChangeText={(res) => {
                        this.inputHandle(res, 'phone');
                    }}></TextInput>
                <View>
                    <TextInput
                        style={[styles.input, styles.codeInput]}
                        placeholder={'请输入短信验证码'}
                        placeholderTextColor={'#CCCCCC'}
                        onChangeText={(res) => {
                            this.inputHandle(res, 'code');
                        }}></TextInput>
                    <TouchableOpacity
                        style={styles.codeBtn}
                        onPress={() => {
                            if (this.state.timeCount != 0) return;
                            this.sendMessage()
                            this.timeCountHandle();
                        }}>
                        {this.state.timeCount == 0 ? (
                            <Text style={{color: '#F04531'}}>获取验证码</Text>
                        ) : (
                            <Text style={{color: '#00965e'}}>
                                {this.state.timeCount}秒后重新获取
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                this.state.buttonActive && this.state.checked
                                    ? '#F04531'
                                    : '#F7A197',
                        },
                    ]}
                    activeOpacity={0.2}
                    onPress={() => {
                        this.loginHandle();
                    }}>
                    <Text style={styles.buttonText}>立即登录</Text>
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
        fontSize: pt(14)
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
});

export default connect(() => ({}))(PhoneLogin)
 