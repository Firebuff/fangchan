import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import pt from '../utils/px2dp/Px2dp';
import Svg from '../components/svg';
import {connect} from 'react-redux';
import {getPaymentOrder} from '../api';

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let uid = this.props.globalData.userInfo.uid
        console.log(this.props);
        // 获取订单
        getPaymentOrder({
            paytype: 'alipay',
            total_fee: 10,
            ctype: 'rmb',
            consume: 4,
            uid: uid,
            isapp: 1
        }).then(data => {
            console.log(data)
        }).catch(error => {
            
        })
    }

    paymentHandle = () => {};

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerName}>充值金额</Text>
                    <View style={styles.moneyWrapper}>
                        <Text style={styles.moneyIcon}>￥</Text>
                        {/* <Text style={styles.moneyNum}>8558</Text> */}
                        <TextInput
                            // placeholder={'请输入充值金额'}
                            placeholderTextColor={'#CCCCCC'}
                            editable={true}
                            selectionColor={'red'}
                            style={styles.moneyNum}
                            onChangeText={(res) => {
                                console.log(res);
                                this.setState({
                                    value: res,
                                });
                            }}
                        />
                    </View>
                </View>
                <View style={styles.choiceWrapper}>
                    <View style={styles.choiceContent}>
                        <Text style={styles.choiceName}>充值方式</Text>
                        <View style={styles.choice}>
                            <Text style={styles.choiceItemName}>微信</Text>
                            <Text style={styles.choiceItemName}>支付宝</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            this.paymentHandle();
                        }}>
                        <Text style={styles.btnText}>确定充值</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    moneyWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingBottom: pt(30),
    },
    moneyIcon: {
        fontSize: pt(30),
        color: '#101D37',
        alignSelf: 'center',
    },
    moneyNum: {
        fontSize: pt(40),
        color: '#101D37',
        fontWeight: 'bold',
        lineHeight: pt(40),
        flex: 1,
    },
    headerName: {
        color: '#333333',
        fontSize: pt(14),
        marginTop: pt(22),
        marginBottom: pt(30),
    },
    header: {
        backgroundColor: '#fff',
        paddingLeft: pt(15),
        paddingRight: pt(15),
    },
    btnWrapper: {
        paddingLeft: pt(15),
        paddingRight: pt(15),
    },
    btn: {
        height: pt(48),
        backgroundColor: '#F04531',
        borderRadius: pt(4),
        alignItems: 'center',
        marginTop: pt(23),
        paddingLeft: pt(15),
        paddingRight: pt(15),
    },
    btnText: {
        color: '#fff',
        lineHeight: pt(48),
        fontSize: pt(18),
    },
    choiceWrapper: {
        backgroundColor: '#fff',
        paddingLeft: pt(15),
        paddingRight: pt(15),
        marginTop: pt(12),
        height: pt(44),
        lineHeight: pt(44),
    },
    choiceContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    choice: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    choiceName: {
        lineHeight: pt(44),
        marginRight: pt(10),
        fontSize: pt(14),
        color: '#333333',
    },
    choiceItemName: {
        lineHeight: pt(44),
    },
});

export default  connect (state=> ({globalData: state.globalHouseData})) (Payment)
