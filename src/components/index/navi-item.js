import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import pt from '../../utils/px2dp/Px2dp';

import Svg from '../svg';

const NaviItem = function (props) {
    let { icon, name, bg, width } = props
    return (
        <View style={[Styles.naviContainer,{ width: width }]}>
            <View>
                <View style={ [Styles.svg, {backgroundColor: bg}] }>
                    <Svg width={ pt(40) } height={ pt(40) } name={ icon }></Svg>
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
        paddingTop: pt(30)
    },
    svg: {
        height: pt(88),
        width: pt(88),
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    naviText: {
        color: '#303030',
        fontSize: pt(28),
        fontWeight: 'bold',
        marginTop: pt(26)
    }
})


export default NaviItem;
