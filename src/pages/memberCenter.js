import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';

import pt from '../utils/px2dp/Px2dp';

import LineText from '../components/line-text';

import Svg from '../components/svg';

import {connect} from 'react-redux';

// 设置border-shadow的组件
import {Card} from 'react-native-shadow-cards';

const menuNavList = [
    {
        name: '我的房源',
        icon: 'iconwodefangyuan',
    },
    {
        name: '我的出租',
        icon: 'iconwodechuzu',
    },
    {
        name: '我的求租',
        icon: 'iconwodeqiuzu',
    },
    {
        name: '我的求购',
        icon: 'iconwodeqiugou',
    },
    {
        name: '我的优惠',
        icon: 'iconwodeyouhui',
    },
    {
        name: '我的报名',
        icon: 'iconwodebaoming',
    },
    {
        name: '收藏记录',
        icon: 'iconshoucangjilu',
    },
    {
        name: '我的问答',
        icon: 'iconwodewenda',
    },
];

const linkList = [
    {
        name: '关于我们',
        icon: 'iconguanyuwomen',
    },
    {
        name: '联系我们',
        icon: 'iconlianxiwomen',
    },
    {
        name: '意见反馈',
        icon: 'iconyijianfankui',
    },
    {
        name: '账号设置',
        icon: 'iconzhanghaoshezhi',
    },
];

class MemberCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log(this.props);

        let userInfo = this.props.globalData.userInfo;
        let isLogin = this.props.globalData.login;

        let tepImg =
            'https://house.08cms.com/thumb/uploads/house/000/00/00/1/000/002/00ab7d1f20cfbc8a724dcd49b557bae7.jpg';
        return (
            <View>
                <View style={styles.userInfo}>
                    <View style={styles.imgWrapper}>
                        <Image
                            style={styles.img}
                            resizeMode={'cover'}
                            source={{
                                uri: isLogin ? userInfo.image : tepImg,
                            }}></Image>
                    </View>

                    <TouchableOpacity
                        style={styles.infoText}
                        onPress={() => {
                            if(isLogin)return
                            this.props.navigation.navigate('CountLoginScreen');
                        }}>
                        <View
                            style={{
                                justifyContent: 'space-around',
                                height: pt(60),
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <Text style={styles.loginBtn}>
                                    {isLogin ? userInfo.fullname : '登录/注册'}
                                </Text>

                                {isLogin ? (
                                    <Text style={styles.level}>
                                        {userInfo.rolename}
                                    </Text>
                                ) : null}
                            </View>

                            <Text style={styles.infoTextDesc}>
                                {isLogin
                                    ? `ID${userInfo.id}`
                                    : '登录即可体验更多服务'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Card
                    cornerRadiuts={pt(4)}
                    elevation={1}
                    style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        top: pt(90),
                    }}>
                    <View style={styles.userNavList}>
                        <TouchableOpacity
                            onPress = { () => {
                                this.props.navigation.navigate('WalletScreen');
                            }}
                        >
                            <View>
                                <View style={styles.userNavItemIcon}>
                                    <Svg
                                        name={'iconwodeqianbao'}
                                        height={pt(30)}
                                        width={pt(28)}></Svg>
                                </View>
                                <Text style={styles.userNavItemText}>
                                    我的钱包
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View>
                                <View style={styles.userNavItemIcon}>
                                    <Svg
                                        name={'iconyonghuguanli'}
                                        height={pt(30)}
                                        width={pt(28)}></Svg>
                                </View>
                                <Text style={styles.userNavItemText}>
                                    用户管理
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View>
                                <View style={styles.userNavItemIcon}>
                                    <Svg
                                        name={'iconxiaoxi'}
                                        height={pt(30)}
                                        width={pt(28)}></Svg>
                                </View>
                                <Text style={styles.userNavItemText}>
                                    消息通知
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Card>
                <Card
                    cornerRadiuts={pt(4)}
                    elevation={1}
                    style={{
                        alignSelf: 'center',
                        marginTop: pt(45),
                    }}>
                    <View style={styles.menuNavList}>
                        {menuNavList.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={styles.menuNavListItemWrapper}
                                    key={index}>
                                    <View style={styles.menuNavListItem}>
                                        <View
                                            style={styles.menuNavListItemIcon}>
                                            <Svg
                                                name={item.icon}
                                                height={pt(30)}
                                                width={pt(28)}></Svg>
                                        </View>
                                        <Text
                                            style={styles.menuNavListItemText}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Card>
                <Card
                    cornerRadiuts={pt(4)}
                    elevation={1}
                    style={{
                        alignSelf: 'center',
                        marginTop: pt(12),
                    }}>
                    <View style={styles.linkList}>
                        {linkList.map((item, index) => {
                            return (
                                <TouchableOpacity key={index}>
                                    <View
                                        style={[
                                            styles.linkListItem,
                                            {
                                                borderBottomWidth:
                                                    index == linkList.length - 1
                                                        ? 0
                                                        : pt(1),
                                            },
                                        ]}>
                                        <View style={styles.linkListItemLeft}>
                                            <Svg
                                                name={item.icon}
                                                height={pt(18)}
                                                width={pt(19)}></Svg>
                                            <Text
                                                style={styles.linkListItemText}>
                                                {item.name}
                                            </Text>
                                        </View>
                                        <View style={styles.linkListItemRight}>
                                            <Svg
                                                name={'icongengduo_ccc'}
                                                height={pt(14)}
                                                width={pt(24)}></Svg>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imgWrapper: {
        width: pt(62),
        height: pt(62),
        borderRadius: pt(30),
        backgroundColor: 'purple',
        borderWidth: pt(2),
        borderColor: '#fff',
        overflow: 'hidden',
    },
    img: {
        width: pt(60),
        height: pt(60),
        borderRadius: pt(30),
    },
    userInfo: {
        backgroundColor: '#F04531',
        paddingLeft: pt(15),
        paddingRight: pt(15),
        paddingBottom: pt(70),
        paddingTop: pt(15),
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    infoText: {
        //justifyContent: 'space-around',
        marginLeft: pt(10),
    },
    loginBtn: {
        fontWeight: 'bold',
        fontSize: pt(18),
        lineHeight: pt(25),
        color: '#fff',
    },
    infoTextDesc: {
        color: '#FBD0CB',
        fontSize: pt(12),
    },
    userNavList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: pt(15),
        paddingBottom: pt(15),
        width: pt(375),
        paddingLeft: pt(15),
        paddingRight: pt(15),
        width: '100%',
    },
    userNavItemIcon: {
        alignItems: 'center',
        marginBottom: pt(8),
    },
    userNavItemText: {
        fontSize: pt(14),
        color: '#333333',
    },
    menuNavList: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignSelf: 'center',
        width: '100%',
        paddingBottom: pt(25),
    },
    menuNavListItemWrapper: {
        width: '25%',
        alignItems: 'center',
        paddingTop: pt(25),
    },
    menuNavListItem: {
        alignItems: 'center',
    },
    menuNavListItemText: {
        fontSize: pt(12),
        color: '#333333',
        marginTop: pt(5),
    },
    linkListItemLeft: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    linkListItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: pt(15),
        paddingRight: pt(15),
        height: pt(45),
        lineHeight: pt(45),
        alignItems: 'center',
        borderColor: '#F5F5F5',
        borderBottomWidth: pt(1),
    },
    linkListItemText: {
        color: '#333333',
        fontSize: pt(14),
        lineHeight: pt(18),
        marginLeft: pt(10),
    },
    level: {
        fontSize: pt(10),
        paddingLeft: pt(6),
        paddingRight: pt(6),
        borderRadius: pt(20),
        borderWidth: pt(1),
        height: pt(16),
        borderColor: '#fff',
        marginLeft: pt(5),
        color: '#fff',
        alignSelf: 'center',
    },
});
export default connect((state) => ({globalData: state.globalHouseData}))(
    MemberCenter,
);
