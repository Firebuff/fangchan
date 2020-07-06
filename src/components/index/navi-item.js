import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

import pt from '../../utils/px2dp/Px2dp';

import Svg from '../svg';

const NaviItem = function (props) {
    let { icon, name, bg, width } = props
    return (
        <View style={[Styles.naviContainer,{ width: width }]}>
            <View>
                <View style={ [Styles.svg, {backgroundColor: bg}] }>
                    <Svg width={ pt(18) } height={ pt(18) } name={ icon }></Svg>
                </View>
                <Text style={ Styles.naviText }>{ name }</Text>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    naviContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: pt(15)
    },
    svg: {
        height: pt(44),
        width: pt(44),
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    naviText: {
        color: '#101D37',
        fontSize: pt(12),
        marginTop: pt(13),
        fontWeight: 'bold',
    }
})


export default NaviItem;
