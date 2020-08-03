import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import pt from '../../utils/px2dp/Px2dp';

const LineText = (props) => {
    let keyArr = props.name? props.name.split('') : []
    let value = props.value? props.value : ''
    
    return (
        <View style={ styles.listItem }>
            <View style={ styles.keyWrapper }>
                {keyArr.map((item, index) => {
                    return <Text key={index} style={ styles.itemKey }>{item}</Text>;
                })}
            </View>
            <Text style={styles.value}>{ value }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    keyWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: pt(56),
        marginRight: pt(10)
    },
    itemKey: {
        color: '#919AAA',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'justify',
        fontSize: pt(14),
    },
    itemVal: {
        color: '#101D37',
        marginLeft: pt(10),
        fontSize: pt(14),
    },
    listItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    value: {
        flex: 1
    }
});

export default LineText;
