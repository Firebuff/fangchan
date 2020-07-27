import React from 'react';

import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

import pt from '../utils/px2dp/Px2dp';

import LineText from '../components/line-text';

import GetMoreButton from '../components/get-more-button';

import Svg from '../components/svg';

import DetailTitle from '../components/detail-title';

class HouseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let img = 'https://house.08cms.com/thumb/uploads/house/000/00/00/1/000/002/00ab7d1f20cfbc8a724dcd49b557bae7.jpg'
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.swiper}></View>
                    <View style={styles.mainInfo}>
                        <Text style={styles.mainInfoTitle}>
                            新希望华鸿中梁瑞祥天樾
                        </Text>
                        <View style={styles.priceField}>
                            <View style={styles.priceFieldItem}>
                                <View style={styles.price}>
                                    <Text style={styles.priceNumber}>
                                        32000
                                    </Text>
                                    <Text style={styles.priceUnit}>元/m²</Text>
                                </View>
                                <Text style={styles.priceFieldItemName}>
                                    参考价格
                                </Text>
                            </View>
                            <View style={styles.priceFieldItem}>
                                <View style={styles.price}>
                                    <Text style={styles.priceNumber}>
                                        32000
                                    </Text>
                                    <Text style={styles.priceUnit}>m²</Text>
                                </View>
                                <Text style={styles.priceFieldItemName}>
                                    建筑面积
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoList}>
                            <View style={styles.infoListItem}>
                                <LineText
                                    name={'开发商'}
                                    value={
                                        '东莞市首铸二号房地产有限公司'
                                    }></LineText>
                            </View>
                            <View style={styles.infoListItem}>
                                <LineText
                                    name={'主推户型'}
                                    value={'98m²三房 | 123m²四房'}></LineText>
                            </View>
                            <View style={styles.infoListItem}>
                                <LineText
                                    name={'开盘时间'}
                                    value={'2020.06.26'}></LineText>
                            </View>
                            <View style={styles.infoListItem}>
                                <LineText
                                    name={'楼盘地址'}
                                    value={
                                        '东莞市南城区建设路与运河东三路交汇处'
                                    }></LineText>
                            </View>
                        </View>
                        <GetMoreButton
                            name={'查看更多楼盘信息'}></GetMoreButton>
                        <View style={styles.infoBottomBtnWrapper}>
                            <View style={styles.infoBottomBtn}>
                                <Svg
                                    name={'iconkaipan'}
                                    width={pt(20)}
                                    height={pt(20)}></Svg>
                                <Text style={styles.infoBottomBtnName}>
                                    开盘提醒
                                </Text>
                            </View>
                            <View style={styles.infoBottomBtn}>
                                <Svg
                                    name={'iconpricedecrease'}
                                    width={pt(20)}
                                    height={pt(20)}></Svg>
                                <Text style={styles.infoBottomBtnName}>
                                    开盘提醒
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.houseStatus}>
                        <DetailTitle
                            name={'楼盘动态(26)'}
                            iconName={'查看更多'}></DetailTitle>
                        <View style={styles.houseStatusList}>
                            <View style={styles.houseStatusListItem}>
                                <Image
                                    style={styles.houseStatusImg}
                                    resizeMode="cover"
                                    source={{
                                        uri: img,
                                    }}
                                />
                                <View style={styles.houseStatusText}>
                                    <Text style={{width: '100%'}}>
                                        万科首铸翡翠东望尾盘在售库存仅剩少万科首铸翡翠东望尾盘在售库存仅剩少
                                       
                                    </Text>
                                    <Text>
                                        刘青峰  2020.04.24
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: pt(375),
    },
    swiper: {
        width: '100%',
        height: pt(250),
        backgroundColor: 'pink',
    },
    mainInfo: {
        paddingLeft: pt(15),
        paddingRight: pt(15),
        paddingTop: pt(15),
        backgroundColor: '#fff',
    },
    mainInfoTitle: {
        fontSize: pt(20),
        color: '#101D37',
        fontWeight: 'bold',
    },
    priceField: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: pt(18),
        marginBottom: pt(20),
    },
    priceFieldItem: {
        flex: 1,
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    priceNumber: {
        fontSize: pt(18),
        color: '#F04531',
        fontWeight: 'bold',
    },
    priceUnit: {
        fontSize: pt(12),
        color: '#F04531',
        alignSelf: 'center',
    },
    priceFieldItemName: {
        color: '#999999',
        fontSize: pt(10),
    },
    infoListItem: {
        marginBottom: pt(14),
    },
    infoBottomBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoBottomBtnName: {
        alignSelf: 'center',
        fontSize: pt(14),
        color: '#F7A197',
        marginLeft: pt(2),
    },
    infoBottomBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: pt(44),
        lineHeight: pt(44),
        backgroundColor: '#fff',
        borderRadius: pt(4),
    },
    houseStatus: {
        paddingLeft: pt(15),
        paddingRight: pt(15),
        backgroundColor: '#fff',
        marginTop: pt(12),
    },
    houseStatusImg: {
        height: pt(80),
        width: pt(104),
        borderRadius: pt(4)
    },
    houseStatusListItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: pt(375-30)
    },
    houseStatusText: {
        justifyContent: 'space-between',
        marginLeft: pt(15),
        width: pt(375-30-15)
    },
    houseStatusList: {
        paddingLeft: pt(15),
        paddingRight: pt(15),
    }
});

export default HouseDetail;
