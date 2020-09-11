import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import pt from '../utils/px2dp/Px2dp';
import Svg from '../components/svg';


import ShareUtil from '../share/ShareUtil';//导入分享的模块



import {connect} from 'react-redux';

class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shareHandle () {
       this.props.navigation.navigate('ShareScreen')
    }
    render() {
        console.log(this.props)
        let money = this.props.globalHouseData.userInfo.rmb || 0
        return (
            <View style={styles.wrapper}>
                <View style={styles.svgWrapper}>
                    <Svg style={styles.svg} name={'iconyue'}></Svg>
                </View>
                <Text style={styles.name}>我的余额</Text>
                <Text style={styles.money}>
                    ￥{money}
                </Text>
                <TouchableOpacity
                    style={styles.btnWrapper}
                    onPress={() => {
                        this.props.navigation.navigate('PaymentScreen')
                    }}
                >
                    <Text style={styles.btnText}>充值账户</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btnWrapper,{marginTop: pt(20)}]}
                    onPress={() => {
                        this.shareHandle()
                    }}
                >
                    <Text style={styles.btnText}>去分享</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btnWrapper,{marginTop: pt(20)}]}
                    onPress={() => {
                        this.props.navigation.navigate('CodePushScreen')
                    }}
                >
                    <Text style={styles.btnText}>检查更新</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center'
    },
    svgWrapper: {
        marginTop: pt(50),
        width: pt(60),
        height: pt(60),
        borderRadius: pt(30),
        backgroundColor: '#FFEDE9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        marginTop: pt(30),
        color: '#333333',
        fontSize: pt(16),
        marginBottom: pt(30)
    },
    money: {
        fontSize: pt(40),
        color: '#101D37',
        fontWeight: 'bold',
        marginBottom: pt(60)
    },
    btnText: {
        lineHeight: pt(48),
        height: pt(48),
        alignSelf: 'center',
        color: '#fff',
        fontSize: pt(18)
    },
    btnWrapper: {
        flexDirection: 'row' ,
        justifyContent: 'center',
        width: pt(200),
        height: pt(48),
        backgroundColor: '#F04531',
        borderRadius: pt(4),
    }
});

export default  connect (state=> ({globalHouseData: state.globalHouseData})) (Wallet) 
