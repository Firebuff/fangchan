import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

import pt from '../../utils/px2dp/Px2dp';

const HouseList = () => {
    return (
        <View style={ styles.listContainer }>
            <View style={ styles.leftImg }>
                <Image
                    style={{width: pt(124), height: pt(96)}}
                    source={{
                        uri: 'https://house.08cms.com/thumb/uploads/house/000/00/00/1/000/002/390d87cc5e91f4450a46103e340f4eec.jpg',
                    }}
                />
            </View>
            <View style={ styles.info }>
                <View >
                    <Text style={ styles.title }>华润幸福里</Text>
                </View>

                <View>
                    <Text style={ styles.addr }>常平镇站北路隐闲山庄旁</Text>
                </View>
                <View style={ styles.tagList }>
                    <Text style={ styles.tag }>在售</Text>
                    <Text style={ styles.tag }>普通住宅</Text>
                </View>
                <View  style={ [styles.tagList,{alignItems: 'baseline'}] }>
                    <Text  style={ styles.price }>17500</Text>
                    <Text  style={ styles.unit }>元/m</Text>
                    <Text  style={ styles.size }>建面300平米</Text>
                </View>
            </View>
        </View>
    );
};
export default HouseList;

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
    },
    info: {
        justifyContent: 'space-between'
    },
    title: {
        fontSize: pt(16),
        fontWeight: 'bold',
    },
    leftImg: {
        marginRight: pt(12),
    },
    addr: {
        fontSize: pt(12),
        color: '#7e889b',
    },
    tagList: {
        flexDirection: 'row'
    },
    tag: {
        marginRight: pt(10),
        fontSize: pt(11),
        borderStyle: 'solid',
        borderWidth: pt(0.5),
        borderColor: '#e0e6f1',
        color: '#e0e6f1',
        padding: 0,
        paddingLeft: pt(4),
        paddingRight: pt(4),
        borderRadius: pt(4),
        alignSelf: 'center'
    },
    price: {
        color: 'red',
        fontSize: pt(16),
        fontWeight: 'bold',
        lineHeight: pt(16)
    },
    unit: {
        fontSize: pt(10),
        lineHeight: pt(16),
        color: '#7e889b'
    },
    size: {
        fontSize: pt(11),
        marginLeft: pt(10),
        color: '#7e889b',
        lineHeight: pt(16)
    }
});
