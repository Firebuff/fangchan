import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import pt from '../../utils/px2dp/Px2dp';

// 设置border-shadow的组件
import {Card} from 'react-native-shadow-cards';

const GetMoreButton = (props) => {
    let name = props.name ? props.name : '';
    return (
        <Card cornerRadius={pt(4)} style={{width: '100%'}} elevation={pt(0)}>
            <View style={styles.getMoreWrapper}>
                <Text style={styles.getMore}>{name}</Text>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    getMore: {
        alignSelf: 'center',
        lineHeight: pt(44),
        fontSize: pt(16),
        backgroundColor: '#f9f9f9',
        color: '#d5ddec',
    },
    getMoreWrapper: {
        backgroundColor: '#F9F9F9',
        width: '100%',
        alignSelf: 'center',
        paddingRight: pt(15),
        paddingLeft: pt(15),
        height: pt(44),
        borderRadius: pt(4),
    },
});

export default GetMoreButton;
