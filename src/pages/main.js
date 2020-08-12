import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Button,
    Animated,
    Easing,
    Image,
    TouchableOpacity,
} from 'react-native';

import pt from '../utils/px2dp/Px2dp';

import NaviItem from '../components/index/navi-item';

import Svg from '../components/svg';

// 设置border-shadow的组件
import {Card} from 'react-native-shadow-cards';

import Carousel from 'react-native-snap-carousel';

import HouseList from '../components/house/list';

import NewsList from '../components/news/list';

import SaleList from '../components/sale/list';

import {getIndex, getToken} from '../api';

import Swipers from '../components/swiper';

import DetailTitle from '../components/detail-title';

import Swiper from 'react-native-swiper';

import { setCSRF } from '../redux/actions'

import { connect } from 'react-redux'

import SplashScreen from 'react-native-splash-screen'

const moment = require('moment')

let naviList = [
    {
        icon: 'iconmaixinfang',
        bg: '#FA554E',
        name: '买新房',
    },
    {
        icon: 'iconershoufang',
        bg: '#18BA43',
        name: '二手房',
    },
    {
        icon: 'iconzhaozufang',
        bg: '#FF881D',
        name: '找租房',
    },
    {
        icon: 'iconshangpubangong',
        bg: '#01B1FE',
        name: '商铺办公',
    },
    {
        icon: 'iconzhibokanfang',
        bg: '#FF5A7A',
        name: '直播看房',
    },
    {
        icon: 'icontuangoumaifang',
        bg: '#FFA402',
        name: '团购买房',
    },
    {
        icon: 'iconxiaoquzhaofang',
        bg: '#1BD0B9',
        name: '小区找房',
    },
    {
        icon: 'icondituzhaofang',
        bg: '#747CF5',
        name: '地图找房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#26D178',
        name: '查房价',
    },
    {
        icon: 'iconzhiyeguwen',
        bg: '#3586F5',
        name: '置业顾问',
    },
];

const deviceWidth = Dimensions.get('window').width;

