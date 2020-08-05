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

class PhoneLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={'请输入您的手机号'}
                    placeholderTextColor={'#CCCCCC'}></TextInput>
                <View>
                    <TextInput
                        style={[styles.input, styles.codeInput]}
                        placeholder={'请输入短信验证码'}
                        placeholderTextColor={'#CCCCCC'}></TextInput>
                    <TouchableOpacity style={styles.codeBtn}>
                        <Text style={{color: '#F04531'}}>获取验证码</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>立即登录</Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row',justifyContent: 'center',marginTop: pt(15)}}>
                    <CheckBox
                        center={true}
                        title="我已阅读并同意"
                        textStyle={{color: '#CCCCCC', padding: 0,margin: 0, fontSize: pt(12), fontWeight: '400'}}
                        checked={this.state.checked}
                        size={pt(16)}
                        checked={this.state.checked}
                        checkedColor={'#F04531'}
                        containerStyle={{
                            backgroundColor: '#fff',
                            borderWidth: 0,
                            padding: 0,
                            margin: 0
                        }}
                        onPress={() => {
                            this.setState({
                                checked: !this.state.checked
                            })
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
        color: '#F04531'
    }
});

export default PhoneLogin;
