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
    Image
} from 'react-native';

import pt from '../utils/px2dp/Px2dp';

import NaviItem from '../components/index/navi-item';

import Svg from '../components/svg';

// 设置border-shadow的组件
import {Card} from 'react-native-shadow-cards';

import Carousel from 'react-native-snap-carousel';

import HouseList from '../components/house/list';

import SaleList from '../components/sale/list';

import {getIndex} from '../api';

import Swiper from '../components/swiper';

let naviList = [
    {
        icon: 'iconmaixinfang',
        bg: '#FA554E',
        name: '买新房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#18BA43',
        name: '二手房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#FF881D',
        name: '找租房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#01B1FE',
        name: '商铺办公',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#FF5A7A',
        name: '直播看房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#FFA402',
        name: '团购买房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#1BD0B9',
        name: '小区找房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#747CF5',
        name: '地图找房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#26D178',
        name: '查房价',
    },
    {
        icon: 'iconmaixinfang',
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
        name: '特价房',
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
            }
        });
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
                                navigation={this.props.navigation}></HouseList>
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
        } else {
            listData = [];
            return null;
        }
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
        return (
            <ScrollView style={Styles.container}>
                <View>
                    <View style={Styles.headerImg}>
                        {appswiper.length ? (
                            <Swiper
                                pictureList={
                                    this.state.resData.appswiper
                                }></Swiper>
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
                                        <View style={Styles.textWrapper}>
                                            <Text
                                                style={
                                                    Styles.houseListTitleText
                                                }
                                                onPress={() => {
                                                    this.cardSelect(
                                                        item,
                                                        index,
                                                    );
                                                }}
                                                key={index}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                            {this.showListComponent.bind(this)()}
                        </Card>
                    </View>
                    <View Styles={Styles.groupBuy}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Image
                                source={{uri: 'https://house.08cms.com/thumb/uploads/house/000/00/00/1/000/002/390d87cc5e91f4450a46103e340f4eec.jpg'}}
                                style={{width: pt(124),height: pt(96)}}
                            ></Image>
                            <View>
                                <Text>石排国际公馆现拼团购享额外优惠</Text>
                                <Text>差5人成团，剩05:30:20结束</Text>
                                <View>
                                    <View>
                                        <Text>15800</Text>
                                        <Text>元/m²</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text>16500</Text>
                                    <Text>元/m²</Text>
                                </View>
                            </View>
                        </View>
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
});

export default Main;
