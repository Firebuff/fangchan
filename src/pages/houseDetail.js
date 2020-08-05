import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity,
    Linking,
    FlatList,
    Alert,
} from 'react-native';

import pt from '../utils/px2dp/Px2dp';

import LineText from '../components/line-text';

import GetMoreButton from '../components/get-more-button';

import Swipers from '../components/swiper';

import Svg from '../components/svg';

import DetailTitle from '../components/detail-title';

import {MapView, MapTypes, Geolocation, Overlay} from 'react-native-baidu-map';

import {Button} from 'react-native-elements';

import Spinkiter from 'react-native-spinkit';

import {getHouseDetail} from '../api';

import HouseList from '../components/house/list';

const {Marker} = Overlay;

const screenHeight = Dimensions.get('window').height;

class HouseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canScroll: true,
            loading: true,
            resData: {},
            houseInfo: {},
        };
    }
    callPhone = (phone) => {
        const url = `tel:${phone}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    return Alert.alert(
                        '提示',
                        `您的设备不支持该功能，请手动拨打 ${phone}`,
                        [{text: '确定'}],
                    );
                }
                return Linking.openURL(url);
            })
            .catch((err) => Toast.info(`出错了：${err}`, 1.5));
    };

    loading() {
        return (
            <View
                style={{
                    position: 'absolute',
                    height: screenHeight,
                    width: pt(375),
                    top: 0,
                    left: 0,
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                }}>
                <Spinkiter
                    type={'FadingCircleAlt'}
                    color={'#F04531'}
                    size={pt(40)}
                    style={{alignSelf: 'center', flex: 1}}
                />
                <View style={{height: '40%'}}></View>
            </View>
        );
    }

    componentDidMount() {
        getHouseDetail({id: this.props.route.params.id}).then((res) => {
            if (res.status == 1) {
                let newRes = {...res};

                newRes.lphdp.length &&
                    newRes.lphdp.forEach((element) => {
                        element.type = 'picture';
                    });
                this.setState(
                    {
                        loading: false,
                        resData: newRes,
                        houseInfo: newRes.data[0],
                    },
                    () => {
                        console.log(this.state.resData);
                    },
                );
            }
        });
    }

    huxingComponent(element,index) {
        let item = element.item
        return (
            <View style={styles.houseTypeItem}>
                <Image
                    style={styles.houseTypeImg}
                    resizeMode="cover"
                    source={{
                        uri: item.thumb,
                    }}
                />
                <View style={styles.houseTypeTitleWrapper}>
                    <Text style={styles.houseTypeTitle}>
                        {item.shi + item.ting + item.wei + item.chu}
                    </Text>
                    <Text style={styles.houseTypeTag}>在售</Text>
                </View>
                <View>
                    <Text style={styles.houseTypeSize}>建面约123m²</Text>
                </View>
            </View>
        );
    }

    flatList (list) {
        if (!list.length) {
            return null
        }
        return (
            <FlatList 
                data={ list } 
                renderItem={this.huxingComponent}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator = {false}
                ItemSeparatorComponent = {
                   () => ( <View style={{width: pt(15)}}></View>)
                }
            >
            </FlatList>
        )
    }

    render() {
        let img =
            'https://house.08cms.com/thumb/uploads/house/000/00/00/1/000/002/00ab7d1f20cfbc8a724dcd49b557bae7.jpg';
        let houseInfo = this.state.houseInfo || {};
        let resData = this.state.resData
        let huxingList = resData && resData.huxing && resData.huxing.length && resData.huxing || []
        let lphdpList = resData && resData.lphdp && resData.lphdp.length && resData.lphdp || []

        return (
            <View style={{paddingBottom: pt(60), marginTop: pt(2)}}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.swiper}>
                            {
                                lphdpList.length? <Swipers pictureList={resData.lphdp}></Swipers> : null
                            }
                        </View>
                        <View style={styles.mainInfo}>
                            <Text style={styles.mainInfoTitle}>
                                {(houseInfo && houseInfo.name) || '暂无资料'}
                            </Text>
                            <View style={styles.priceField}>
                                <View style={styles.priceFieldItem}>
                                    <View style={styles.price}>
                                        <Text style={styles.priceNumber}>
                                            {(houseInfo &&
                                                houseInfo.dj &&
                                                Number(houseInfo.dj)) ||
                                                '待定'}
                                        </Text>
                                        {
                                            houseInfo.dj? <Text style={styles.priceUnit}>元/m²</Text> : null
                                        }
                                        
                                    </View>
                                    <Text style={styles.priceFieldItemName}>
                                        参考价格
                                    </Text>
                                </View>
                                <View style={styles.priceFieldItem}>
                                    <View style={styles.price}>
                                        <Text style={styles.priceNumber}>
                                            {(houseInfo &&
                                                houseInfo.jzmj &&
                                                houseInfo.jzmj
                                                    .toString()
                                                    .replace(/m²/g, '')) ||
                                                '暂无资料'}
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
                                            (houseInfo &&
                                                houseInfo.house_developer) ||
                                            '暂无资料'
                                        }></LineText>
                                </View>
                                <View style={styles.infoListItem}>
                                    <LineText
                                        name={'主推户型'}
                                        value={
                                            '98m²三房 | 123m²四房'
                                        }></LineText>
                                </View>
                                <View style={styles.infoListItem}>
                                    <LineText
                                        name={'开盘时间'}
                                        value={
                                            (houseInfo && houseInfo.kpdate) ||
                                            '暂无资料'
                                        }></LineText>
                                </View>
                                <View style={styles.infoListItem}>
                                    <LineText
                                        name={'楼盘地址'}
                                        value={
                                            (houseInfo && houseInfo.address) ||
                                            '暂无资料'
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
                                name={`户型介绍(${huxingList.length})`}
                                iconName={'查看更多'}>
                            </DetailTitle>
                            {
                                this.flatList(huxingList)
                            }
                        </View>
                        <View style={styles.mapField}>
                            <DetailTitle
                                name={'位置周边'}
                                iconName={'查看更多'}></DetailTitle>
                            <MapView
                                width={pt(375 - 30)}
                                height={pt(200)}
                                zoom={15}
                                trafficEnabled={true}
                                zoomControlsVisible={true}
                                showsUserLocation={true}
                                scrollGesturesEnabled={true}
                                center={{
                                    longitude: houseInfo.lng || 113.75,
                                    latitude: houseInfo.lat || 23.05,
                                }}>
                                <Marker
                                    location={{
                                        longitude: houseInfo.lng || 113.75,
                                        latitude: houseInfo.lat || 23.05,
                                    }}
                                    icon={require('../static/images/img/marker.png')}
                                />
                            </MapView>
                        </View>
                        <View style={styles.moreHouses}>
                            <DetailTitle
                                name={'猜你喜欢'}
                                iconName={'查看更多'}></DetailTitle>
                            {
                                resData.sortPrices && resData.sortPrices.length && resData.sortPrices.map((item) => {
                                    return (
                                        <HouseList {...item} key={item.id} idParam={'id'} navigation={this.props.navigation}></HouseList>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomBtns}>
                    <TouchableOpacity
                        style={styles.callPhone}
                        onPress={() => {
                            this.callPhone(18038253636);
                        }}>
                        <Text style={styles.phoneText}>打电话</Text>
                    </TouchableOpacity>
                </View>
                {this.state.loading ? this.loading() : null}
            </View>
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
        //backgroundColor: 'pink',
    },
    mainInfo: {
        //width: '100%',
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
    bottomBtns: {
        width: pt(375),
        height: pt(50),
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    callPhone: {
        width: pt(130),
        height: pt(50),
        lineHeight: pt(50),
        justifyContent: 'center',
        backgroundColor: '#F04531',
        alignItems: 'center',
    },
    phoneText: {
        color: '#fff',
        fontSize: pt(18),
    },
});

export default HouseDetail;
