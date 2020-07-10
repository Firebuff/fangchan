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
} from 'react-native';

import pt from '../utils/px2dp/Px2dp';

import NaviItem from '../components/index/navi-item';

import Svg from '../components/svg';

// 设置border-shadow的组件
import {Card} from 'react-native-shadow-cards';

import Carousel from 'react-native-snap-carousel';

import HouseList from '../components/house/list';

import SaleList from '../components/sale/list';

import Swiper from 'react-native-swiper';

let naviList = [
    {
        icon: 'iconmaixinfang',
        bg: '#06b6fb',
        name: '买新房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#06b6fb',
        name: '买新房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#06b6fb',
        name: '买新房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#06b6fb',
        name: '买新房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#06b6fb',
        name: '买新房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#06b6fb',
        name: '买新房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#06b6fb',
        name: '买新房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#06b6fb',
        name: '买新房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#06b6fb',
        name: '买新房',
    },
    {
        icon: 'iconmaixinfang',
        bg: '#06b6fb',
        name: '买新房',
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
            entries: [
                {title: '热销新盘汇龙湾·天樾购房即可享9.5折优惠'},
                {
                    title:
                        '中俄边境两头熊“开战”，观测相机被摧毁，专家：友谊的象征',
                },
                {
                    title:
                        '阿里巴巴（中国）有限公司被列为被执行人 执行标的超50万',
                },
            ],
            range: [0, 0],
            currentIndex: 0,
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
                {item.title}
            </Text>
        );
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
            console.log(8897);
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
        console.log(this.spin);
    };

    render() {
        const spin = this.animateVal.interpolate({
            inputRange: [0, 1], //输入值
            outputRange: this.state.range, //输出值
        });

        let showWhichList;

        if (this.state.currentIndex == 0) {
            showWhichList = <HouseList></HouseList>;
        } else if (this.state.currentIndex == 1) {
            showWhichList = <SaleList></SaleList>;
        } else {
            showWhichList = null;
        }

        return (
            <ScrollView style={Styles.container}>
                <View>
                    <View style={Styles.headerImg}>
                        <Swiper style={Styles.wrapper} showsButtons={true}>
                            <View style={Styles.slide1}>
                                <Text style={Styles.text}>Hello Swiper</Text>
                            </View>
                            <View style={Styles.slide2}>
                                <Text style={Styles.text}>Beautiful</Text>
                            </View>
                            <View style={Styles.slide3}>
                                <Text style={Styles.text}>And simple</Text>
                            </View>
                        </Swiper>
                    </View>
                    <View style={Styles.mainContentWrapper}>
                        <Card cornerRadius={pt(4)} style={{width: '100%'}}>
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
                                        data={this.state.entries}
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
                        <Card cornerRadius={pt(4)} style={{width: '100%'}}>
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
                            <View style={Styles.ListContent}>
                                {showWhichList}
                            </View>
                            <View style={ Styles.getMoreWrapper }>
                                <Text style={ Styles.getMore }>查看更多</Text>
                            </View>
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
        backgroundColor: 'pink',
        height: pt(150),
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
        marginBottom: pt(2),
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
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
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
        color: '#d5ddec'
    },
    getMoreWrapper: {
        backgroundColor: '#f9f9f9',
        width: pt(375-60),
        alignSelf: 'center',
        paddingRight: pt(15),
        paddingLeft: pt(15),
        height: pt(44),
        marginBottom: pt(16),
        borderRadius: pt(4)
    }
});

export default Main;
