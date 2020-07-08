import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

import pt from '../../utils/px2dp/Px2dp';

const HouseList = () => {
    return (
        <View style={ styles.listContainer }>
            <View style={ styles.leftImg }>
                <Image
                    style={ styles.img }
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
                    <Text ellipsizeMode="tail" numberOfLines={1} style={ styles.addr }>旁隐闲山庄旁常平镇站北路隐闲山庄旁隐闲山庄旁旁隐闲山庄旁旁隐闲山庄旁</Text>
                </View>
                <View style={ styles.tagList }>
                    <Text style={ styles.tag }>在售</Text>
                    <Text style={ styles.tag }>普通住宅</Text>
                </View>
                <View  style={ [styles.tagList,{alignItems: 'baseline'}] }>
                    <Text  style={ styles.price }>17500</Text>
                    <Text  style={ styles.unit }>元/m²</Text>
                    <Text  style={ styles.size }>建面98-157m²</Text>
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
        color: '#101D37'
    },
    leftImg: {
        marginRight: pt(12),
    },
    addr: {
        fontSize: pt(12),
        color: '#919AAA',
        width: pt(210)
    },
    tagList: {
        flexDirection: 'row'
    },
    tag: {
        marginRight: pt(10),
        fontSize: pt(10),
        borderStyle: 'solid',
        borderWidth: pt(0.5),
        borderColor: '#DDE3EF',
        color: '#DDE3EF',
        paddingTop: pt(1),
        paddingBottom: pt(1),
        paddingLeft: pt(2),
        paddingRight: pt(2),
        borderRadius: pt(4),
        alignSelf: 'center'
    },
    price: {
        color: '#F04531',
        fontSize: pt(18),
        fontWeight: 'bold',
        lineHeight: pt(18)
    },
    unit: {
        fontSize: pt(10),
        lineHeight: pt(18),
        color: '#F04531'
    },
    size: {
        fontSize: pt(10),
        marginLeft: pt(10),
        color: '#919AAA',
        lineHeight: pt(18)
    },
    img: {
        width: pt(124), 
        height: pt(96),
        borderRadius: pt(4)
    }
});
