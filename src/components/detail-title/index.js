import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import pt from '../../utils/px2dp/Px2dp';

import Svg from '../svg'

const DetailTitle = (props) => {
    let name = props.name ? props.name : '';
    let iconName = props.iconName ? props.iconName : '';
    return (
        <View style={ styles.titleWrapper }>
            <Text  style={ styles.titleText }>{ name }</Text>
            <View style={ styles.right }>
                <Text style={ styles.iconName }>{ iconName }</Text>
                <Svg name="icongengduo_ccc" width={pt(12)} height={pt(20)}></Svg>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    right: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconName: {
        color: '#CCCCCC',
        fontSize: pt(12),
        alignSelf: 'center'
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: pt(44),
        alignItems: 'center',
        width: '100%',
    },
    titleText: {
        color: '#101D37',
        fontSize: pt(18),
        fontWeight: 'bold',
    }
});

export default DetailTitle
