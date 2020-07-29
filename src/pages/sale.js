import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

import pt from '../utils/px2dp/Px2dp';

import LineText from '../components/line-text';

import GetMoreButton from '../components/get-more-button';

import Swipers from '../components/swiper';

import Svg from '../components/svg';

import DetailTitle from '../components/detail-title';

import {MapView, MapTypes, Geolocation, Overlay} from 'react-native-baidu-map';






const {Marker} = Overlay;

class HouseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canScroll: true,
        };
    }
    render() {
        let img =
            'https://house.08cms.com/thumb/uploads/house/000/00/00/1/000/002/00ab7d1f20cfbc8a724dcd49b557bae7.jpg';
        return (
            <ScrollView scrollEnabled={this.state.canScroll}>
                <View style={styles.container}>
                    <View style={styles.swiper}>
                        <Swipers></Swipers>
                    </View>
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
                                    <Text style={styles.statusItemTitle}>
                                        万科首铸翡翠东望尾盘在售库万科首铸翡翠东望尾盘在售库
                                    </Text>
                                    <Text style={styles.statusItemSubText}>
                                        刘青峰 2020.04.24
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.houseType}>
                        <DetailTitle
                            name={'户型介绍(5)'}
                            iconName={'查看更多'}></DetailTitle>
                        <View style={styles.houseTypeList}>
                            <View style={styles.houseTypeItem}>
                                <Image
                                    style={styles.houseTypeImg}
                                    resizeMode="cover"
                                    source={{
                                        uri: img,
                                    }}
                                />
                                <View style={styles.houseTypeTitleWrapper}>
                                    <Text style={styles.houseTypeTitle}>
                                        4室2厅2卫1厨
                                    </Text>
                                    <Text style={styles.houseTypeTag}>
                                        在售
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.houseTypeSize}>
                                        建面约123m²
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.mapField}>
                        <DetailTitle
                            name={'位置周边'}
                            iconName={'查看更多'}></DetailTitle>
                        <MapView
                            width={pt(375 - 30)}
                            height={pt(200)}
                            zoom={18}
                            trafficEnabled={true}
                            zoomControlsVisible={true}
                            showsUserLocation={true}
                            scrollGesturesEnabled={true}
                            center={{
                                longitude: 113.75,
                                latitude: 23.05,
                            }}>
                            <Marker
                                title="中心"
                                location={{
                                    longitude: 116.465175,
                                    latitude: 39.938522,
                                }}
                            />
                        </MapView>
                    </View>
                    <View style={styles.moreHouses}>
                        <DetailTitle
                            name={'猜你喜欢'}
                            iconName={'查看更多'}></DetailTitle>
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
        borderRadius: pt(4),
        marginRight: pt(15),
    },
    houseStatusListItem: {
        flexDirection: 'row',
        paddingBottom: pt(15),
    },
    houseStatusText: {
        flex: 1,
        justifyContent: 'space-between',
    },
    statusItemTitle: {
        fontSize: pt(14),
        width: pt(375 - 104 - 30),
        color: '#333333',
        fontWeight: 'bold',
    },
    statusItemSubText: {
        fontSize: pt(12),
        color: '#DDE3EF',
    },
    houseType: {
        paddingLeft: pt(15),
        paddingRight: pt(15),
        backgroundColor: '#fff',
        marginTop: pt(12),
        paddingBottom: pt(20),
    },
    houseTypeImg: {
        width: pt(105),
        height: pt(105),
        borderRadius: pt(4),
    },
    houseTypeTitleWrapper: {
        flexDirection: 'row',
        marginTop: pt(10),
    },
    houseTypeTitle: {
        fontSize: pt(12),
        color: '#333333',
        marginRight: pt(4),
    },
    houseTypeTag: {
        backgroundColor: '#FEF0EF',
        fontSize: pt(10),
        color: '#F36D61',
        alignSelf: 'center',
        paddingBottom: pt(1),
        paddingTop: pt(1),
        paddingLeft: pt(2),
        paddingRight: pt(2),
        borderRadius: pt(2),
    },
    houseTypeSize: {
        color: '#999999',
        fontSize: pt(10),
        marginTop: pt(5),
    },
    mapField: {
        paddingLeft: pt(15),
        paddingRight: pt(15),
        backgroundColor: '#fff',
        marginTop: pt(12),
        paddingBottom: pt(20),
    },
    moreHouses: {
        paddingLeft: pt(15),
        paddingRight: pt(15),
        backgroundColor: '#fff',
        marginTop: pt(12),
        paddingBottom: pt(20),
    },
});

export default HouseDetail;
