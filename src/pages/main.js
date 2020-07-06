import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Button,
} from 'react-native';

import pt from '../utils/px2dp/Px2dp';

import NaviItem from '../components/index/navi-item';

import Svg from '../components/svg';

// 设置border-shadow的组件
import {Card} from 'react-native-shadow-cards';

import Carousel from 'react-native-snap-carousel';

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

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [
                {title: '热销新盘汇龙湾·天樾购房即可享9.5折优惠'},
                {title: '中俄边境两头熊“开战”，观测相机被摧毁，专家：友谊的象征'},
                {title: '阿里巴巴（中国）有限公司被列为被执行人 执行标的超50万'},
            ],
        };
    }

    _renderItem({item, index}) {
        return (
            <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={[Styles.liveNewsText]}
            >
                { item.title }
            </Text>
        )
    }

    componentDidMount() {}
    render() {
        const horizontalMargin = 20;
        const slideWidth = 280;
        const itemWidth = slideWidth + horizontalMargin * 2;
        const itemHeight = 200;

        return (
            <ScrollView style={Styles.container}>
                <View>
                    <View style={Styles.headerImg}>
                        <Text
                            allowFontScaling={false}
                            style={Styles.headerImgText}>
                            新房
                        </Text>
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
                                        sliderHeight={ pt(44) }
                                        itemHeight={ pt(44) }
                                        vertical={ true }
                                        activeSlideOffset={0}
                                        autoplay={ true }
                                        loop={true}
                                        autoplayDelay={1000}
                                        autoplayInterval={3000}
                                        scrollEnabled = { false }
                                    />
                                    
                                </View>
                            </View>
                        </Card>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const layout = (ref) => {
    const handle = findNodeHandle(ref);
    return new Promise((resolve) => {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
            resolve({
                x,
                y,
                width,
                height,
                pageX,
                pageY,
            });
        });
    });
};

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
        paddingBottom: pt(1),
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
});

export default Main;