const contentNavList = [
    {
        name: '新房',
    },
    {
        name: '二手房',
    },
    {
        name: '出租房',
    },
    {
        name: '资讯',
    },
];

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            range: [0, 0],
            currentIndex: 0,
            resData: {},
        };
        this.animateVal = new Animated.Value(0);

        this.spin = null;
    }

    _renderItem({item, index}) {
        return (
            <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={[Styles.liveNewsText]}>
                {item.name}
            </Text>
        );
    }

    componentDidMount() {
        getIndex().then((res) => {
            console.log(res);
            if (res.status == 1) {
                let newRes = {...res};
                newRes.appswiper.forEach((item) => {
                    item.type = 'picture';
                });
                //console.log(newRes);
                this.setState({
                    resData: newRes,
                });
                SplashScreen.hide()
            }
        });
        // 获取表单token
        getToken().then((res) => {
            this.props.dispatch(setCSRF(res.csrf_token))
        })
    }

    cardSelect(item, index) {
        let normal = pt((375 - 30) / contentNavList.length);
        let end, begin;

        if (index > this.state.currentIndex) {
            end = index * normal;
            begin = this.state.currentIndex * normal;
        } else {
            end = index * normal;
            begin = this.state.currentIndex * normal;
        }

        if (index == this.state.currentIndex) {
            return;
        }

        this.setState({
            range: [begin, end],
            currentIndex: index,
        });

        this.moveLine();
    }

    //旋转方法
    moveLine = () => {
        this.animateVal.setValue(0);
        Animated.timing(this.animateVal, {
            toValue: 1, // 最终值 为1，这里表示最大旋转 360度
            duration: 500,
            easing: Easing.linear,
        }).start();
    };

    mirror = (arr) => {
        this.spin = this.animateVal.interpolate({
            inputRange: [0, 1], //输入值
            outputRange: arr, //输出值
        });
    };

    showListComponent() {
        let listComponent;
        let listData;
        if (this.state.currentIndex == 0) {
            listData =
                (this.state.resData.houses &&
                    this.state.resData.houses.length &&
                    this.state.resData.houses) ||
                [];
            return (
                <View style={Styles.ListContent}>
                    {listData.map((item, index) => {
                        return (
                            <HouseList
                                {...item}
                                key={item.id}
                                navigation={this.props.navigation}
                                idParam={'fromid'}
                            >

                            </HouseList>
                        );
                    })}
                    {listData.length ? (
                        <View style={Styles.getMoreWrapper}>
                            <Text style={Styles.getMore}>查看更多</Text>
                        </View>
                    ) : null}
                </View>
            );
        } else if (this.state.currentIndex == 1) {
            listData =
                (this.state.resData.sale &&
                    this.state.sale.resData.length &&
                    this.state.resData.sale) ||
                [];

            return (
                <View style={Styles.ListContent}>
                    {listData.map((item, index) => {
                        return <SaleList {...item} key={item.id}></SaleList>;
                    })}
                    {listData.length ? (
                        <View style={Styles.getMoreWrapper}>
                            <Text style={Styles.getMore}>查看更多</Text>
                        </View>
                    ) : null}
                </View>
            );
        } else if (this.state.currentIndex == 3) {
            listData = this.state.resData.news || [];
            return (
                <View style={Styles.ListContent}>
                    {listData.map((item, index) => {
                        return <NewsList {...item} key={item.id} idParam={'fromid'} navigation={this.props.navigation}></NewsList>;
                    })}
                    {listData.length ? (
                        <View style={Styles.getMoreWrapper}>
                            <Text style={Styles.getMore}>查看更多</Text>
                        </View>
                    ) : null}
                </View>
            );
        } else {
            listData = [];
            return null;
        }
    }

    groupBuyItem(item, index) {
        return (
            <View style={Styles.groupBuyItem} key={index}>
                <Image
                    source={{
                        uri: item.thumb,
                    }}
                    style={{
                        width: pt(124),
                        height: pt(96),
                        marginRight: pt(12),
                        borderRadius: pt(4),
                    }}></Image>
                <View style={Styles.groupBuyItemInfo}>
                    <Text style={Styles.groupBuyItemTitle}>
                        {item.name || ''}
                    </Text>
                    <Text style={Styles.time}>{moment(item.end_time*1000).format('YYYY.MM.DD')}结束</Text>
                    <View style={Styles.groupBuyItemPrice}>
                        <View style={Styles.priceInfo}>
                            <Text style={Styles.priceNumber}>
                                {item.tgj || ''}
                            </Text>
                            <Text style={Styles.priceUnit}>元/m²</Text>
                        </View>
                        <View style={Styles.priceInfo}>
                            <Text style={Styles.oldPriceNumber}>16500</Text>
                            <Text style={Styles.oldPriceUnit}>元/m²</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const spin = this.animateVal.interpolate({
            inputRange: [0, 1], //输入值
            outputRange: this.state.range, //输出值
        });

        let guideList =
            (this.state.resData.guide &&
                this.state.resData.guide.length &&
                this.state.resData.guide) ||
            [];
        let appswiper = this.state.resData.appswiper || [];
        let groupbuy = this.state.resData.groupbuy || [];
        return (
            <ScrollView style={Styles.container}>
                <View>
                    <View style={Styles.headerImg}>
                        {appswiper.length ? (
                            <Swipers
                                pictureList={
                                    this.state.resData.appswiper
                                }></Swipers>
                        ) : null}
                    </View>
                    <View style={Styles.mainContentWrapper}>
                        <Card
                            cornerRadius={pt(4)}
                            style={{width: '100%'}}
                            elevation={pt(1)}>
                            <View style={Styles.mainContent}>
                                <View style={Styles.navListWrapper}>
                                    <View style={Styles.navList}>
                                        {naviList.map((item, index) => {
                                            return (
                                                <NaviItem
                                                    {...item}
                                                    key={index}
                                                    width={
                                                        (deviceWidth - pt(60)) /
                                                        5
                                                    }></NaviItem>
                                            );
                                        })}
                                    </View>
                                </View>
                                <View style={Styles.liveNews}>
                                    <View style={Styles.liveSvg}>
                                        <Svg
                                            name="icontoutiao"
                                            width={pt(90)}
                                            height={pt(45)}></Svg>
                                    </View>
                                    <Carousel
                                        ref={(c) => {
                                            this._slider1Ref = c;
                                        }}
                                        data={guideList}
                                        renderItem={this._renderItem}
                                        sliderHeight={pt(44)}
                                        itemHeight={pt(44)}
                                        vertical={true}
                                        activeSlideOffset={0}
                                        autoplay={true}
                                        loop={true}
                                        autoplayDelay={1000}
                                        autoplayInterval={3000}
                                        scrollEnabled={false}
                                    />
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View style={Styles.houseList}>
                        <Card
                            cornerRadius={pt(4)}
                            style={{width: '100%'}}
                            elevation={pt(1)}>
                            <View style={Styles.houseListTitle}>
                                <Animated.View style={{left: spin}}>
                                    <View style={[Styles.activeLine]}></View>
                                </Animated.View>
                                {contentNavList.map((item, index) => {
                                    return (
                                        <View
                                            style={Styles.textWrapper}
                                            key={index}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.cardSelect(
                                                        item,
                                                        index,
                                                    );
                                                }}
                                                key={index}
                                            >
                                                <Text
                                                    style={
                                                        Styles.houseListTitleText
                                                    }
                                                >
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </View>
                            {this.showListComponent.bind(this)()}
                        </Card>
                    </View>
                    <View style={Styles.groupBuy}>
                        <View style={{marginBottom: 1, paddingLeft: pt(15)}}>
                            <DetailTitle name={'团购买房'}></DetailTitle>
                        </View>
                        <Card
                            cornerRadius={pt(4)}
                            style={{width: '100%'}}
                            elevation={pt(1)}>
                            {groupbuy.length ? (
                                <Swiper
                                    style={{height: '100%'}}
                                    height={pt(126)}
                                    paginationStyle={{bottom: -pt(20)}}
                                    dotColor={'#CCCCCC'}
                                    activeDotStyle={{
                                        width: pt(12),
                                        height: pt(6),
                                        borderRadius: pt(3),
                                    }}
                                    activeDotColor={'#F04531'}
                                    dotStyle={{width: pt(6), height: pt(6)}}>
                                    {groupbuy.map((item, index) => {
                                        return this.groupBuyItem(item, index);
                                    })}
                                </Swiper>
                            ) : null}
                        </Card>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    mainContentWrapper: {
        alignSelf: 'center',
        width: pt(375 - 30),
        marginTop: pt(12),
    },
    mainContent: {
        width: pt(375 - 30),
        padding: pt(4),
    },
    headerImg: {
        width: pt(375),
        backgroundColor: '#fff',
        height: pt(250),
    },
    headerImgText: {
        fontSize: pt(28),
    },
    navList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
    },
    navListWrapper: {
        marginTop: pt(15),
    },
    liveNews: {
        height: pt(44),
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderTopWidth: pt(1),
        borderTopColor: '#F9F9F9',
        paddingRight: pt(15),
    },
    liveNewsText: {
        lineHeight: pt(42),
        fontSize: pt(14),
        flex: 1,
        alignSelf: 'center',
        display: 'flex',
    },
    liveSvg: {
        alignSelf: 'center',
        display: 'flex',
        marginLeft: -12,
    },
    houseList: {
        width: pt(375 - 30),
        alignSelf: 'center',
        marginTop: pt(12),
        marginBottom: pt(20),
    },
    houseListTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#fff',
        height: pt(44),
        borderBottomColor: '#f9f9f9',
        borderBottomWidth: pt(1),
        borderStyle: 'solid',
    },
    houseListTitleText: {
        fontSize: pt(14),
        fontWeight: 'bold',
        color: '#788397',
        color: '#000018',
        lineHeight: pt(44),
        alignSelf: 'center',
        height: pt(44),
    },
    activeLine: {
        width: pt(18),
        height: pt(4),
        backgroundColor: '#fd6958',
        position: 'absolute',
        left: pt((375 - 30) / contentNavList.length / 2 - pt(9)),
        bottom: pt(-16),
        borderRadius: pt(10),
    },
    textWrapper: {
        flex: 1,
    },
    ListContent: {
        paddingLeft: pt(15),
        paddingRight: pt(15),
        width: '100%',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    getMore: {
        alignSelf: 'center',
        lineHeight: pt(44),
        fontSize: pt(16),
        backgroundColor: '#f9f9f9',
        color: '#d5ddec',
    },
    getMoreWrapper: {
        backgroundColor: '#f9f9f9',
        width: pt(375 - 60),
        alignSelf: 'center',
        paddingRight: pt(15),
        paddingLeft: pt(15),
        height: pt(44),
        marginBottom: pt(16),
        borderRadius: pt(4),
    },
    groupBuyItemInfo: {
        flex: 1,
        justifyContent: 'space-around',
    },
    groupBuyItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: pt(15),
        paddingRight: pt(15),
        paddingBottom: pt(15),
        paddingTop: pt(15),
        width: pt(375 - 30),
    },
    groupBuyItemPrice: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    priceInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    groupBuyItemTitle: {
        fontSize: pt(18),
        color: '#101D37',
        fontWeight: 'bold',
    },
    groupBuy: {
        paddingLeft: pt(15),
        paddingRight: pt(15),
        width: pt(375),
        marginBottom: pt(30),
    },
    time: {
        color: '#919AAA',
        fontSize: pt(12),
    },
    priceNumber: {
        color: '#F04531',
        fontSize: pt(18),
        fontWeight: 'bold',
    },
    priceUnit: {
        fontSize: pt(10),
        color: '#F04531',
        alignSelf: 'flex-end',
        marginRight: pt(15),
        lineHeight: pt(20),
    },
    oldPriceNumber: {
        fontSize: pt(12),
        color: '#919AAA',
        alignSelf: 'center',
        textDecorationLine: 'line-through',
    },
    oldPriceUnit: {
        color: '#919AAA',
        fontSize: pt(10),
        alignSelf: 'center',
        textDecorationLine: 'line-through',
    },
});

export default connect((state) => ({globalData: state.globalHouseData}))(Main)

