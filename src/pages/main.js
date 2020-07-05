import React from 'react';

import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';

import pt from '../utils/px2dp/Px2dp';
import font from '../utils/px2dp/TextSize';

import NaviItem from '../components/index/navi-item';

import Svg from '../components/svg'

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

const Main = () => {

    console.log(pt(60))
    return (
        <ScrollView style={ Styles.container }>
            <View>
                <View style={Styles.headerImg}>
                    <Text allowFontScaling={false} style={Styles.headerImgText}>
                        新房 
                    </Text>
                </View> 
                <View style={ Styles.mainContent }>
                    <View style={ Styles.navListWrapper }>
                        <View style={Styles.navList}>
                            { naviList.map((item, index) => {
                                return <NaviItem {...item} key={index} width={(deviceWidth-pt(60))/5}></NaviItem>;
                            }) }
                        </View>     
                    </View>
                    <View style={ Styles.liveNews }>
                        <View style={ Styles.liveSvg }>
                            <Svg name="icontoutiao" width={pt(120)} height={ pt(88) }></Svg>
                        </View>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={ Styles.liveNewsText }>刺伤港警暴徒系港大毕业系港大毕业系港大毕业</Text>
                    </View>
                </View>  
                
            </View>
        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey'
    },
    mainContent: {
        paddingLeft: pt(30),
        paddingRight: pt(30),
    },
    headerImg: {
        width: pt(750),
        backgroundColor: 'pink',
        height: pt(300),
    },
    headerImgText: {
        fontSize: pt(28),
    },
    navList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        paddingBottom: pt(40)
       
    },
    navListWrapper: {
        marginTop: pt(30)
    },
    liveNews: {
        height: pt(88),
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderTopWidth: pt(2),
        borderTopColor: '#f9f9f9',
        paddingRight: pt(30),
        paddingLeft: pt(10),
    },
    liveNewsText: {
        lineHeight: pt(88),
        fontSize: pt(28),
        flex: 1,
        alignSelf: 'center',
        display: 'flex'

    },
    liveSvg: {
        alignSelf: 'center',
        display: 'flex',
    }
});

export default Main;
